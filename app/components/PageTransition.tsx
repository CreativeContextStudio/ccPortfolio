'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={prefersReducedMotion ? {} : { opacity: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: 'easeInOut',
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

