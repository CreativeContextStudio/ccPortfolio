'use client';

import React, { useEffect, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  const [isNeobrutalism, setIsNeobrutalism] = useState(false);
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = error ? `${textareaId}-error` : undefined;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const checkTheme = () => {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsNeobrutalism(theme === 'neobrutalism');
      };
      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
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
      <textarea
        id={textareaId}
        className={cn(
          'w-full px-4 py-2 bg-background font-mono text-base resize-y min-h-[100px]',
          'border-2 border-current/20 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]',
          'focus:outline-none focus:border-primary focus:shadow-[3px_3px_0px_rgba(0,0,0,0.15)] focus:-translate-x-[1px] focus:-translate-y-[1px]',
          'transition-all duration-200',
          error && 'border-warning',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
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

