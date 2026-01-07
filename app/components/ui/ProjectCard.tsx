'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Panel from './Panel';
import StatusBadge, { type StatusType } from './StatusBadge';
import TechStackIcon, { type TechStackType } from './TechStackIcon';
import Button from './Button';

export interface ProjectCardProps {
  projectId: string;
  title: string;
  description: string;
  dateRange: string;
  status: StatusType;
  techStack: readonly TechStackType[] | TechStackType[];
  link?: string;
  className?: string;
}

export default function ProjectCard({
  projectId,
  title,
  description,
  dateRange,
  status,
  techStack,
  link,
  className,
}: ProjectCardProps) {
  return (
    <Panel
      variant="bordered"
      headerVariant="accent"
      title={
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs">{projectId}</span>
          <StatusBadge status={status} variant="stamp" />
        </div>
      }
      className={cn('h-full flex flex-col', className)}
    >
      <div className="flex-1 space-y-4">
        {/* Project Header */}
        <div>
          <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-text">
            {title}
          </h3>
          <p className="text-sm text-secondary font-mono mb-2">
            DATE RANGE: {dateRange}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-text leading-relaxed">{description}</p>

        {/* Tech Stack */}
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-wider text-secondary">
            TECH STACK:
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <TechStackIcon key={tech} tech={tech} size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      {link && (
        <div className="mt-6 pt-4 border-t border-current/20">
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => window.open(link, '_blank')}
          >
            VIEW DETAILS
          </Button>
        </div>
      )}
    </Panel>
  );
}

