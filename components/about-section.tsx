"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { aboutData } from "@/app/data/about";
import { resumeData } from "@/app/data/resume";
import { ShootingStarDrifter } from "@/components/ambient-drifters";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "skills", label: "Skills & Stack" },
  { key: "timeline", label: "Timeline" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 bg-ltx-alt">
      <ShootingStarDrifter />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto max-w-6xl"
      >
        {/* Professional Summary */}
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="font-[family-name:var(--font-mono)] text-4xl md:text-5xl font-bold tracking-tight text-ltx-black mb-6">About</h2>
          <p className="text-lg text-ltx-body leading-relaxed max-w-3xl">{aboutData.missionStatement}</p>
          <p className="text-base text-ltx-muted leading-relaxed max-w-3xl mt-4">{aboutData.backgroundBriefing}</p>
        </motion.div>

        {/* Tab Nav */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex gap-1 border-b border-ltx-rule overflow-x-auto scrollbar-hidden">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? "text-ltx-studio"
                    : "text-ltx-muted hover:text-ltx-black"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="about-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-ltx-studio"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* Four Pillars */}
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">Specializations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {aboutData.specialization.map((spec) => (
                    <div key={spec} className="rounded-xl border border-ltx-rule bg-background p-5">
                      <p className="text-sm font-semibold text-ltx-black">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Download & Full About Link */}
              <div className="flex flex-wrap items-center gap-3">
                {resumeData.pdfUrl && (
                  <a
                    href={resumeData.pdfUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-ltx-rule bg-background px-6 py-3 text-sm font-semibold text-ltx-black hover:border-ltx-pink hover:text-ltx-pink transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 2v9M4 7l4 4 4-4M2 13h12" />
                    </svg>
                    Download Resume
                  </a>
                )}
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-ltx-studio px-6 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
                >
                  Full About & Resume
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6h7M6.5 3l3 3-3 3" /></svg>
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* Top Skills */}
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">Key Skills</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {aboutData.skills.slice(0, 12).map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3 rounded-lg border border-ltx-rule bg-background px-4 py-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < skill.level ? "bg-ltx-pink" : "bg-ltx-rule"}`} />
                        ))}
                      </div>
                      <span className="text-sm text-ltx-black font-medium truncate">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Grid */}
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">Tech Stack</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aboutData.techStackCategories.map((cat) => (
                    <div key={cat.category} className="rounded-xl border border-ltx-rule bg-background p-5">
                      <h4 className="text-sm font-semibold text-ltx-pink mb-3">{cat.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {cat.technologies.map((tech) => (
                          <span key={tech} className="text-xs bg-ltx-alt rounded-full px-3 py-1 text-ltx-body">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">Timeline</h3>
              <div className="space-y-4 max-w-2xl">
                {aboutData.timeline.map((event) => (
                  <div key={`${event.date}-${event.title}`} className="flex gap-4 items-start">
                    <div className="w-16 shrink-0 text-xs font-mono font-medium text-ltx-pink pt-0.5">{event.date}</div>
                    <div>
                      <p className="text-sm font-semibold text-ltx-black">{event.title}</p>
                      <p className="text-xs text-ltx-muted mt-0.5">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
