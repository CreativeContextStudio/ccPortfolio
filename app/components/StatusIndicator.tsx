'use client';

import { motion } from 'framer-motion';
import { Panel, Stamp } from './ui';

interface StatusIndicatorProps {
  status: string;
  responseTime?: string;
  className?: string;
}

export default function StatusIndicator({
  status,
  responseTime,
  className,
}: StatusIndicatorProps) {
  return (
    <Panel variant="bordered" headerVariant="default" title="STATUS" className={className}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <motion.div
            className="w-3 h-3 rounded-full bg-success mt-1 flex-shrink-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-text font-semibold leading-tight">
            {status}
          </span>
        </div>
        {responseTime && (
          <div className="pt-2 border-t border-current/20">
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-secondary mb-1.5">
              RESPONSE TIME
            </p>
            <p className="text-sm sm:text-base font-mono text-text font-semibold">{responseTime}</p>
          </div>
        )}
        <div className="pt-2 border-t border-current/20">
          <Stamp text="AVAILABLE" variant="badge" color="success" />
        </div>
      </div>
    </Panel>
  );
}

