'use client';

import { Panel } from './ui';
import { Skill } from '../data/about';

interface SkillsMatrixProps {
  skills: Skill[];
  className?: string;
}

export default function SkillsMatrix({ skills, className }: SkillsMatrixProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Sort categories: Production and Video/Post first, then others
  const categoryOrder = ['Production', 'Video/Post', 'Frontend', 'Backend', 'Game Dev', 'AI/ML', 'DevOps', 'Design'];
  const categories = Object.keys(skillsByCategory).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
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
      <Panel variant="bordered" headerVariant="primary" title="CAPABILITIES MATRIX">
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-primary font-bold border-b border-current/20 pb-2">
                {category.toUpperCase()}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsByCategory[category].map((skill) => (
                  <div
                    key={skill.name}
                    className="border border-current/20 p-3 bg-muted/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono font-semibold text-text">
                        {skill.name}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full border border-current ${
                              level <= skill.level
                                ? 'bg-primary border-primary'
                                : 'bg-transparent'
                            }`}
                            aria-label={
                              level <= skill.level
                                ? `Proficiency level ${level}`
                                : `Not at level ${level}`
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-secondary font-mono leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

