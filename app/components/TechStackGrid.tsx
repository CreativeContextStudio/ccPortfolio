'use client';

import { Panel } from './ui';
import { TechStackCategory } from '../data/about';

interface TechStackGridProps {
  categories: TechStackCategory[];
  className?: string;
}

export default function TechStackGrid({
  categories,
  className,
}: TechStackGridProps) {
  // Sort categories: Production and Video/Post first, then others
  const categoryOrder = [
    'Video Production',
    'Post-Production',
    'Virtual Production',
    'Production Management',
    'Frontend',
    'Backend',
    'Game Development',
    'AI/ML',
    'DevOps',
    'Design',
  ];
  
  const sortedCategories = [...categories].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.category);
    const indexB = categoryOrder.indexOf(b.category);
    // If both are in the order list, sort by their position
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only A is in the list, it comes first
    if (indexA !== -1) return -1;
    // If only B is in the list, it comes first
    if (indexB !== -1) return 1;
    // If neither is in the list, maintain original order
    return 0;
  });

  return (
    <div className={className}>
      <Panel variant="bordered" headerVariant="accent" title="TECHNOLOGY STACK BREAKDOWN">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCategories.map((category) => (
            <div
              key={category.category}
              className="border border-current/20 p-4 bg-muted/10"
            >
              <h4 className="text-sm font-mono uppercase tracking-wider text-primary font-bold mb-2">
                {category.category}
              </h4>
              <p className="text-xs text-secondary font-mono mb-3 leading-relaxed">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono uppercase tracking-wider bg-background border border-current/20 text-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

