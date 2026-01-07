'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard, type ProjectCardProps } from './ui';
import MagneticCard from './MagneticCard';
import { Project } from '../data/projects';

interface EnhancedProjectCardProps extends ProjectCardProps {
  project?: Project;
  problemSolved?: string;
  preview?: {
    image?: string;
    additionalInfo?: string;
  };
  onViewDetails?: (project: Project) => void;
}

export default function EnhancedProjectCard({
  project,
  problemSolved,
  preview,
  onViewDetails,
  ...cardProps
}: EnhancedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      // Listen for changes to the media query
      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Legacy browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);

  return (
    <MagneticCard
      className="h-full"
      disabled={reducedMotion}
    >
      <div
        className="h-full relative cursor-pointer"
        onMouseEnter={() => !reducedMotion && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => project && onViewDetails && onViewDetails(project)}
      >
        <ProjectCard {...cardProps} />

        {/* Interactive Preview Overlay */}
        <AnimatePresence>
          {isHovered && (problemSolved || preview?.additionalInfo) && (
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-sm border-2 border-primary p-4 z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3 h-full flex flex-col">
                <h4 className="text-sm font-mono uppercase tracking-wider text-primary font-bold">
                  ADDITIONAL INFORMATION
                </h4>
                {problemSolved && (
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-1">
                      PROBLEM SOLVED:
                    </p>
                    <p className="text-sm text-text leading-relaxed">{problemSolved}</p>
                  </div>
                )}
                {preview?.additionalInfo && (
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-1">
                      DETAILS:
                    </p>
                    <p className="text-sm text-text leading-relaxed">{preview.additionalInfo}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MagneticCard>
  );
}

