'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextDecoder from './TextDecoder';
import { resumeData } from '../data/resume';

interface RotatingTitleProps {
  className?: string;
  interval?: number; // Time in milliseconds between rotations
  shuffleOnMount?: boolean; // Randomize order on mount
}

// Extract unique titles from resume data
function getTitlesFromResume(): string[] {
  const titles = new Set<string>();

  // Add titles from work history - format them nicely
  resumeData.workHistory.forEach((item) => {
    // Convert all caps to title case
    const cleanTitle = item.title
      .split(' ')
      .map((word) => {
        // Preserve common abbreviations and connectors
        if (word === '&' || word === 'AND') return '&';
        if (word === 'TO' || word === 'OF') return word.toLowerCase();
        // Capitalize first letter, lowercase rest
        return word.charAt(0) + word.slice(1).toLowerCase();
      })
      .join(' ')
      .replace(/\s+&\s+/g, ' & '); // Normalize spaces around &
    
    titles.add(cleanTitle);
    
    // Also extract key roles from title
    if (cleanTitle.includes('Producer')) titles.add('Producer');
    if (cleanTitle.includes('Director')) titles.add('Director');
    if (cleanTitle.includes('Manager')) titles.add('Production Manager');
    if (cleanTitle.includes('Supervisor')) titles.add('Production Supervisor');
  });

  // Extract from competencies - convert to role titles
  if (resumeData.competencies) {
    resumeData.competencies.forEach((comp) => {
      const title = comp.title
        .replace(/CORE COMPETENCY:?\s*/i, '')
        .replace(/\s*COMPETENCY$/i, '')
        .split(' ')
        .map((word, idx) => {
          if (idx === 0) return word.charAt(0) + word.slice(1).toLowerCase();
          return word.toLowerCase();
        })
        .join(' ')
        .trim();
      
      if (title && title.length > 3) {
        titles.add(title);
      }
    });
  }

  return Array.from(titles).filter((title) => title.length > 0);
}

// Static creative titles based on resume content
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

export default function RotatingTitle({
  className = '',
  interval = 3000, // Default 3 seconds
  shuffleOnMount = true,
}: RotatingTitleProps) {
  // Combine resume titles with static creative titles
  const allTitles = useMemo(() => {
    const resumeTitles = getTitlesFromResume();
    const combined = [...staticCreativeTitles, ...resumeTitles];

    // Remove duplicates and shuffle if requested
    const unique = Array.from(new Set(combined));
    return shuffleOnMount ? shuffleArray([...unique]) : unique;
  }, [shuffleOnMount]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (allTitles.length <= 1) return;

    const cycleInterval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // After fade out animation, change title
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % allTitles.length);
        setIsVisible(true);
      }, 300); // Half of transition duration
    }, interval);

    return () => clearInterval(cycleInterval);
  }, [allTitles.length, interval]);

  if (allTitles.length === 0) {
    return (
      <span className={`font-mono text-sm font-semibold text-text ${className}`}>
        Creative Producer
      </span>
    );
  }

  const currentTitle = allTitles[currentIndex];

  return (
    <div className="inline-block min-w-[200px]">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            <TextDecoder
              key={currentTitle} // Force remount on title change to restart decoding animation
              text={currentTitle}
              className={`${className}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Utility function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

