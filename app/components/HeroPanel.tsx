'use client';

import { motion } from 'framer-motion';
import { Panel } from './ui';
import TextDecoder from './TextDecoder';
import DualRotatingTitle from './DualRotatingTitle';
import RotatingLocation from './RotatingLocation';

interface HeroPanelProps {
  agentDesignation: string;
  specialty?: string; // Made optional since we'll use DualRotatingTitle
  status: string;
  location: string;
  useDualRotatingTitle?: boolean; // Allow toggling the dual rotating title feature
}

export default function HeroPanel({
  agentDesignation,
  specialty,
  status,
  location,
  useDualRotatingTitle = true,
}: HeroPanelProps) {
  const fields = [
    { 
      label: 'STUDIO', 
      value: agentDesignation,
      useRotating: false,
    },
    { 
      label: 'SPECIALTY', 
      value: specialty || 'Creative Producer',
      useRotating: useDualRotatingTitle,
    },
    { 
      label: 'LOCATION', 
      value: location,
      useRotating: true,
    },
  ];

  return (
    <div className="w-full">
      <Panel
        variant="bordered"
        headerVariant="primary"
        title="PROFILE"
        className="relative overflow-visible scale-100 sm:scale-105 md:scale-110 lg:scale-[1.2] origin-top-left max-w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-[83.33%]"
      >
      <div className="space-y-5 relative z-10">
        {fields.map((field, index) => (
          <div
            key={field.label}
            className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-current/10 pb-4 last:border-0"
          >
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-secondary min-w-[120px] sm:min-w-[168px] leading-relaxed">
              {field.label}:
            </span>
            {field.useRotating ? (
              field.label === 'SPECIALTY' ? (
                <DualRotatingTitle className="text-base sm:text-lg font-semibold" />
              ) : (
                <RotatingLocation className="text-base sm:text-lg font-semibold" />
              )
            ) : (
              <TextDecoder
                text={field.value}
                className="text-base sm:text-lg font-semibold text-text"
              />
            )}
          </div>
        ))}
      </div>
    </Panel>
    </div>
  );
}

