'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to get primary color with opacity
const getPrimaryColorWithOpacity = (opacity: number) => {
  if (typeof window === 'undefined') return `rgba(255, 107, 53, ${opacity})`; // Default fallback
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue('--theme-primary').trim();
  
  // Convert hex to rgb
  if (primaryColor.startsWith('#')) {
    const hex = primaryColor.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  return `rgba(255, 107, 53, ${opacity})`; // Fallback
};

// Helper to convert hex to rgb
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Helper to get default primary color as hex
const getDefaultPrimaryColor = (): string => {
  if (typeof window === 'undefined') return '#ff6b35';
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue('--theme-primary').trim();
  return primaryColor.startsWith('#') ? primaryColor : '#ff6b35';
};

export interface Shape3DAnimationProps {
  isDecoding?: boolean;
  isPaused?: boolean;
  currentLineIndex?: number;
  className?: string;
  shapeSize?: number;
  animationSpeed?: number;
  glowIntensity?: number;
  primaryColorHex?: string;
  secondaryColorHex?: string;
  rotationAxes?: { x: boolean; y: boolean; z: boolean };
}

type ShapeType = 'cube' | 'tetrahedron' | 'octahedron';

export default function Shape3DAnimation({
  isDecoding = false,
  isPaused = false,
  currentLineIndex = 0,
  className = '',
  shapeSize = 96,
  animationSpeed = 10,
  glowIntensity = 50,
  primaryColorHex: propPrimaryColorHex,
  secondaryColorHex: propSecondaryColorHex = '#00b4d8',
  rotationAxes: propRotationAxes = { x: true, y: true, z: false },
}: Shape3DAnimationProps) {
  const [currentShape, setCurrentShape] = useState<ShapeType>('cube');
  const [animationKey, setAnimationKey] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(10);
  const [animationType, setAnimationType] = useState('rotate-x-y');
  const shapeChangeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use props if provided, otherwise use defaults
  const primaryColorHex = propPrimaryColorHex || getDefaultPrimaryColor();
  const secondaryColorHex = propSecondaryColorHex;
  const rotationAxes = propRotationAxes;
  
  // Derived color values
  const primaryColorRgb = useMemo(() => hexToRgb(primaryColorHex), [primaryColorHex]);
  const primaryColor10 = useMemo(() => {
    if (!primaryColorRgb) return 'rgba(255, 107, 53, 0.1)';
    return `rgba(${primaryColorRgb.r}, ${primaryColorRgb.g}, ${primaryColorRgb.b}, 0.1)`;
  }, [primaryColorRgb]);
  const primaryColor30 = useMemo(() => {
    if (!primaryColorRgb) return 'rgba(255, 107, 53, 0.3)';
    return `rgba(${primaryColorRgb.r}, ${primaryColorRgb.g}, ${primaryColorRgb.b}, 0.3)`;
  }, [primaryColorRgb]);
  const primaryColor40 = useMemo(() => {
    if (!primaryColorRgb) return 'rgba(255, 107, 53, 0.4)';
    return `rgba(${primaryColorRgb.r}, ${primaryColorRgb.g}, ${primaryColorRgb.b}, 0.4)`;
  }, [primaryColorRgb]);
  
  const secondaryColorRgb = useMemo(() => hexToRgb(secondaryColorHex), [secondaryColorHex]);
  const secondaryColor30 = useMemo(() => {
    if (!secondaryColorRgb) return 'rgba(0, 180, 216, 0.3)';
    return `rgba(${secondaryColorRgb.r}, ${secondaryColorRgb.g}, ${secondaryColorRgb.b}, 0.3)`;
  }, [secondaryColorRgb]);
  const secondaryColor40 = useMemo(() => {
    if (!secondaryColorRgb) return 'rgba(0, 180, 216, 0.4)';
    return `rgba(${secondaryColorRgb.r}, ${secondaryColorRgb.g}, ${secondaryColorRgb.b}, 0.4)`;
  }, [secondaryColorRgb]);
  
  // Calculate glow intensity multipliers (0-100 -> 0.0-4.0 for more intense glow at 100%)
  const glowMultiplier = useMemo(() => (glowIntensity / 100) * 4, [glowIntensity]);
  const shadowIntensity = useMemo(() => {
    const base = 15;
    return Math.round(base * glowMultiplier);
  }, [glowMultiplier]);
  const glowSpread = useMemo(() => {
    const base = 15;
    // At 100%, glow spread should be much more intense (up to 60px)
    return Math.round(base * glowMultiplier);
  }, [glowMultiplier]);
  
  // Generate kaleidoscope pattern based on rotation axes
  const kaleidoscopePattern = useMemo(() => {
    const patterns: Array<{ rotation: number; scale: number; opacity: number }> = [];
    
    const activeCount = [rotationAxes.x, rotationAxes.y, rotationAxes.z].filter(Boolean).length;
    
    // Base shape (always present, centered)
    patterns.push({ rotation: 0, scale: 1, opacity: 1 });
    
    // X axis: 4-fold symmetry (creates 3 additional copies at 90° intervals)
    if (rotationAxes.x) {
      for (let i = 1; i < 4; i++) {
        patterns.push({ 
          rotation: i * 90, 
          scale: activeCount > 1 ? 0.7 : 0.85, 
          opacity: activeCount > 1 ? 0.6 : 0.8 
        });
      }
    }
    
    // Y axis: 6-fold symmetry (creates 5 additional copies at 60° intervals)
    if (rotationAxes.y) {
      const step = rotationAxes.x ? 60 : 60; // 60° increments
      const count = rotationAxes.x ? 6 : 6; // Create 6 total positions
      for (let i = 1; i < count; i++) {
        // Skip positions already covered by X axis
        if (rotationAxes.x && (i * step) % 90 === 0) continue;
        patterns.push({ 
          rotation: i * step, 
          scale: activeCount > 1 ? 0.6 : 0.8, 
          opacity: activeCount > 1 ? 0.5 : 0.7 
        });
      }
    }
    
    // Z axis: 8-fold symmetry (creates 7 additional copies at 45° intervals)
    if (rotationAxes.z) {
      const step = 45; // 45° increments
      const count = 8; // Create 8 total positions
      for (let i = 1; i < count; i++) {
        // Skip positions already covered by X or Y axes
        if (rotationAxes.x && (i * step) % 90 === 0) continue;
        if (rotationAxes.y && (i * step) % 60 === 0) continue;
        patterns.push({ 
          rotation: i * step, 
          scale: activeCount > 1 ? 0.5 : 0.7, 
          opacity: activeCount > 1 ? 0.4 : 0.6 
        });
      }
    }
    
    return patterns;
  }, [rotationAxes]);

  // Generate animation type based on rotation axes (for the base shape)
  const controlledAnimationType = useMemo(() => {
    const axes = [];
    if (rotationAxes.x) axes.push('X');
    if (rotationAxes.y) axes.push('Y');
    if (rotationAxes.z) axes.push('Z');
    
    if (axes.length === 0) return 'rotate-x-y'; // Default
    if (axes.length === 1) {
      const axis = axes[0].toLowerCase();
      return `rotate-${axis}`;
    }
    if (axes.length === 2) {
      const sorted = axes.sort().map(a => a.toLowerCase()).join('-');
      return `rotate-${sorted}`;
    }
    // All three axes
    return 'rotate-x-y-z';
  }, [rotationAxes]);


  // Change shape based on decoding state and line progress
  useEffect(() => {
    if (!isDecoding || isPaused) {
      if (shapeChangeIntervalRef.current) {
        clearInterval(shapeChangeIntervalRef.current);
        shapeChangeIntervalRef.current = null;
      }
      // Use controlled values when paused/stopped
      setAnimationDuration(animationSpeed);
      setAnimationType(controlledAnimationType);
      return;
    }

    // Change shape more frequently when actively decoding
    const changeShape = () => {
      const shapes: ShapeType[] = ['cube', 'tetrahedron', 'octahedron'];
      const nextShape = shapes[Math.floor(Math.random() * shapes.length)];
      setCurrentShape(nextShape);
      setAnimationKey((prev) => prev + 1);
      
      // Faster rotation when actively decoding (override controls)
      setAnimationDuration(8 + Math.random() * 4);
      
      // Randomize animation type (override controls)
      const types = ['rotate-x-y', 'rotate-x-z', 'rotate-y-z'];
      setAnimationType(types[Math.floor(Math.random() * types.length)]);
    };

    // Change shape every 6-12 seconds when decoding (at least twice as long)
    const interval = setInterval(changeShape, Math.random() * 6000 + 6000);
    shapeChangeIntervalRef.current = interval;

    // Initial faster animation (override controls)
    setAnimationDuration(8 + Math.random() * 4);
    const types = ['rotate-x-y', 'rotate-x-z', 'rotate-y-z'];
    setAnimationType(types[Math.floor(Math.random() * types.length)]);

    return () => {
      if (shapeChangeIntervalRef.current) {
        clearInterval(shapeChangeIntervalRef.current);
        shapeChangeIntervalRef.current = null;
      }
    };
  }, [isDecoding, isPaused, currentLineIndex, animationSpeed, controlledAnimationType]);

  // Select shape based on line index when decoding starts
  useEffect(() => {
    if (isDecoding && !isPaused) {
      const shapes: ShapeType[] = ['cube', 'tetrahedron', 'octahedron'];
      const shapeIndex = currentLineIndex % shapes.length;
      setCurrentShape(shapes[shapeIndex]);
      setAnimationKey((prev) => prev + 1);
    }
  }, [isDecoding, isPaused, currentLineIndex]);

  // Calculate translateZ based on size (half of size for cube)
  const translateZ = shapeSize / 2;

  return (
    <div className={`relative ${className || 'w-full h-full'}`}>
        {/* Shapes Container */}
        <div className="shape-3d-container relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-30"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 2px
              )`,
              animation: 'scanlines 0.1s linear infinite',
            }}
          />

          {/* 3D Shapes Wrapper */}
          <div className="shape-3d-wrapper relative w-32 h-32 z-0">
          {/* Kaleidoscope Pattern - Multiple shapes based on rotation axes */}
          <AnimatePresence mode="wait">
            {currentShape === 'cube' && kaleidoscopePattern.map((pattern, patternIndex) => {
              const scaledSize = shapeSize * pattern.scale;
              const scaledTranslateZ = (scaledSize / 2);
              return (
              <motion.div
                key={`cube-${animationKey}-${patternIndex}`}
                className="shape-3d-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  animation: `${animationType} ${animationDuration}s linear infinite`,
                  transform: `rotateZ(${pattern.rotation}deg)`,
                  opacity: pattern.opacity,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: pattern.opacity, scale: pattern.scale }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: patternIndex * 0.05 }}
              >
              {/* Front */}
              <div
                className="absolute border-2 flex items-center justify-center text-xs font-mono"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  borderColor: primaryColorHex,
                  backgroundColor: primaryColor10,
                  color: primaryColorHex,
                  transform: `rotateY(0deg) translateZ(${scaledTranslateZ}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                }}
              >
                F
              </div>
              {/* Back */}
              <div
                className="absolute border-2 flex items-center justify-center text-xs font-mono"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  borderColor: primaryColorHex,
                  backgroundColor: primaryColor10,
                  color: primaryColorHex,
                  transform: `rotateY(180deg) translateZ(${scaledTranslateZ}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                }}
              >
                B
              </div>
              {/* Right */}
              <div
                className="absolute border-2 flex items-center justify-center text-xs font-mono"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  borderColor: primaryColorHex,
                  backgroundColor: primaryColor10,
                  color: primaryColorHex,
                  transform: `rotateY(90deg) translateZ(${scaledTranslateZ}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                }}
              >
                R
              </div>
              {/* Left */}
              <div
                className="absolute border-2 flex items-center justify-center text-xs font-mono"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  borderColor: primaryColorHex,
                  backgroundColor: primaryColor10,
                  color: primaryColorHex,
                  transform: `rotateY(-90deg) translateZ(${scaledTranslateZ}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                }}
              >
                L
              </div>
              {/* Top */}
              <div
                className="absolute border-2 flex items-center justify-center text-xs font-mono"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  borderColor: primaryColorHex,
                  backgroundColor: primaryColor10,
                  color: primaryColorHex,
                  transform: `rotateX(90deg) translateZ(${scaledTranslateZ}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                }}
              >
                T
              </div>
              {/* Bottom */}
              <div
                className="absolute border-2 flex items-center justify-center text-xs font-mono"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  borderColor: primaryColorHex,
                  backgroundColor: primaryColor10,
                  color: primaryColorHex,
                  transform: `rotateX(-90deg) translateZ(${scaledTranslateZ}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                }}
              >
                Bo
              </div>
              </motion.div>
            )})}

            {/* Tetrahedron */}
            {currentShape === 'tetrahedron' && kaleidoscopePattern.map((pattern, patternIndex) => {
              const scaledSize = shapeSize * pattern.scale;
              return (
              <motion.div
                key={`tetra-${animationKey}-${patternIndex}`}
                className="shape-3d-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${scaledSize * 1.17}px`,
                  height: `${scaledSize * 1.17}px`,
                  animation: `${animationType} ${animationDuration}s linear infinite`,
                  transform: `rotateZ(${pattern.rotation}deg)`,
                  opacity: pattern.opacity,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: pattern.opacity, scale: pattern.scale }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: patternIndex * 0.05 }}
              >
              {(() => {
                const baseSize = scaledSize * 0.58;
                const height = scaledSize;
                return (
                  <>
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: `${baseSize}px`,
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightWidth: `${baseSize}px`,
                  borderRightStyle: 'solid',
                  borderRightColor: 'transparent',
                  borderBottomWidth: `${height}px`,
                  borderBottomStyle: 'solid',
                  borderBottomColor: primaryColor10,
                  transform: 'translateZ(0px)',
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${baseSize}px`,
                  marginTop: `-${height}px`,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: `${baseSize}px`,
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightWidth: '0',
                  borderRightStyle: 'solid',
                  borderRightColor: 'transparent',
                  borderBottomWidth: `${height}px`,
                  borderBottomStyle: 'solid',
                  borderBottomColor: primaryColor10,
                  transform: 'rotateY(120deg) translateZ(0px)',
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${baseSize}px`,
                  marginTop: `-${height}px`,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: `${baseSize}px`,
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightWidth: '0',
                  borderRightStyle: 'solid',
                  borderRightColor: 'transparent',
                  borderBottomWidth: `${height}px`,
                  borderBottomStyle: 'solid',
                  borderBottomColor: primaryColor10,
                  transform: 'rotateY(240deg) translateZ(0px)',
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${baseSize}px`,
                  marginTop: `-${height}px`,
                }}
              />
                  </>
                );
              })()}
              </motion.div>
            )})}

            {/* Octahedron */}
            {currentShape === 'octahedron' && kaleidoscopePattern.map((pattern, patternIndex) => {
              const scaledSize = shapeSize * pattern.scale;
              return (
              <motion.div
                key={`octa-${animationKey}-${patternIndex}`}
                className="shape-3d-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  animation: `${animationType} ${animationDuration}s linear infinite`,
                  transform: `rotateZ(${pattern.rotation}deg)`,
                  opacity: pattern.opacity,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: pattern.opacity, scale: pattern.scale }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: patternIndex * 0.05 }}
              >
              {(() => {
                const baseSize = scaledSize * 0.29;
                const height = scaledSize * 0.5;
                const translateZOcta = scaledSize * 0.5;
                return (
                  <>
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: `${baseSize}px`,
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightWidth: `${baseSize}px`,
                  borderRightStyle: 'solid',
                  borderRightColor: 'transparent',
                  borderBottomWidth: `${height}px`,
                  borderBottomStyle: 'solid',
                  borderBottomColor: primaryColor10,
                  transform: `translateZ(${translateZOcta}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${baseSize}px`,
                  marginTop: `-${height}px`,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: `${baseSize}px`,
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightWidth: `${baseSize}px`,
                  borderRightStyle: 'solid',
                  borderRightColor: 'transparent',
                  borderTopWidth: `${height}px`,
                  borderTopStyle: 'solid',
                  borderTopColor: primaryColor10,
                  transform: `rotateX(180deg) translateZ(${translateZOcta}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${baseSize}px`,
                  marginTop: `-${height}px`,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: `${baseSize}px`,
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightWidth: `${baseSize}px`,
                  borderRightStyle: 'solid',
                  borderRightColor: 'transparent',
                  borderBottomWidth: `${height}px`,
                  borderBottomStyle: 'solid',
                  borderBottomColor: primaryColor10,
                  transform: `rotateY(90deg) translateZ(${translateZOcta}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${baseSize}px`,
                  marginTop: `-${height}px`,
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: `${baseSize}px`,
                  borderLeftStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightWidth: `${baseSize}px`,
                  borderRightStyle: 'solid',
                  borderRightColor: 'transparent',
                  borderTopWidth: `${height}px`,
                  borderTopStyle: 'solid',
                  borderTopColor: primaryColor10,
                  transform: `rotateY(90deg) rotateX(180deg) translateZ(${translateZOcta}px)`,
                  boxShadow: `inset 0 0 ${10 * glowMultiplier}px ${primaryColor30}, 0 0 ${glowSpread}px ${secondaryColor40}`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${baseSize}px`,
                  marginTop: `-${height}px`,
                }}
              />
                  </>
                );
              })()}
              </motion.div>
            )})}
          </AnimatePresence>
          </div>
        </div>
    </div>
  );
}


