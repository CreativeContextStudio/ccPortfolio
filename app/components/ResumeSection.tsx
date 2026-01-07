'use client';

import { Panel } from './ui';
import { ResumeItem } from '../data/resume';

interface ResumeSectionProps {
  title: string;
  items: ResumeItem[];
  className?: string;
}

export default function ResumeSection({
  title,
  items,
  className,
}: ResumeSectionProps) {
  return (
    <Panel variant="bordered" headerVariant="accent" title={title} className={className}>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="border-l-2 border-primary pl-4 pb-4 last:pb-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div className="flex-1">
                <h4 className="text-lg font-bold uppercase tracking-wider text-text mb-1">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-base font-mono text-secondary mb-1">
                    {item.subtitle}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:items-end gap-1">
                <span className="text-sm font-mono uppercase tracking-wider text-secondary">
                  {item.period}
                </span>
                {item.location && (
                  <span className="text-sm font-mono text-secondary">
                    {item.location}
                  </span>
                )}
              </div>
            </div>
            <p className="text-base text-text font-mono leading-relaxed mb-2">
              {item.description}
            </p>
            {item.achievements && item.achievements.length > 0 && (
              <ul className="space-y-1 mt-3">
                {item.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-secondary font-mono flex items-start gap-2"
                  >
                    <span className="text-primary mt-1">●</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

