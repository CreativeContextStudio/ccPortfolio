'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  disableMicroInteraction?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    children,
    className,
    disableMicroInteraction = false,
    ...props
  },
  ref
) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || disableMicroInteraction || props.disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.1;
    const distanceY = (e.clientY - centerY) * 0.1;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || disableMicroInteraction) return;
    x.set(0);
    y.set(0);
  };

  const [isNeobrutalism, setIsNeobrutalism] = useState(false);

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

  const baseStyles = isNeobrutalism 
    ? 'font-mono uppercase tracking-wider font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
    : 'font-mono uppercase tracking-wider font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-primary text-background hover:bg-primary/90 border-2 border-primary shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.1)]',
    secondary: 'bg-accent text-background hover:bg-accent/90 border-2 border-accent shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.1)]',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-background shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.1)]',
    ghost: 'bg-transparent text-text border-2 border-transparent hover:border-current hover:bg-muted/20 shadow-none',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const buttonContent = (
    <button
      ref={ref}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );

  if (prefersReducedMotion || disableMicroInteraction) {
    return buttonContent;
  }

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {buttonContent}
    </motion.div>
  );
});

export default Button;

