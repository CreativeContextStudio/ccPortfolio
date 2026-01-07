'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface PanelProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  headerVariant?: 'default' | 'primary' | 'accent';
}

export default function Panel({
  title,
  children,
  className,
  variant = 'default',
  headerVariant = 'default',
}: PanelProps) {
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

  const baseStyles = 'bg-background text-text';
  
  const variantStyles = {
    default: 'border-2 border-current/20',
    bordered: 'border-2 border-current shadow-[3px_3px_0px_rgba(0,0,0,0.15)]',
    elevated: 'border-2 border-current/20 shadow-[4px_4px_0px_rgba(0,0,0,0.15)]',
  };

  const headerStyles = {
    default: 'bg-muted/30 border-b-2 border-current/20',
    primary: 'bg-primary text-background border-b-2 border-current',
    accent: 'bg-accent text-background border-b-2 border-current',
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)}>
      {title && (
        <div className={cn('px-4 py-4 font-mono text-sm uppercase tracking-wider font-bold', headerStyles[headerVariant])}>
          <h3 className="font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

