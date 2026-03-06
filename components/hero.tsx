"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { staggerContainer } from "@/lib/animations";
import { HeroAnimationContainer } from "./hero-animations";

const ROLES = [
  "Producer",
  "Storyteller",
  "Technologist",
  "Strategist",
  "Builder",
  "Agents",
  "Innovator",
  "Collaborator",
  "Architect",
] as const;

const ROLE_CYCLE_MS = 3000;

const COMMANDS = [
  "Fortune 500 brand campaigns",
  "Narrative film & documentary",
  "AI-native workflows & agentic systems",
  "Production across 6 continents",
  "Live event direction & broadcast",
  "Creative strategy & pitch decks",
  "Post-production & VFX supervision",
  "Experiential & immersive installs",
  "Brand identity & visual systems",
  "Cross-platform content pipelines",
  "Talent & crew management at scale",
  "Emerging tech R&D & prototyping",
];

function useTypingCycle(strings: string[], typingSpeed = 60, deletingSpeed = 30, pauseAfterType = 2200, pauseAfterDelete = 400) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const current = strings[index];

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseAfterType);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, deletingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % strings.length);
        }, pauseAfterDelete);
      }
    }

    return clear;
  }, [displayed, index, isDeleting, strings, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete, clear]);

  return { displayed, index, isDeleting };
}

export function Hero() {
  const { displayed: typed, index: commandIndex } = useTypingCycle(COMMANDS);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, ROLE_CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 min-h-[80dvh] sm:min-h-[70vh]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="orb orb-pink" style={{ top: "10%", left: "15%" }} />
        <div className="orb orb-lavender" style={{ top: "40%", right: "10%" }} />
        <div className="orb orb-sky" style={{ bottom: "15%", left: "40%" }} />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl w-full mx-auto"
      >
        {/* Left: Title + Typing command */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="hero-title-wrap">
            <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95]">
              <motion.span
                className="gradient-text block"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Creative
              </motion.span>
              <motion.span
                className="text-ltx-black block relative"
                style={{ height: "1.35em", clipPath: "inset(0 -100vw 0 -100vw)" }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={ROLES[roleIndex]}
                    className="absolute left-0 lg:left-0 inset-x-0 lg:inset-x-auto block whitespace-nowrap"
                    initial={{ y: "-120%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "120%" }}
                    transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  >
                    {ROLES[roleIndex]}.
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </h1>
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              Creative {ROLES[roleIndex]}.
            </span>
          </div>

          <motion.div
            className="mt-6 flex items-baseline font-[family-name:var(--font-mono)] text-xs sm:text-base min-w-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            aria-live="polite"
            aria-atomic="true"
          >
            <span
              className="select-none mr-0.5 font-semibold"
              style={{ color: "var(--ltx-pink)" }}
              aria-hidden="true"
            >
              /
            </span>
            <span className="text-ltx-body">{typed}</span>
            <span
              className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle"
              style={{ backgroundColor: "var(--ltx-pink)", animation: "cursorBlink 1s steps(2) infinite" }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Right: Animation container */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="rounded-2xl border border-ltx-rule overflow-hidden aspect-[4/3]"
            aria-hidden="true"
          >
            <HeroAnimationContainer index={commandIndex} />
          </div>
        </motion.div>
      </motion.div>

      <a
        href="#creative-producing"
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 scroll-indicator text-ltx-muted hover:text-ltx-black transition-colors"
        aria-label="Scroll to work"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l5 5 5-5" />
        </svg>
      </a>
    </section>
  );
}
