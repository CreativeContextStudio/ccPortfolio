"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CLIENTS } from "@/app/data/projects";

function stableHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h;
}

function clientWander(name: string) {
  const h = stableHash(name);
  const y = ((h % 30) - 15) / 10;
  const r = ((h % 14) - 7) / 10;
  return { transform: `translateY(${y}px) rotate(${r}deg)` };
}

export function Footer() {
  return (
    <footer className="py-20 px-6 bg-background">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto max-w-6xl"
      >
        <UnravelHeading />
        <motion.div variants={fadeInUp} className="text-center">
          <p className="mt-4 text-ltx-muted max-w-md mx-auto">
            Creative producing, storytelling, AI workflows, or production at scale — let&apos;s talk about your next project.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8 flex items-center justify-center gap-4 text-sm text-ltx-muted">
          <span>Remote</span>
          <span className="text-ltx-rule">&bull;</span>
          <span>Atlanta</span>
          <span className="text-ltx-rule">&bull;</span>
          <span>Brooklyn</span>
        </motion.div>

        {/* Client Marquee */}
        <ClientMarquee />

        <Separator className="my-12 bg-ltx-rule" />

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ltx-muted">
          <p>Built with code, craft, and curiosity</p>
          <p className="flex items-center gap-3">
            <span className="opacity-40 hover:opacity-100 transition-opacity cursor-default" title="Try the Konami code or press backtick">secrets hidden</span>
            <span>Creative Context Studio &copy; {new Date().getFullYear()}</span>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

function ClientMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <motion.div variants={fadeInUp} className="mt-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <p className="text-xs font-medium tracking-widest uppercase text-ltx-muted">
          Notable Clients & Networks
        </p>
        <button
          onClick={() => setPaused((p) => !p)}
          className="text-ltx-muted hover:text-ltx-black transition-colors p-1 rounded"
          aria-label={paused ? "Play marquee" : "Pause marquee"}
        >
          {paused ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1l9 5-9 5V1z" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="1" y="1" width="3.5" height="10" rx="0.5" /><rect x="7.5" y="1" width="3.5" height="10" rx="0.5" /></svg>
          )}
        </button>
      </div>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="marquee-track" style={paused ? { animationPlayState: "paused" } : undefined}>
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <span key={`${client}-${i}`} className="inline-flex items-center text-sm font-medium text-ltx-muted whitespace-nowrap px-8 py-2 hover:text-ltx-black transition-colors duration-200" style={clientWander(client)}>
              {client}
              <span className="ml-8 text-ltx-rule">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const UNRAVEL_TEXT = "Let's make something.";

function UnravelHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="text-center">
      <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ltx-black inline-block">
        {UNRAVEL_TEXT.split("").map((char, i) => {
          const h = stableHash(UNRAVEL_TEXT + i);
          const initRotate = ((h % 40) - 20) / 10;
          const initY = ((h % 20) - 10) / 10;
          return (
            <motion.span
              key={i}
              className="inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
              initial={{ rotate: initRotate, y: initY }}
              animate={isInView ? { rotate: 0, y: 0 } : { rotate: initRotate, y: initY }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {char === " " ? " " : char}
            </motion.span>
          );
        })}
      </h2>
    </div>
  );
}
