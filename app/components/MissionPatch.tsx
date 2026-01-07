'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickPattern } from '../hooks/useClickPattern';

interface MissionPatchProps {
  className?: string;
}

export default function MissionPatch({ className }: MissionPatchProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Click pattern: Click 10 times to activate
  const handleClick = useClickPattern(
    Array(10).fill('mission-patch') as string[],
    () => {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 6000);
    }
  );

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick('mission-patch')}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-primary bg-background flex items-center justify-center relative overflow-hidden"
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? -10 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Inner Circle */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-accent bg-muted/20 flex items-center justify-center">
          {/* Mission Symbol - Simple geometric design */}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
              CC
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-secondary">
              FIELD TESTED
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-primary"
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-primary"
          animate={{
            rotate: isHovered ? -360 : 0,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glow Effect on Hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Label */}
      <motion.div
        className="mt-4 text-center"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        <p className="text-xs font-mono uppercase tracking-wider text-secondary">
          MISSION PATCH
        </p>
      </motion.div>

      {/* Easter Egg Message */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-primary text-background p-3 border-2 border-primary font-mono text-xs">
              <p className="font-bold uppercase mb-1">CLASSIFIED ACCESS</p>
              <p>You clicked the mission patch 10 times! Persistence rewarded.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

