"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface WaveformDecorationProps {
  className?: string;
}

export function WaveformDecoration({ className = "" }: WaveformDecorationProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bars = Array.from({ length: 50 }, (_, i) => ({
    x: i * 4 + 2,
    height: 4 + Math.sin(i * 0.7) * 10 + Math.cos(i * 1.3) * 8,
    delay: i * 0.02,
    pulseDelay: [12, 18, 24, 35, 42].includes(i) ? 8 + (i % 3) * 2 : 0,
  }));

  return (
    <svg
      ref={ref}
      viewBox="0 0 210 30"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ opacity: 0.1, width: "210px", height: "30px" }}
    >
      {bars.map((bar, i) => (
        <motion.rect
          key={i}
          x={bar.x}
          y={15 - bar.height / 2}
          width={2.5}
          rx={1}
          fill="currentColor"
          initial={{ height: 0 }}
          animate={isInView ? { height: bar.height } : { height: 0 }}
          transition={{ duration: 0.6, delay: bar.delay, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}
