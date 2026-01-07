'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'operational' | 'deployed' | 'active' | 'experimental' | 'archived' | 'r-d';

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  variant?: 'default' | 'stamp' | 'badge';
}

const statusConfig: Record<StatusType, { label: string; color: string }> = {
  operational: { label: 'OPERATIONAL', color: 'bg-success text-background' },
  deployed: { label: 'DEPLOYED', color: 'bg-success text-background' },
  active: { label: 'ACTIVE R&D', color: 'bg-warning text-background' },
  experimental: { label: 'EXPERIMENTAL', color: 'bg-warning text-background' },
  archived: { label: 'ARCHIVED', color: 'bg-secondary text-background' },
  'r-d': { label: 'R&D PHASE', color: 'bg-primary text-background' },
};

export default function StatusBadge({
  status,
  className,
  variant = 'default',
}: StatusBadgeProps) {
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

  const config = statusConfig[status];
  
  const variantStyles = {
    default: isNeobrutalism ? 'px-3 py-1 rounded border-[2px] border-current' : 'px-3 py-1 rounded',
    stamp: isNeobrutalism ? 'px-3 py-1 rounded border-[2px] border-current' : 'px-3 py-1 rounded border-2 border-current',
    badge: isNeobrutalism ? 'px-2 py-1 rounded-full text-xs border-[2px] border-current' : 'px-2 py-1 rounded-full text-xs',
  };

  return (
    <span
      className={cn(
        'inline-block font-mono text-xs uppercase tracking-wider',
        isNeobrutalism ? 'font-bold' : 'font-semibold',
        config.color,
        variantStyles[variant],
        className
      )}
    >
      {config.label}
    </span>
  );
}

