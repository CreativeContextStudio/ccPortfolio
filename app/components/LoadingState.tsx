'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  variant?: 'default' | 'compact' | 'fullscreen';
  className?: string;
}

export default function LoadingState({
  message = 'LOADING...',
  subMessage = 'Loading content...',
  variant = 'default',
  className,
}: LoadingStateProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerClasses = {
    default: 'py-12',
    compact: 'py-6',
    fullscreen: 'fixed inset-0 z-50 bg-background flex items-center justify-center',
  };

  return (
    <div className={`${containerClasses[variant]} ${className || ''}`}>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Loading Text */}
        <motion.div
          className="font-mono text-sm uppercase tracking-wider text-secondary"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
          }}
        >
          {message}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs h-1 bg-muted/30 border border-current/10 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={prefersReducedMotion ? { width: '100%' } : { width: 0 }}
            animate={prefersReducedMotion ? { width: '100%' } : { width: '100%' }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                  }
            }
          />
        </div>

        {/* Sub Message */}
        {subMessage && (
          <motion.div
            className="font-mono text-xs uppercase tracking-wider text-muted"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.2,
              duration: prefersReducedMotion ? 0 : 0.3,
            }}
          >
            {subMessage}
          </motion.div>
        )}

        {/* Animated Dots */}
        {!prefersReducedMotion && (
          <div className="flex gap-2 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

