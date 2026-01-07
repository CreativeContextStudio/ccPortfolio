'use client';

import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  disableMicroInteraction?: boolean;
}

export default function Input({
  label,
  error,
  className,
  id,
  disableMicroInteraction = false,
  ...props
}: InputProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isNeobrutalism, setIsNeobrutalism] = useState(false);
  const generatedId = useId();
  const inputId = id || generatedId;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const checkTheme = () => {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsNeobrutalism(theme === 'hiya');
      };
      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    }
  }, []);

  const errorId = error ? `${inputId}-error` : undefined;

  const inputElement = (
    <input
      id={inputId}
      className={cn(
        'w-full px-4 py-2 bg-background font-mono text-base',
        'border-2 border-current/20 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]',
        'focus:outline-none focus:border-primary focus:shadow-[3px_3px_0px_rgba(0,0,0,0.15)] focus:-translate-x-[1px] focus:-translate-y-[1px]',
        'transition-all duration-200',
        error && 'border-warning',
        isFocused && !prefersReducedMotion && !disableMicroInteraction && !isNeobrutalism && 'shadow-sm',
        className
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
      {...props}
    />
  );

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-mono uppercase tracking-wider text-secondary"
        >
          {label}
          {props['aria-required'] === 'true' && (
            <span className="text-warning ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
      )}
      {prefersReducedMotion || disableMicroInteraction ? (
        inputElement
      ) : (
        <motion.div
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {inputElement}
        </motion.div>
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-mono text-warning uppercase"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

