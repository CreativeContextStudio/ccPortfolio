'use client';

import { Panel } from './ui';

interface ProfileHeaderProps {
  agentId: string;
  specialization: string[];
  location: string;
  className?: string;
}

export default function ProfileHeader({
  agentId,
  specialization,
  location,
  className,
}: ProfileHeaderProps) {
  return (
    <Panel
      variant="bordered"
      headerVariant="primary"
      title="PROFILE"
      className={className}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-current/10 pb-3">
            <span className="text-sm font-mono uppercase tracking-wider text-secondary min-w-[120px] leading-relaxed">
              ID:
            </span>
            <span className="text-base font-mono font-semibold text-text">
              {agentId}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-current/10 pb-3">
            <span className="text-sm font-mono uppercase tracking-wider text-secondary min-w-[120px] leading-relaxed">
              LOCATION:
            </span>
            <span className="text-base font-mono font-semibold text-text">
              {location}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-mono uppercase tracking-wider text-secondary block mb-2 leading-relaxed">
              SPECIALIZATION:
            </span>
            <div className="flex flex-wrap gap-2">
              {specialization.map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-mono uppercase tracking-wider bg-accent text-background border-2 border-accent"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

