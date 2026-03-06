"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useTextScramble } from "@/hooks/use-text-scramble";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  subtitleClassName?: string;
  dark?: boolean;
}

export function SectionHeading({ title, subtitle, className = "", subtitleClassName, dark = false }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { displayed, glitching } = useTextScramble(title, isInView);

  return (
    <div ref={ref} className={`mb-12 ${className}`}>
      <h2
        className={`font-[family-name:var(--font-mono)] text-4xl md:text-5xl font-bold tracking-tight ${dark ? "text-white" : "text-ltx-black"} ${glitching ? "heading-glitch" : ""} ${!glitching && isInView ? "heading-breathe" : ""}`}
      >
        {displayed}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base sm:text-lg ${subtitleClassName ?? (dark ? "text-white/60" : "text-ltx-muted")}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
