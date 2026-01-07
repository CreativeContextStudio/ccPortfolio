'use client';

import { useMemo } from 'react';
import { Project } from '../data/projects';
import { FilterType, SortType, TagType } from '../components/ProjectFilter';
import { StatusType } from '../components/ui/StatusBadge';
import { TechStackType } from '../components/ui/TechStackIcon';

export function useProjectFilter(
  projects: Project[],
  filter: FilterType,
  sort: SortType
) {
  const filteredAndSorted = useMemo(() => {
    // Filter projects
    let filtered = projects;

    if (filter !== 'all') {
      // Check if filter is a status
      const statusTypes: StatusType[] = [
        'deployed',
        'active',
        'experimental',
        'archived',
        'r-d',
        'operational',
      ];
      const isStatusFilter = statusTypes.includes(filter as StatusType);

      if (isStatusFilter) {
        filtered = projects.filter((p) => p.status === filter);
      } else {
        // Check if filter is a tag
        const tagTypes: TagType[] = [
          'video',
          'games',
          'xr',
          'ai',
          'interactive',
          'film',
          'brand',
          'broadcast',
          'documentary',
        ];
        const isTagFilter = tagTypes.includes(filter as TagType);

        if (isTagFilter) {
          filtered = projects.filter(
            (p) => p.tags && p.tags.includes(filter as TagType)
          );
        } else {
          // Filter by tech stack
          filtered = projects.filter((p) =>
            p.techStack.includes(filter as TechStackType)
          );
        }
      }
    }

    // Sort projects
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'date':
          // Sort by date range (newest first)
          return b.dateRange.localeCompare(a.dateRange);
        case 'status':
          // Sort by status priority
          const statusOrder: StatusType[] = [
            'deployed',
            'active',
            'experimental',
            'r-d',
            'archived',
            'operational',
          ];
          return (
            statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
          );
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [projects, filter, sort]);

  return filteredAndSorted;
}

