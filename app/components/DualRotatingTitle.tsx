'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextDecoder from './TextDecoder';
import { resumeData } from '../data/resume';

interface DualRotatingTitleProps {
  className?: string;
  shuffleOnMount?: boolean;
}

// Convert string to proper Title Case (first letter of each word capitalized)
function toTitleCase(str: string): string {
  // Words that should be lowercase unless they're the first word
  const lowercaseWords = ['and', 'or', 'but', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'of', 'in', 'the', 'a', 'an'];
  
  return str
    .split(' ')
    .map((word, index) => {
      // Handle special characters like & separately
      if (word === '&' || word === 'AND') return '&';
      
      // Always capitalize first word, or if it's not a lowercase word
      const shouldLowercase = index > 0 && lowercaseWords.includes(word.toLowerCase());
      
      if (shouldLowercase) {
        return word.toLowerCase();
      }
      
      // Capitalize first letter, lowercase rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .replace(/\s+&\s+/g, ' & '); // Normalize spaces around &
}

// Extract unique titles from resume data
function getTitlesFromResume(): string[] {
  const titles = new Set<string>();

  resumeData.workHistory.forEach((item) => {
    // Convert to title case properly
    const cleanTitle = toTitleCase(item.title);
    titles.add(cleanTitle);
    
    // Extract key roles
    if (cleanTitle.includes('Producer')) titles.add('Producer');
    if (cleanTitle.includes('Director')) titles.add('Director');
    if (cleanTitle.includes('Manager')) titles.add('Production Manager');
    if (cleanTitle.includes('Supervisor')) titles.add('Production Supervisor');
  });

  if (resumeData.competencies) {
    resumeData.competencies.forEach((comp) => {
      const title = comp.title
        .replace(/CORE COMPETENCY:?\s*/i, '')
        .replace(/\s*COMPETENCY$/i, '')
        .trim();
      
      if (title && title.length > 3) {
        titles.add(toTitleCase(title));
      }
    });
  }

  return Array.from(titles).filter((title) => title.length > 0);
}

const staticCreativeTitles = [
  'Creative Producer',
  'Creative Technologist',
  'Innovation Producer',
  'Video Creative Leader',
  'Production Systems Strategist',
  'Content Systems Architect',
  'Creative Director',
  'Storyteller',
  'Content Producer',
  'Creative Strategist',
  'Media Producer',
  'Creative Systems Engineer',
  'Production Technologist',
  'Content Creator',
  'Creative Production Lead',
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DualRotatingTitle({
  className = '',
  shuffleOnMount = true,
}: DualRotatingTitleProps) {
  const allTitles = useMemo(() => {
    const resumeTitles = getTitlesFromResume();
    const combined = [...staticCreativeTitles, ...resumeTitles];
    const unique = Array.from(new Set(combined.map(t => toTitleCase(t))));
    return shuffleOnMount ? shuffleArray([...unique]) : unique;
  }, [shuffleOnMount]);

  const [titlePool1, titlePool2] = useMemo(() => {
    const shuffled = shuffleArray([...allTitles]);
    const midpoint = Math.ceil(shuffled.length / 2);
    return [shuffled.slice(0, midpoint), shuffled.slice(midpoint)];
  }, [allTitles]);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [isDecoding1, setIsDecoding1] = useState(false);
  const [isDecoding2, setIsDecoding2] = useState(false);
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  
  const currentTitle1 = toTitleCase(titlePool1[index1] || titlePool1[0] || 'Creative Producer');
  const currentTitle2 = toTitleCase(titlePool2[index2] || titlePool2[0] || 'Creative Technologist');

  // Handle title 1 completion - rotate title 2, then start decoding it
  const handleTitle1Complete = useCallback(() => {
    setIsDecoding1(false);
    
    // Rotate title 2 after a brief delay
    setTimeout(() => {
      setIsVisible2(false);
      setTimeout(() => {
        setIndex2((prev) => (prev + 1) % titlePool2.length);
        setIsVisible2(true);
        
        // Start decoding title 2 after it's rotated
        setTimeout(() => {
          setIsDecoding2(true);
        }, 300);
      }, 200);
    }, 800); // Brief pause after title 1 finishes
  }, [titlePool2.length]);

  // Handle title 2 completion - rotate title 1, then start decoding it
  const handleTitle2Complete = useCallback(() => {
    setIsDecoding2(false);
    
    // Rotate title 1 after a brief delay
    setTimeout(() => {
      setIsVisible1(false);
      setTimeout(() => {
        setIndex1((prev) => (prev + 1) % titlePool1.length);
        setIsVisible1(true);
        
        // Start decoding title 1 after it's rotated
        setTimeout(() => {
          setIsDecoding1(true);
        }, 300);
      }, 200);
    }, 800); // Brief pause after title 2 finishes
  }, [titlePool1.length]);

  // Start with title 1 decoding on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDecoding1(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 min-w-[400px]">
      {/* First Title */}
      <div className="inline-block">
        <AnimatePresence mode="wait">
          {isVisible1 && (
            <motion.div
              key={`title1-${index1}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <TextDecoder
                key={`decoder1-${currentTitle1}-${index1}`}
                text={currentTitle1}
                className={`font-mono text-sm font-semibold text-text ${className}`}
                onDecodeComplete={handleTitle1Complete}
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

      {/* Second Title */}
      <div className="inline-block">
        <AnimatePresence mode="wait">
          {isVisible2 && (
            <motion.div
              key={`title2-${index2}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <TextDecoder
                key={`decoder2-${currentTitle2}-${index2}`}
                text={currentTitle2}
                className={`font-mono text-sm font-semibold text-text ${className}`}
                onDecodeComplete={handleTitle2Complete}
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
