'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel } from './ui';
import { generateSymbolLine, generateCodeSymbolLine, symbolSets, getRandomSymbolFromSet, allSymbols, codePunctuation } from '@/lib/symbolLibrary';
import { Button } from './ui';
import Shape3DAnimation from './Shape3DAnimation';

// Helper to get default primary color as hex
const getDefaultPrimaryColor = (): string => {
  if (typeof window === 'undefined') return '#ff6b35';
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue('--theme-primary').trim();
  return primaryColor.startsWith('#') ? primaryColor : '#ff6b35';
};

export interface SignalDecoderProps {
  speed?: number;
  lineLength?: number;
  lineCount?: number;
  symbolSets?: (keyof typeof symbolSets)[];
  className?: string;
  autoStart?: boolean;
}

export default function SignalDecoder({
  speed = 50,
  lineLength = 20,
  lineCount = 7,
  symbolSets: activeSets = ['egyptian', 'runes', 'geometric', 'technical', 'tibetan', 'alchemy'],
  className,
  autoStart = true,
}: SignalDecoderProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [decodingLines, setDecodingLines] = useState<string[]>([]); // Currently displayed lines (with decoding animation)
  const [lineLengths, setLineLengths] = useState<number[]>([]);
  const [targetLines, setTargetLines] = useState<string[]>([]); // Final target lines
  const [decodingIndices, setDecodingIndices] = useState<number[]>([]); // Current decoding index for each line
  const [clearedLines, setClearedLines] = useState<boolean[]>([]); // Track which lines have been cleared
  const [isRefilling, setIsRefilling] = useState(false); // Track if we're refilling after line 7
  const [isDecoding, setIsDecoding] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(0); // Track active line for visual indicator
  const [currentStatusPhrase, setCurrentStatusPhrase] = useState(0); // Index for rotating status phrases
  
  // 3D Animation Control State
  const [showControls, setShowControls] = useState(false);
  const [shapeSize, setShapeSize] = useState(96);
  const [animationSpeed, setAnimationSpeed] = useState(10);
  const [glowIntensity, setGlowIntensity] = useState(50); // 0-100, affects shadow/glow intensity
  const [primaryColorHex, setPrimaryColorHex] = useState(getDefaultPrimaryColor());
  const [secondaryColorHex, setSecondaryColorHex] = useState('#00b4d8');
  const [rotationAxes, setRotationAxes] = useState({ x: true, y: true, z: false });
  
  // Sync primary color with theme on mount
  useEffect(() => {
    const defaultColor = getDefaultPrimaryColor();
    setPrimaryColorHex(defaultColor);
  }, []);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clearTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const currentLineIndexRef = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);
  const decodingIndicesRef = useRef<number[]>([]);
  const statusPhraseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Characters for random decoding effect (symbols + code punctuation)
  const decodingChars = [...allSymbols, ...codePunctuation];
  
  // Rotating status phrases
  const statusPhrases = [
    'CONTEXTUALIZING',
    'THINKING',
    'PLANNING',
    'CALLING AGENTS',
    'PROCESSING',
    'ANALYZING',
    'SYNTHESIZING',
    'OPTIMIZING',
  ];
  
  // Sync ref with state
  useEffect(() => {
    decodingIndicesRef.current = decodingIndices;
  }, [decodingIndices]);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.current = mediaQuery.matches;

      const handleChange = (e: MediaQueryListEvent) => {
        prefersReducedMotion.current = e.matches;
        if (e.matches) {
          // Generate static code symbol lines for users who prefer reduced motion
          const staticLines: string[] = [];
          for (let i = 0; i < lineCount; i++) {
            const len = lineLengths[i] || lineLength;
            // Use code symbol lines for reduced motion
            staticLines.push(generateCodeSymbolLine(40, 80, activeSets).substring(0, len));
          }
          setDecodingLines(staticLines);
          setIsDecoding(false);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [lineCount, lineLength, activeSets]);

  // Initialize lines with random lengths and generate target lines
  useEffect(() => {
    const initialLines: string[] = [];
    const initialDecodingLines: string[] = [];
    const lengths: number[] = [];
    const targets: string[] = [];
    const indices: number[] = [];
    
    for (let i = 0; i < lineCount; i++) {
      // Randomize length between 40 and 80 characters for longer, more code-like lines
      const randomLength = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
      lengths.push(randomLength);
      initialLines.push('');
      // Start empty - will show boxes initially, then decode to symbols
      initialDecodingLines.push('');
      indices.push(0);
      // Generate target line with symbols and code punctuation
      targets.push(generateCodeSymbolLine(20, 50, activeSets).substring(0, randomLength));
    }
    
    setLineLengths(lengths);
    setLines(initialLines);
    setDecodingLines(initialDecodingLines);
    setTargetLines(targets);
    setDecodingIndices(indices);
    setClearedLines(new Array(lineCount).fill(false));
    setIsRefilling(false);
    // Initialize ref with indices
    decodingIndicesRef.current = indices;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineCount]);

  // Character-by-character decoding animation (like TextDecoder)
  useEffect(() => {
    if (!isDecoding || isPaused || prefersReducedMotion.current) {
      return;
    }

    const decodeInterval = setInterval(() => {
      const currentLineIdx = currentLineIndexRef.current;
      setActiveLineIndex(currentLineIdx); // Update active line for visual indicator
      const targetLine = targetLines[currentLineIdx] || '';
      const currentIndices = decodingIndicesRef.current;
      const currentIndex = Math.floor(currentIndices[currentLineIdx] || 0);
      
      if (currentIndex < targetLine.length) {
        // Still decoding this line - update both states
        const newIndices = [...currentIndices];
        newIndices[currentLineIdx] = (newIndices[currentLineIdx] || 0) + 0.5;
        setDecodingIndices(newIndices);
        
        // Update displayed line
        const randomChars = Array(targetLine.length)
          .fill(0)
          .map(() => decodingChars[Math.floor(Math.random() * decodingChars.length)])
          .join('');
        
        const revealed = targetLine
          .split('')
          .map((char, i) => (i <= currentIndex ? char : randomChars[i]))
          .join('');
        
        setDecodingLines((prevDecoding) => {
          const newDecoding = [...prevDecoding];
          newDecoding[currentLineIdx] = revealed;
          return newDecoding;
        });
      } else {
        // Line complete - keep it visible (don't clear)
        setDecodingLines((prevDecoding) => {
          const newDecoding = [...prevDecoding];
          newDecoding[currentLineIdx] = targetLine;
          return newDecoding;
        });
        
        // Reset index for this line
        const newIndices = [...currentIndices];
        newIndices[currentLineIdx] = 0;
        setDecodingIndices(newIndices);
        
        // Check if this was the last line (line 7)
        if (currentLineIdx === lineCount - 1) {
          // All lines are now complete - wait a moment then show boxes one by one
          setTimeout(() => {
            setIsRefilling(true);
            
            // Show boxes one line at a time with visible delay (replacing symbols)
            for (let i = 0; i < lineCount; i++) {
              setTimeout(() => {
                setDecodingLines((prevDecoding) => {
                  const newDecoding = [...prevDecoding];
                  const len = lineLengths[i] || lineLength;
                  // Replace the symbols with boxes - this should be clearly visible
                  newDecoding[i] = '█'.repeat(len);
                  return newDecoding;
                });
              }, i * 250); // 250ms delay between each line for clearly visible step-by-step effect
            }
            
            // After all boxes are shown, reset everything and generate new lines
            setTimeout(() => {
              // Generate new target lines
              const newTargets: string[] = [];
              const newIndices = new Array(lineCount).fill(0);
              
              for (let i = 0; i < lineCount; i++) {
                const targetLength = lineLengths[i] || Math.floor(Math.random() * (50 - 20 + 1)) + 20;
                newTargets.push(generateCodeSymbolLine(20, 50, activeSets).substring(0, targetLength));
              }
              
              setDecodingIndices(newIndices);
              setTargetLines(newTargets);
              decodingIndicesRef.current = newIndices;
              
              // Start decoding new symbols from boxes - boxes will be replaced by decoding
              setIsRefilling(false);
              setClearedLines(new Array(lineCount).fill(false));
              currentLineIndexRef.current = 0; // Start from line 1 again
              
              // Decoding will start immediately, replacing boxes with symbols
            }, (lineCount * 250) + 500); // Wait for all boxes to appear (250ms each) + 500ms pause
          }, 500); // Brief pause after all lines complete
        } else {
          // Normal completion - generate new target and move to next line immediately
          const targetLength = lineLengths[currentLineIdx] || Math.floor(Math.random() * (50 - 20 + 1)) + 20;
          const newTarget = generateCodeSymbolLine(20, 50, activeSets).substring(0, targetLength);
          setTargetLines((prevTargets) => {
            const updated = [...prevTargets];
            updated[currentLineIdx] = newTarget;
            return updated;
          });
          
          // Move to next line immediately
          currentLineIndexRef.current = (currentLineIdx + 1) % lineCount;
        }
      }
    }, 50); // Update every 50ms for smooth typing effect

    intervalRef.current = decodeInterval;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
        clearTimeoutRef.current = null;
      }
    };
  }, [isDecoding, isPaused, targetLines, lineLengths, lineCount, activeSets, decodingChars, lineLength]);

  // Start/stop animation
  useEffect(() => {
    if (prefersReducedMotion.current) {
      // Generate static code symbol lines for users who prefer reduced motion
      const staticLines: string[] = [];
      for (let i = 0; i < lineCount; i++) {
        const len = lineLengths[i] || lineLength;
        // Use code symbol lines for reduced motion
        staticLines.push(generateCodeSymbolLine(20, 50, activeSets).substring(0, len));
      }
      setDecodingLines(staticLines);
      setIsDecoding(false);
      return;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isDecoding, isPaused, lineCount, lineLength, activeSets]);

  const handleToggle = () => {
    if (isPaused) {
      setIsPaused(false);
      setIsDecoding(true);
    } else {
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    setIsDecoding(false);
    setIsPaused(false);
  };

  const handleStart = () => {
    setIsDecoding(true);
    setIsPaused(false);
  };

  // Rotate status phrases when decoding
  useEffect(() => {
    if (isDecoding && !isPaused) {
      statusPhraseIntervalRef.current = setInterval(() => {
        setCurrentStatusPhrase((prev) => (prev + 1) % statusPhrases.length);
      }, 2000); // Change phrase every 2 seconds
    } else {
      if (statusPhraseIntervalRef.current) {
        clearInterval(statusPhraseIntervalRef.current);
        statusPhraseIntervalRef.current = null;
      }
    }
    
    return () => {
      if (statusPhraseIntervalRef.current) {
        clearInterval(statusPhraseIntervalRef.current);
      }
    };
  }, [isDecoding, isPaused, statusPhrases.length]);

  // Get status text and styling
  const getStatusConfig = () => {
    if (isDecoding && !isPaused) {
      return { text: statusPhrases[currentStatusPhrase], variant: 'active' as const };
    } else if (isPaused) {
      return { text: 'PAUSED', variant: 'paused' as const };
    }
    return { text: 'STANDBY', variant: 'standby' as const };
  };

  const statusConfig = getStatusConfig();

  return (
    <Panel
      variant="bordered"
      headerVariant="accent"
      title="STATUS"
      className={className}
    >
      <div className="space-y-0">
        {/* Enhanced Status Bar with Integrated Controls */}
        <div className="relative">
          {/* Status Bar Background */}
          <div className="flex items-center justify-between px-4 py-3 bg-text/5 border-b border-current/10">
            {/* Left: Status Indicator */}
            <div className="flex items-center gap-3">
              {/* Animated Status Dot with Ring */}
              <div className="relative">
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    statusConfig.variant === 'active' 
                      ? 'bg-primary' 
                      : statusConfig.variant === 'paused'
                      ? 'bg-warning'
                      : 'bg-muted'
                  }`}
                  animate={statusConfig.variant === 'active' ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {statusConfig.variant === 'active' && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    animate={{
                      scale: [1, 1.8],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </div>
              
              {/* Status Text Badge */}
              <div className={`
                px-3 py-1 rounded-sm font-mono text-xs uppercase tracking-widest
                ${statusConfig.variant === 'active' 
                  ? 'bg-primary/15 text-primary border border-primary/30' 
                  : statusConfig.variant === 'paused'
                  ? 'bg-warning/15 text-warning border border-warning/30'
                  : 'bg-muted/30 text-secondary border border-current/10'
                }
              `}>
                <span className="flex items-center gap-2">
                  {statusConfig.text}
                  {statusConfig.variant === 'active' && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ▸
                    </motion.span>
                  )}
                </span>
              </div>
            </div>

            {/* Right: Control Buttons */}
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                {isDecoding ? (
                  <motion.div
                    key="active-controls"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2"
                  >
                    <button
                      onClick={handleToggle}
                      className="group flex items-center gap-1.5 px-3 py-1.5 
                        bg-transparent border border-current/30 
                        text-xs font-mono uppercase tracking-wider
                        hover:bg-text/5 hover:border-current/50 
                        transition-all duration-200"
                    >
                      <span className="w-2 h-2 flex items-center justify-center text-[8px]">
                        {isPaused ? '▶' : '❚❚'}
                      </span>
                      {isPaused ? 'RESUME' : 'PAUSE'}
                    </button>
                    <button
                      onClick={handleStop}
                      className="group flex items-center gap-1.5 px-3 py-1.5 
                        bg-transparent border border-warning/30 text-warning
                        text-xs font-mono uppercase tracking-wider
                        hover:bg-warning/10 hover:border-warning/50 
                        transition-all duration-200"
                    >
                      <span className="w-2 h-2 flex items-center justify-center text-[8px]">■</span>
                      STOP
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="start-control"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={handleStart}
                      className="group flex items-center gap-1.5 px-4 py-1.5 
                        bg-primary/10 border border-primary/50 text-primary
                        text-xs font-mono uppercase tracking-wider
                        hover:bg-primary hover:text-background hover:border-primary 
                        transition-all duration-200"
                    >
                      <span className="w-2 h-2 flex items-center justify-center text-[8px]">▶</span>
                      INITIALIZE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Terminal-Style Decoding Area */}
        <div className="relative flex items-stretch min-h-[420px] overflow-hidden">
          {/* Scanline Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.1) 2px,
                rgba(0, 0, 0, 0.1) 4px
              )`,
            }}
          />
          
          {/* CRT Vignette Effect */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(
                ellipse at center,
                transparent 0%,
                transparent 60%,
                rgba(0, 0, 0, 0.05) 100%
              )`,
            }}
          />

          {/* Left Column - Terminal Output */}
          <div className="flex-[2] relative bg-text/[0.02]">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-current/5 bg-text/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-warning/60" />
                <div className="w-2 h-2 rounded-full bg-success/60" />
                <div className="w-2 h-2 rounded-full bg-accent/60" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/60 ml-2">
                signal_output.stream
              </span>
            </div>

            {/* Decoding Lines */}
            <div className="p-4 space-y-0">
              {lines.map((line, index) => {
                const isActiveLine = index === activeLineIndex && isDecoding && !isPaused;
                const decodingProgress = decodingIndices[index] || 0;
                const targetLength = lineLengths[index] || lineLength;
                const progressPercent = Math.min((decodingProgress / targetLength) * 100, 100);
                
                return (
                  <motion.div
                    key={index}
                    className={`
                      relative flex items-center gap-0 py-2 
                      border-l-2 transition-all duration-200
                      ${isActiveLine 
                        ? 'border-l-primary bg-primary/[0.03]' 
                        : 'border-l-transparent hover:border-l-current/20'
                      }
                    `}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {/* Line Number */}
                    <div className={`
                      flex items-center justify-center w-10 h-full
                      font-mono text-[10px] tabular-nums select-none
                      ${isActiveLine ? 'text-primary' : 'text-secondary/50'}
                    `}>
                      <span className="opacity-50 mr-0.5">0x</span>
                      {index.toString(16).toUpperCase().padStart(2, '0')}
                    </div>

                    {/* Separator */}
                    <div className={`
                      w-px h-4 mx-2
                      ${isActiveLine ? 'bg-primary/30' : 'bg-current/10'}
                    `} />

                    {/* Decoded Content */}
                    <div className="flex-1 relative overflow-hidden">
                      <span className={`
                        font-mono text-sm tracking-wide break-all
                        ${isActiveLine 
                          ? 'text-primary' 
                          : 'text-text/80'
                        }
                      `}>
                        {decodingLines[index] || '█'.repeat(lineLengths[index] || lineLength)}
                      </span>
                      
                      {/* Progress Indicator for Active Line */}
                      {isActiveLine && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-[1px] bg-primary/50"
                          style={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      )}
                    </div>

                    {/* Line Status Indicator */}
                    <div className={`
                      ml-3 w-6 flex items-center justify-center
                      font-mono text-[8px] uppercase
                      ${isActiveLine ? 'text-primary' : 'text-secondary/30'}
                    `}>
                      {isActiveLine ? (
                        <motion.span
                          animate={{ opacity: [1, 0.3] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          ◄
                        </motion.span>
                      ) : progressPercent >= 100 ? (
                        <span className="text-success/50">✓</span>
                      ) : (
                        <span>·</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-current/10 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-background flex items-center justify-center">
              <div className="w-1 h-full bg-current/10 rounded-full" />
            </div>
          </div>

          {/* Right Column - 3D Shape Visualization */}
          <div className="flex-1 relative bg-background flex flex-col">
            {/* Visualization Header */}
            <div className="flex items-center justify-center px-4 py-2 border-b border-current/5 bg-text/[0.02]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">
                SIGNAL_VISUALIZER
              </span>
            </div>

            {/* 3D Shape Container - Fixed height to prevent distortion */}
            <div className="flex-1 min-h-[300px] max-h-[400px] relative">
              <Shape3DAnimation
                isDecoding={isDecoding}
                isPaused={isPaused}
                currentLineIndex={currentLineIndexRef.current}
                shapeSize={shapeSize}
                animationSpeed={animationSpeed}
                glowIntensity={glowIntensity}
                primaryColorHex={primaryColorHex}
                secondaryColorHex={secondaryColorHex}
                rotationAxes={rotationAxes}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="relative">
          {/* Footer Background */}
          <div className="px-4 py-3 bg-text/[0.02] border-t border-current/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Left: System Info */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary/50">SYM</span>
                  <span className="text-xs font-mono text-text/70 bg-current/5 px-2 py-0.5 rounded-sm">
                    {activeSets.length}
                  </span>
                </div>
                <div className="w-px h-3 bg-current/10" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary/50">LN</span>
                  <span className="text-xs font-mono text-text/70 bg-current/5 px-2 py-0.5 rounded-sm">
                    {lineCount}
                  </span>
                </div>
                <div className="w-px h-3 bg-current/10" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary/50">SPD</span>
                  <span className="text-xs font-mono text-text/70 bg-current/5 px-2 py-0.5 rounded-sm">
                    {speed}ms
                  </span>
                </div>
              </div>

              {/* Right: Progress Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`
                        w-1.5 h-1.5 rounded-full transition-colors duration-200
                        ${i === activeLineIndex && isDecoding && !isPaused
                          ? 'bg-primary'
                          : i < activeLineIndex || !isDecoding
                          ? 'bg-current/20'
                          : 'bg-current/10'
                        }
                      `}
                      animate={i === activeLineIndex && isDecoding && !isPaused ? {
                        scale: [1, 1.3, 1],
                      } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-secondary/50">
                  {String(activeLineIndex + 1).padStart(2, '0')}/{String(lineCount).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Container - Separate section below animation */}
        <div className="border-t border-current/10 bg-text/[0.02]">
          <div className="px-4 py-3">
            <div className="flex items-center justify-end gap-4 mb-3">
              <button
                onClick={() => setShowControls(!showControls)}
                className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-secondary/60 bg-background/80 border border-current/20 hover:bg-background hover:border-current/40 transition-colors min-h-[32px] flex items-center gap-1.5"
              >
                CONTROLS {showControls ? '▲' : '▼'}
              </button>
            </div>

            {/* Control Panel */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="bg-background border-2 border-current shadow-[3px_3px_0px_rgba(0,0,0,0.15)] p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* COLOR_ Section */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">
                          COLOR_
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={primaryColorHex}
                            onChange={(e) => setPrimaryColorHex(e.target.value)}
                            className="w-10 h-8 border border-current/20 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={primaryColorHex}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                                setPrimaryColorHex(value);
                              }
                            }}
                            className="flex-1 px-2 py-1.5 text-xs font-mono bg-background border border-current/20 focus:outline-none focus:border-current/60"
                            placeholder="#ff6b35"
                          />
                        </div>
                      </div>

                      {/* SECONDARY_COLOR_ Section */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">
                          SECONDARY_COLOR_
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={secondaryColorHex}
                            onChange={(e) => setSecondaryColorHex(e.target.value)}
                            className="w-10 h-8 border border-current/20 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={secondaryColorHex}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                                setSecondaryColorHex(value);
                              }
                            }}
                            className="flex-1 px-2 py-1.5 text-xs font-mono bg-background border border-current/20 focus:outline-none focus:border-current/60"
                            placeholder="#00b4d8"
                          />
                        </div>
                      </div>

                      {/* SIZE_ Section */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">
                            SIZE_
                          </div>
                          <div className="text-xs font-mono text-text/70">
                            {shapeSize}px
                          </div>
                        </div>
                        <input
                          type="range"
                          min="48"
                          max="192"
                          step="8"
                          value={shapeSize}
                          onChange={(e) => setShapeSize(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-current/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-current [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-current [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-current [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-current [&::-moz-range-thumb]:cursor-pointer"
                        />
                      </div>

                      {/* GLOW_INTENSITY_ Section */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">
                            GLOW_INTENSITY_
                          </div>
                          <div className="text-xs font-mono text-text/70">
                            {glowIntensity}%
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={glowIntensity}
                          onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-current/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-current [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-current [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-current [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-current [&::-moz-range-thumb]:cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* ROTATION_ Section */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">
                        ROTATION_
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rotationAxes.x}
                            onChange={(e) => setRotationAxes({ ...rotationAxes, x: e.target.checked })}
                            className="w-4 h-4 border border-current/20 cursor-pointer accent-current"
                          />
                          <span className="text-xs font-mono text-text/70">X</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rotationAxes.y}
                            onChange={(e) => setRotationAxes({ ...rotationAxes, y: e.target.checked })}
                            className="w-4 h-4 border border-current/20 cursor-pointer accent-current"
                          />
                          <span className="text-xs font-mono text-text/70">Y</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rotationAxes.z}
                            onChange={(e) => setRotationAxes({ ...rotationAxes, z: e.target.checked })}
                            className="w-4 h-4 border border-current/20 cursor-pointer accent-current"
                          />
                          <span className="text-xs font-mono text-text/70">Z</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Panel>
  );
}
