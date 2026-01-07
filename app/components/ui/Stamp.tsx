'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface StampProps {
  text: string;
  className?: string;
  variant?: 'default' | 'rotated' | 'badge';
  color?: 'primary' | 'accent' | 'success' | 'warning';
}

export default function Stamp({
  text,
  className,
  variant = 'rotated',
  color = 'primary',
}: StampProps) {
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

  const colorStyles = {
    primary: 'bg-primary text-background border-primary',
    accent: 'bg-accent text-background border-accent',
    success: 'bg-success text-background border-success',
    warning: 'bg-warning text-background border-warning',
  };

  const variantStyles = {
    default: isNeobrutalism ? 'px-3 py-1 rounded border-[2px]' : 'px-3 py-1 rounded border-2',
    rotated: isNeobrutalism ? 'px-4 py-2 rounded border-[2px] transform -rotate-12' : 'px-4 py-2 rounded border-2 transform -rotate-12',
    badge: isNeobrutalism ? 'px-3 py-1 rounded-full border-[2px]' : 'px-3 py-1 rounded-full border-2',
  };

  return (
    <span
      className={cn(
        'inline-block font-mono text-xs uppercase tracking-wider font-bold',
        colorStyles[color],
        variantStyles[variant],
        className
      )}
    >
      {text}
    </span>
  );
}

