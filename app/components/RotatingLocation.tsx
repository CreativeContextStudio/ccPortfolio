'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextDecoder from './TextDecoder';

interface RotatingLocationProps {
  className?: string;
}

const allLocationOptions = [
  'Atlanta',
  'Brooklyn',
  'Los Angeles',
  'New York',
  'Montevideo',
  'Cologne',
  'Mendocino',
  'Rotterdam',
  'Manantiales',
  'Planet X',
  'Buenos Aires',
  'remote',
  'global',
  'worldwide',
  'virtual',
  'astral plane',
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function RotatingLocation({
  className = '',
}: RotatingLocationProps) {
  const shuffledOptions = useMemo(() => shuffleArray([...allLocationOptions]), []);
  
  const [pool1, pool2] = useMemo(() => {
    const shuffled = shuffleArray([...allLocationOptions]);
    const midpoint = Math.ceil(shuffled.length / 2);
    return [shuffled.slice(0, midpoint), shuffled.slice(midpoint)];
  }, []);
  
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [isDecoding1, setIsDecoding1] = useState(false);
  const [isDecoding2, setIsDecoding2] = useState(false);
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  
  const currentOption1 = pool1[index1] || pool1[0] || 'Atlanta';
  const currentOption2 = pool2[index2] || pool2[0] || 'remote';

  // Handle option 1 completion - rotate option 2, then start decoding it
  const handleOption1Complete = useCallback(() => {
    setIsDecoding1(false);
    
    // Rotate option 2 after a brief delay
    setTimeout(() => {
      setIsVisible2(false);
      setTimeout(() => {
        setIndex2((prev) => (prev + 1) % pool2.length);
        setIsVisible2(true);
        
        // Start decoding option 2 after it's rotated
        setTimeout(() => {
          setIsDecoding2(true);
        }, 300);
      }, 200);
    }, 800); // Brief pause after option 1 finishes
  }, [pool2.length]);

  // Handle option 2 completion - rotate option 1, then start decoding it
  const handleOption2Complete = useCallback(() => {
    setIsDecoding2(false);
    
    // Rotate option 1 after a brief delay
    setTimeout(() => {
      setIsVisible1(false);
      setTimeout(() => {
        setIndex1((prev) => (prev + 1) % pool1.length);
        setIsVisible1(true);
        
        // Start decoding option 1 after it's rotated
        setTimeout(() => {
          setIsDecoding1(true);
        }, 300);
      }, 200);
    }, 800); // Brief pause after option 2 finishes
  }, [pool1.length]);

  // Start with option 1 decoding on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDecoding1(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2">
      {/* First Option */}
      <div className="inline-block">
        <AnimatePresence mode="wait">
          {isVisible1 && (
            <motion.div
              key={`option1-${index1}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <TextDecoder
                key={`decoder1-${currentOption1}-${index1}`}
                text={currentOption1}
                className={`font-mono text-sm font-semibold text-text ${className}`}
                onDecodeComplete={handleOption1Complete}
                shouldDecode={isDecoding1}
                autoStart={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Separator */}
      <span className="font-mono text-sm font-semibold text-text opacity-60">
        /
      </span>

      {/* Second Option */}
      <div className="inline-block">
        <AnimatePresence mode="wait">
          {isVisible2 && (
            <motion.div
              key={`option2-${index2}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <TextDecoder
                key={`decoder2-${currentOption2}-${index2}`}
                text={currentOption2}
                className={`font-mono text-sm font-semibold text-text ${className}`}
                onDecodeComplete={handleOption2Complete}
                shouldDecode={isDecoding2}
                autoStart={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

