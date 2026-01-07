'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'underline' | 'highlight';
  disableMicroInteraction?: boolean;
}

export default function AnimatedLink({
  children,
  className,
  variant = 'default',
  disableMicroInteraction = false,
  ...props
}: AnimatedLinkProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  const baseStyles = 'font-mono text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';

  const variantStyles = {
    default: '',
    underline: 'relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full',
    highlight: 'px-2 py-1 bg-transparent hover:bg-primary/10 rounded transition-colors',
  };

  const linkContent = (
    <Link
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );

  if (prefersReducedMotion || disableMicroInteraction) {
    return linkContent;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {linkContent}
    </motion.div>
  );
}

