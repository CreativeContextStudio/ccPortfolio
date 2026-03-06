"use client";

import { motion } from "motion/react";

interface FrequencyBarsProps {
  className?: string;
}

export function FrequencyBars({ className = "" }: FrequencyBarsProps) {
  const groups = [
    { bars: [10, 6, 14, 8, 12], speeds: [0.4, 0.6, 0.3, 0.7, 0.5] },
    { bars: [8, 12, 6, 16, 10], speeds: [0.5, 0.3, 0.8, 0.4, 0.6] },
  ];

  return (
    <div className={`hidden lg:flex gap-12 pointer-events-none select-none ${className}`} aria-hidden="true">
      {groups.map((group, gi) => (
        <svg key={gi} viewBox="0 0 18 20" width="18" height="20" style={{ opacity: 0.15 }}>
          {group.bars.map((h, bi) => (
            <motion.rect
              key={bi}
              x={bi * 3.5}
              width={2}
              rx={1}
              fill="currentColor"
              animate={{ height: [h * 0.3, h, h * 0.5, h * 0.8, h * 0.3], y: [20 - h * 0.3, 20 - h, 20 - h * 0.5, 20 - h * 0.8, 20 - h * 0.3] }}
              transition={{ duration: group.speeds[bi] * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
