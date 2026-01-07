'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSymbolLine, symbolSets } from '@/lib/symbolLibrary';

interface DramaticPageLoadProps {
  children: React.ReactNode;
}

export default function DramaticPageLoad({ children }: DramaticPageLoadProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showRedaction, setShowRedaction] = useState(true);
  const [symbolText, setSymbolText] = useState('');
  const [symbolTextBottom, setSymbolTextBottom] = useState('');
  const [leftColumnSymbols, setLeftColumnSymbols] = useState<string[]>([]);
  const [rightColumnSymbols, setRightColumnSymbols] = useState<string[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [matrixColumns, setMatrixColumns] = useState<string[][]>([]);
  const [matrixColumnsTop, setMatrixColumnsTop] = useState<string[][]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const columnAnimationRef = useRef<number | null>(null);
  const matrixAnimationRef = useRef<number | null>(null);
  const matrixTopAnimationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const columnLastUpdateRef = useRef<number>(0);
  const matrixLastUpdateRef = useRef<number>(0);
  const matrixTopLastUpdateRef = useRef<number>(0);
  const prefersReducedMotion = useRef<boolean>(false);
  
  const activeSets: (keyof typeof symbolSets)[] = ['egyptian', 'runes', 'geometric', 'technical', 'tibetan', 'alchemy'];
  const lineLength = 25;
  const speed = 50;
  const columnSymbolCount = 15; // Number of symbols in each vertical column
  const columnSpeed = 60; // Update speed for column animation
  const matrixColumnCount = 15;
  const matrixRowCount = 10; // Fewer rows since it's at the bottom
  const matrixTopRowCount = 10; // Rows for top falling effect
  const matrixSpeed = 100; // Slower for smoother fade-up effect
  const matrixTopSpeed = 100; // Speed for top falling effect
  const matrixDuration = 2500; // 2.5 seconds of matrix effect

  // Ensure client-side only rendering to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.current = mediaQuery.matches;

      const handleChange = (e: MediaQueryListEvent) => {
        prefersReducedMotion.current = e.matches;
        if (e.matches) {
          setSymbolText(generateSymbolLine(lineLength, activeSets));
          setSymbolTextBottom(generateSymbolLine(lineLength, activeSets));
          // Static columns for reduced motion
          const staticColumn = Array(columnSymbolCount)
            .fill(0)
            .map(() => generateSymbolLine(1, activeSets));
          setLeftColumnSymbols(staticColumn);
          setRightColumnSymbols(staticColumn);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Animation loop for symbol text
  const updateSymbolText = useCallback(() => {
    if (prefersReducedMotion.current || isLoaded) {
      return;
    }

    const now = performance.now();
    const timeSinceLastUpdate = now - lastUpdateTimeRef.current;

    if (timeSinceLastUpdate >= speed) {
      setSymbolText(generateSymbolLine(lineLength, activeSets));
      setSymbolTextBottom(generateSymbolLine(lineLength, activeSets));
      lastUpdateTimeRef.current = now;
    }

    animationFrameRef.current = requestAnimationFrame(updateSymbolText);
  }, [isLoaded, lineLength, speed]);

  // Animation loop for vertical columns
  const updateColumns = useCallback(() => {
    if (prefersReducedMotion.current || isLoaded) {
      return;
    }

    const now = performance.now();
    const timeSinceLastUpdate = now - columnLastUpdateRef.current;

    if (timeSinceLastUpdate >= columnSpeed) {
      // Generate new symbols for each column
      const newLeftColumn = Array(columnSymbolCount)
        .fill(0)
        .map(() => generateSymbolLine(1, activeSets));
      const newRightColumn = Array(columnSymbolCount)
        .fill(0)
        .map(() => generateSymbolLine(1, activeSets));
      
      setLeftColumnSymbols(newLeftColumn);
      setRightColumnSymbols(newRightColumn);
      columnLastUpdateRef.current = now;
    }

    columnAnimationRef.current = requestAnimationFrame(updateColumns);
  }, [isLoaded, columnSpeed]);

  // Start symbol animation (only on client)
  useEffect(() => {
    if (!isMounted) return; // Wait for client-side mount
    
    if (prefersReducedMotion.current) {
      setSymbolText(generateSymbolLine(lineLength, activeSets));
      setSymbolTextBottom(generateSymbolLine(lineLength, activeSets));
      // Static columns for reduced motion
      const staticColumn = Array(columnSymbolCount)
        .fill(0)
        .map(() => generateSymbolLine(1, activeSets));
      setLeftColumnSymbols(staticColumn);
      setRightColumnSymbols(staticColumn);
      return;
    }

    if (!isLoaded) {
      animationFrameRef.current = requestAnimationFrame(updateSymbolText);
      columnAnimationRef.current = requestAnimationFrame(updateColumns);
      
      // Initialize columns immediately
      const initialLeftColumn = Array(columnSymbolCount)
        .fill(0)
        .map(() => generateSymbolLine(1, activeSets));
      const initialRightColumn = Array(columnSymbolCount)
        .fill(0)
        .map(() => generateSymbolLine(1, activeSets));
      setLeftColumnSymbols(initialLeftColumn);
      setRightColumnSymbols(initialRightColumn);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (columnAnimationRef.current) {
        cancelAnimationFrame(columnAnimationRef.current);
        columnAnimationRef.current = null;
      }
    };
  }, [isMounted, isLoaded, updateSymbolText, updateColumns, lineLength]);

  // Initialize matrix columns (only on client) - for bottom fade-up effect
  useEffect(() => {
    if (!isMounted || prefersReducedMotion.current) return;
    
    const columns: string[][] = [];
    for (let i = 0; i < matrixColumnCount; i++) {
      const column: string[] = [];
      // Start with empty column, symbols will fade up from bottom
      for (let j = 0; j < matrixRowCount; j++) {
        column.push('');
      }
      columns.push(column);
    }
    setMatrixColumns(columns);
  }, [isMounted, matrixColumnCount, matrixRowCount]);

  // Initialize top matrix columns (only on client) - for top fall-down effect
  useEffect(() => {
    if (!isMounted || prefersReducedMotion.current) return;
    
    const columns: string[][] = [];
    for (let i = 0; i < matrixColumnCount; i++) {
      const column: string[] = [];
      // Start with empty column, symbols will fall down from top
      for (let j = 0; j < matrixTopRowCount; j++) {
        column.push('');
      }
      columns.push(column);
    }
    setMatrixColumnsTop(columns);
  }, [isMounted, matrixColumnCount, matrixTopRowCount]);

  // Matrix animation loop (bottom fade-up)
  const updateMatrix = useCallback(() => {
    if (prefersReducedMotion.current || !showMatrix || isLoaded) {
      return;
    }

    const now = performance.now();
    const timeSinceLastUpdate = now - matrixLastUpdateRef.current;

    if (timeSinceLastUpdate >= matrixSpeed) {
      setMatrixColumns((prevColumns) => {
        return prevColumns.map((column) => {
          // Shift column up and add new symbol at bottom (fade-up effect)
          const newColumn = [...column];
          newColumn.shift(); // Remove top symbol (oldest)
          // Randomly add new symbol at bottom (creates rising effect)
          if (Math.random() > 0.25) {
            newColumn.push(generateSymbolLine(1, activeSets));
          } else {
            newColumn.push(''); // Empty space for variation
          }
          return newColumn;
        });
      });
      matrixLastUpdateRef.current = now;
    }

    matrixAnimationRef.current = requestAnimationFrame(updateMatrix);
  }, [showMatrix, isLoaded, matrixSpeed]);

  // Top matrix animation loop (fall-down effect)
  const updateMatrixTop = useCallback(() => {
    if (prefersReducedMotion.current || !showMatrix || isLoaded) {
      return;
    }

    const now = performance.now();
    const timeSinceLastUpdate = now - matrixTopLastUpdateRef.current;

    if (timeSinceLastUpdate >= matrixTopSpeed) {
      setMatrixColumnsTop((prevColumns) => {
        return prevColumns.map((column) => {
          // Shift column down and add new symbol at top (fall-down effect)
          const newColumn = [...column];
          newColumn.pop(); // Remove bottom symbol (oldest)
          // Randomly add new symbol at top (creates falling effect)
          if (Math.random() > 0.25) {
            newColumn.unshift(generateSymbolLine(1, activeSets));
          } else {
            newColumn.unshift(''); // Empty space for variation
          }
          return newColumn;
        });
      });
      matrixTopLastUpdateRef.current = now;
    }

    matrixTopAnimationRef.current = requestAnimationFrame(updateMatrixTop);
  }, [showMatrix, isLoaded, matrixTopSpeed]);

  // Start matrix effects
  useEffect(() => {
    if (prefersReducedMotion.current) return;

    if (showMatrix && !isLoaded) {
      matrixAnimationRef.current = requestAnimationFrame(updateMatrix);
      matrixTopAnimationRef.current = requestAnimationFrame(updateMatrixTop);
      
      // Stop matrix after duration
      const matrixTimer = setTimeout(() => {
        setShowMatrix(false);
      }, matrixDuration);

      return () => {
        if (matrixAnimationRef.current) {
          cancelAnimationFrame(matrixAnimationRef.current);
          matrixAnimationRef.current = null;
        }
        if (matrixTopAnimationRef.current) {
          cancelAnimationFrame(matrixTopAnimationRef.current);
          matrixTopAnimationRef.current = null;
        }
        clearTimeout(matrixTimer);
      };
    }

    return () => {
      if (matrixAnimationRef.current) {
        cancelAnimationFrame(matrixAnimationRef.current);
        matrixAnimationRef.current = null;
      }
      if (matrixTopAnimationRef.current) {
        cancelAnimationFrame(matrixTopAnimationRef.current);
        matrixTopAnimationRef.current = null;
      }
    };
  }, [showMatrix, isLoaded, updateMatrix, updateMatrixTop, matrixDuration]);

  useEffect(() => {
    // Trigger redaction animation
    const redactionTimer = setTimeout(() => setShowRedaction(false), 300);
    // Show matrix effect after stamps are visible (600ms delay)
    const matrixTimer = setTimeout(() => setShowMatrix(true), 600);
    // Trigger full load after matrix effect completes
    const loadTimer = setTimeout(() => setIsLoaded(true), 800 + matrixDuration);

    return () => {
      clearTimeout(redactionTimer);
      clearTimeout(matrixTimer);
      clearTimeout(loadTimer);
    };
  }, [matrixDuration]);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Random Symbol Text - Top (replacing TOP SECRET) */}
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-3 border-4 border-primary bg-background font-mono text-2xl font-bold uppercase tracking-widest text-primary transform rotate-12">
                {isMounted ? (symbolText || '') : ''}
              </div>
            </motion.div>

            {/* Random Symbol Text - Bottom (opposite rotation) */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-3 border-4 border-primary bg-background font-mono text-2xl font-bold uppercase tracking-widest text-primary transform -rotate-12">
                {isMounted ? (symbolTextBottom || '') : ''}
              </div>
            </motion.div>

            {/* Redaction Bars */}
            {showRedaction && (
              <motion.div
                className="absolute inset-0 flex flex-col gap-2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-12 bg-text"
                    initial={{ width: '100%' }}
                    animate={{ width: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.05,
                      duration: 0.7,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Decoding Text */}
            <motion.div
              className="font-mono text-sm uppercase tracking-wider text-secondary z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              LOADING...
            </motion.div>

            {/* Vertical Symbol Columns - Left */}
            {isMounted && (
              <motion.div
                className="absolute left-[15%] top-1/2 transform -translate-y-1/2 pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="border-4 border-primary bg-background/90 backdrop-blur-sm px-4 py-6 flex flex-col items-center gap-1">
                  {leftColumnSymbols.map((symbol, index) => (
                    <motion.div
                      key={index}
                      className="font-mono text-xl text-primary leading-relaxed"
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: index * 0.1,
                      }}
                    >
                      {symbol}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Vertical Symbol Columns - Right */}
            {isMounted && (
              <motion.div
                className="absolute right-[15%] top-1/2 transform -translate-y-1/2 pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="border-4 border-primary bg-background/90 backdrop-blur-sm px-4 py-6 flex flex-col items-center gap-1">
                  {rightColumnSymbols.map((symbol, index) => (
                    <motion.div
                      key={index}
                      className="font-mono text-xl text-primary leading-relaxed"
                      initial={{ opacity: 0.3 }}
                      animate={{ 
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: index * 0.1 + 0.5,
                      }}
                    >
                      {symbol}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Matrix Code Fall-Down Effect - Top */}
            <AnimatePresence>
              {showMatrix && !prefersReducedMotion.current && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[40vh] overflow-hidden pointer-events-none z-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="grid gap-0 h-full w-full"
                    style={{ gridTemplateColumns: `repeat(${matrixColumnCount}, minmax(0, 1fr))` }}
                  >
                    {matrixColumnsTop.map((column, colIndex) => (
                      <div
                        key={`top-${colIndex}`}
                        className="flex flex-col justify-start items-center"
                      >
                        {column.map((symbol, rowIndex) => {
                          // Create gradient effect - brighter at top, fading down
                          // Top symbols are brightest, fade as they fall
                          const fadeStart = 0;
                          const fadeEnd = matrixTopRowCount * 0.7;
                          const position = rowIndex;
                          const opacity = position <= fadeStart
                            ? 1
                            : position >= fadeEnd
                            ? 0.1
                            : 1 - ((position - fadeStart) / (fadeEnd - fadeStart)) * 0.9;
                          
                          return (
                            <motion.div
                              key={`top-${colIndex}-${rowIndex}`}
                              className="font-mono text-lg text-primary leading-tight"
                              style={{
                                opacity: symbol ? opacity : 0,
                                filter: `brightness(${Math.max(0.6, opacity)})`,
                              }}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ 
                                opacity: symbol ? opacity : 0,
                                y: 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {symbol}
                            </motion.div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Matrix Code Fade-Up Effect - Bottom */}
            <AnimatePresence>
              {showMatrix && !prefersReducedMotion.current && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[40vh] overflow-hidden pointer-events-none z-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="grid gap-0 h-full w-full"
                    style={{ gridTemplateColumns: `repeat(${matrixColumnCount}, minmax(0, 1fr))` }}
                  >
                    {matrixColumns.map((column, colIndex) => (
                      <div
                        key={`bottom-${colIndex}`}
                        className="flex flex-col justify-end items-center"
                      >
                        {column.map((symbol, rowIndex) => {
                          // Create gradient effect - brighter at bottom, fading up
                          // Bottom symbols are brightest, fade as they rise
                          const fadeStart = matrixRowCount * 0.3;
                          const fadeEnd = 0;
                          const position = rowIndex;
                          const opacity = position >= fadeStart
                            ? 1
                            : position <= fadeEnd
                            ? 0.1
                            : 1 - ((fadeStart - position) / (fadeStart - fadeEnd)) * 0.9;
                          
                          return (
                            <motion.div
                              key={`bottom-${colIndex}-${rowIndex}`}
                              className="font-mono text-lg text-primary leading-tight"
                              style={{
                                opacity: symbol ? opacity : 0,
                                filter: `brightness(${Math.max(0.6, opacity)})`,
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ 
                                opacity: symbol ? opacity : 0,
                                y: 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {symbol}
                            </motion.div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

