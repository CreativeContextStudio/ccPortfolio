"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[51] h-[3px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--ltx-pink), var(--ltx-violet), var(--ltx-sky))",
      }}
    >
      <svg
        viewBox="0 0 100 3"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full translate-y-[2px]"
        style={{ height: "3px" }}
      >
        <path
          d="M0,0 Q10,2 20,1 T40,1.5 T60,0.5 T80,2 T100,1"
          fill="none"
          stroke="var(--ltx-violet)"
          strokeWidth="0.8"
          opacity="0.3"
        />
      </svg>
    </motion.div>
  );
}
