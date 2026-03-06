"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef, useState, useCallback } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 300, damping: 30 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const thumbYRaw = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const thumbY = useTransform(thumbYRaw, (v) => `${v}px`);

  const [smudge, setSmudge] = useState(false);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() { x.set(0.5); y.set(0.5); }

  const handleSmudge = useCallback(() => {
    if (smudge) return;
    setSmudge(true);
    setTimeout(() => setSmudge(false), 200);
  }, [smudge]);

  return (
    <div style={{ perspective: "1000px" }} className={`${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", "--thumb-y": thumbY, "--smudge-blur": smudge ? "1px" : "0px", "--smudge-x": smudge ? "2px" : "0px" } as React.CSSProperties & Record<string, unknown>}
        className="tilt-card-inner h-full"
        onMouseEnter={handleSmudge}
      >
        {children}
      </motion.div>
    </div>
  );
}
