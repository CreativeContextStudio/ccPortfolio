'use client';

import { useState } from 'react';
import { Panel, Button } from './ui';
import { StatusType } from './ui/StatusBadge';
import { TechStackType } from './ui/TechStackIcon';

export type TagType = 'video' | 'games' | 'xr' | 'ai' | 'interactive' | 'film' | 'brand' | 'broadcast' | 'documentary';
export type FilterType = 'all' | StatusType | TechStackType | TagType;
export type SortType = 'date' | 'status' | 'title';

interface ProjectFilterProps {
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  activeFilter: FilterType;
  activeSort: SortType;
  availableTechStacks: TechStackType[];
}

export default function ProjectFilter({
  onFilterChange,
  onSortChange,
  activeFilter,
  activeSort,
  availableTechStacks,
}: ProjectFilterProps) {
  const statusFilters: StatusType[] = ['deployed', 'active', 'experimental', 'archived', 'r-d'];
  const sortOptions: SortType[] = ['date', 'status', 'title'];
  const tagFilters: TagType[] = ['video', 'games', 'xr', 'ai', 'interactive', 'film', 'brand', 'broadcast', 'documentary'];

  return (
    <Panel variant="bordered" headerVariant="primary" title="FILTER / SORT CONTROL PANEL">
      <div className="space-y-6">
        {/* Filter Section */}
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-3">
            FILTER BY:
          </p>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onFilterChange('all')}
                className="min-h-[36px] text-xs sm:text-sm"
              >
                ALL
              </Button>
              {statusFilters.map((status) => (
                <Button
                  key={status}
                  variant={activeFilter === status ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => onFilterChange(status)}
                  className="min-h-[36px] text-xs sm:text-sm"
                >
                  {status.toUpperCase()}
                </Button>
              ))}
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-2">
                CATEGORIES:
              </p>
              <div className="flex flex-wrap gap-2">
                {tagFilters.map((tag) => (
                  <Button
                    key={tag}
                    variant={activeFilter === tag ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => onFilterChange(tag)}
                    className="min-h-[36px] text-xs sm:text-sm"
                  >
                    {tag.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-2">
                TECH STACK:
              </p>
              <div className="flex flex-wrap gap-2">
                {availableTechStacks.map((tech) => (
                  <Button
                    key={tech}
                    variant={activeFilter === tech ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => onFilterChange(tech)}
                    className="min-h-[36px] text-xs sm:text-sm"
                  >
                    {tech.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sort Section */}
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-3">
            SORT BY:
          </p>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((sort) => (
              <Button
                key={sort}
                variant={activeSort === sort ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onSortChange(sort)}
              >
                {sort.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

