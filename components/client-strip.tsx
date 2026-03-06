"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CLIENTS } from "@/app/data/projects";

const STATS = [
  { value: "20+", label: "Years" },
  { value: "6", label: "Continents" },
  { value: "50+", label: "Productions" },
  { value: "14", label: "Networks & Brands" },
];

export function ClientStrip() {
  return (
    <div className="py-8 px-4 sm:px-6 bg-ltx-alt border-y border-ltx-rule">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-ltx-black">{stat.value}</p>
              <p className="text-xs text-ltx-muted uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {CLIENTS.map((client) => (
            <span key={client} className="text-xs font-medium text-ltx-muted/70 whitespace-nowrap">
              {client}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
