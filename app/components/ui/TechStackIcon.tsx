import React from 'react';
import { cn } from '@/lib/utils';

export type TechStackType = 
  | 'react' 
  | 'nextjs' 
  | 'typescript' 
  | 'python' 
  | 'unity' 
  | 'nodejs' 
  | 'tailwind' 
  | 'git'
  | 'premiere'
  | 'aftereffects'
  | 'unreal'
  | 'ai'
  | 'xr'
  | 'video'
  | 'interactive';

export interface TechStackIconProps {
  tech: TechStackType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const techConfig: Record<TechStackType, { label: string; symbol: string }> = {
  react: { label: 'React', symbol: '⚛' },
  nextjs: { label: 'Next.js', symbol: '▲' },
  typescript: { label: 'TypeScript', symbol: 'TS' },
  python: { label: 'Python', symbol: 'Py' },
  unity: { label: 'Unity', symbol: 'U' },
  nodejs: { label: 'Node.js', symbol: 'JS' },
  tailwind: { label: 'Tailwind', symbol: 'TW' },
  git: { label: 'Git', symbol: 'Git' },
  premiere: { label: 'Premiere Pro', symbol: 'PR' },
  aftereffects: { label: 'After Effects', symbol: 'AE' },
  unreal: { label: 'Unreal Engine', symbol: 'UE' },
  ai: { label: 'AI', symbol: 'AI' },
  xr: { label: 'XR/VR/AR', symbol: 'XR' },
  video: { label: 'Video', symbol: 'VID' },
  interactive: { label: 'Interactive', symbol: 'INT' },
};

export default function TechStackIcon({
  tech,
  className,
  size = 'md',
  showLabel = false,
}: TechStackIconProps) {
  const config = techConfig[tech];
  const isThreeLetters = config.symbol.length === 3;
  
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: isThreeLetters ? 'text-[10px]' : 'text-xs',
    md: isThreeLetters ? 'text-xs' : 'text-sm',
    lg: isThreeLetters ? 'text-sm' : 'text-base',
  };

  return (
    <div className={cn('inline-flex flex-col items-center gap-1', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded border-2 border-current bg-muted/20 font-mono font-bold uppercase',
          sizeStyles[size],
          textSizes[size]
        )}
        title={config.label}
        aria-label={config.label}
      >
        {config.symbol}
      </div>
      {showLabel && (
        <span className="text-xs font-mono uppercase tracking-wider text-secondary">
          {config.label}
        </span>
      )}
    </div>
  );
}

