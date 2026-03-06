"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { aboutData } from "@/app/data/about";
import { resumeData } from "@/app/data/resume";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShootingStarDrifter } from "@/components/ambient-drifters";
import { SectionHeading } from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "skills", label: "Skills & Stack" },
  { key: "timeline", label: "Timeline" },
  { key: "resume", label: "Resume" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero / Summary */}
        <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 bg-background">
          <ShootingStarDrifter />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-6xl"
          >
            <motion.div variants={fadeInUp}>
              <SectionHeading
                title="About"
                subtitle={aboutData.missionStatement}
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-3xl">
              <p className="text-base text-ltx-muted leading-relaxed">
                {aboutData.backgroundBriefing}
              </p>
            </motion.div>

            {/* Specializations */}
            <motion.div variants={fadeInUp} className="mt-12">
              <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">
                Specializations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {aboutData.specialization.map((spec) => (
                  <div
                    key={spec}
                    className="rounded-xl border border-ltx-rule bg-ltx-alt p-5 hover:border-ltx-pink transition-colors"
                  >
                    <p className="text-sm font-semibold text-ltx-black">{spec}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Tabbed Content */}
        <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 bg-ltx-alt">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mx-auto max-w-6xl"
          >
            {/* Tab Nav */}
            <motion.div variants={fadeInUp} className="mb-10">
              <div className="flex gap-1 border-b border-ltx-rule overflow-x-auto scrollbar-hidden">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap ${
                      activeTab === tab.key
                        ? "text-ltx-studio"
                        : "text-ltx-muted hover:text-ltx-black"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="about-page-tab-indicator"
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
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "skills" && <SkillsTab />}
              {activeTab === "timeline" && <TimelineTab />}
              {activeTab === "resume" && <ResumeTab />}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Clients & Highlights */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-background">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mx-auto max-w-6xl"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="font-[family-name:var(--font-mono)] text-3xl md:text-4xl font-bold tracking-tight text-ltx-black mb-8">
                Clients & Highlights
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <ClientHighlight
                label="Brand & Performance Video"
                value="IBM, Adidas, JP Morgan Chase, Complex, Champs, Facebook, and 50+ additional Fortune 500 and mid-market brands"
              />
              <ClientHighlight
                label="Broadcast & Network Production"
                value={`Travel Channel ("Ripley's Believe It or Not!"), Discovery ID ("Shadow of Doubt"), The CW ("Would I Lie To You?"), A&E Networks, MTV, National Geographic, SyFy, Animal Planet, Food Network, Disney, Warner Bros., Sony Pictures, NBC Universal`}
              />
              <ClientHighlight
                label="Narrative & Independent Film"
                value={`"netuser" (award-winning feature film, Best Film LGBT Los Angeles Film Festival)`}
              />
              <ClientHighlight
                label="Operational Scale & Achievement"
                value="Delivered 60+ international video segments across 25+ cities spanning 6 continents. Managed productions ranging from 15-second social ads to 60-minute broadcast episodes. Created video content viewed by millions across all major digital platforms."
              />
            </motion.div>

            <Separator className="my-12 bg-ltx-rule" />

            {/* Resume Download */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start gap-4">
              {resumeData.pdfUrl && (
                <a
                  href={resumeData.pdfUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-ltx-rule bg-background px-6 py-3 text-sm font-semibold text-ltx-black hover:border-ltx-pink hover:text-ltx-pink transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2v9M4 7l4 4 4-4M2 13h12" />
                  </svg>
                  Download Resume
                </a>
              )}
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-ltx-studio px-6 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
              >
                Get in Touch
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M1 13L13 1M13 1H4M13 1V10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ============================================
   Tab: Overview
   ============================================ */
function OverviewTab() {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-10"
    >
      {/* Professional Summary */}
      <div className="rounded-2xl border border-ltx-rule bg-background p-6 md:p-8">
        <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-pink mb-4">
          Summary
        </h3>
        <p className="text-sm leading-relaxed text-ltx-body font-[family-name:var(--font-mono)]">
          Producer and creator building production systems that work at any scale, from boutique
          creative direction to distributed teams producing 100+ assets weekly. Combines two decades
          of traditional, brand, and broadcast experience (network television, Fortune 500 campaigns,
          film) with hands-on expertise in physical production with teams and crews all over the
          globe. Expertise concepting narrative content, optimizing video, directing talent, solving
          technical problems, and building automated operations and content systems. Equally
          comfortable with generative AI tools, context engineering, and agentic workflows. Works
          remotely from anywhere on projects everywhere.
        </p>
      </div>

      {/* Core Competencies */}
      {resumeData.competencies && resumeData.competencies.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.competencies.map((comp) => (
              <div
                key={comp.title}
                className="rounded-xl border border-ltx-rule bg-background p-5"
              >
                <h4 className="text-sm font-semibold text-ltx-black mb-1">
                  {comp.title}
                </h4>
                {comp.subtitle && (
                  <p className="text-xs text-ltx-pink font-medium mb-2">{comp.subtitle}</p>
                )}
                <p className="text-xs text-ltx-muted leading-relaxed">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specialized Qualifications */}
      <div>
        <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">
          Specialized Qualifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {resumeData.certifications.map((cert) => (
            <div
              key={cert.title}
              className="rounded-xl border border-ltx-rule bg-background p-5"
            >
              <p className="text-xs font-mono font-medium text-ltx-pink mb-1">
                {cert.period}
              </p>
              <h4 className="text-sm font-semibold text-ltx-black mb-2">
                {cert.title}
              </h4>
              <p className="text-xs text-ltx-muted leading-relaxed">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Download */}
      {resumeData.pdfUrl && (
        <div>
          <a
            href={resumeData.pdfUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-ltx-rule bg-background px-6 py-3 text-sm font-semibold text-ltx-black hover:border-ltx-pink hover:text-ltx-pink transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v9M4 7l4 4 4-4M2 13h12" />
            </svg>
            Download Resume
          </a>
        </div>
      )}
    </motion.div>
  );
}

/* ============================================
   Tab: Skills & Stack
   ============================================ */
function SkillsTab() {
  // Group skills by category
  const categoryOrder = ['Production', 'Video/Post', 'Frontend', 'Backend', 'Game Dev', 'AI/ML', 'DevOps'];
  const skillsByCategory = aboutData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof aboutData.skills>);
  const sortedCategories = Object.keys(skillsByCategory).sort((a, b) => {
    const iA = categoryOrder.indexOf(a);
    const iB = categoryOrder.indexOf(b);
    if (iA !== -1 && iB !== -1) return iA - iB;
    if (iA !== -1) return -1;
    if (iB !== -1) return 1;
    return 0;
  });

  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-10"
    >
      {/* Skills Matrix grouped by category */}
      <div>
        <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">
          Capabilities Matrix
        </h3>
        <div className="space-y-8">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-pink mb-4 border-b border-ltx-rule pb-2">
                {category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsByCategory[category].map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-lg border border-ltx-rule bg-background p-4"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-ltx-black font-medium">
                        {skill.name}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < skill.level ? "bg-ltx-pink" : "bg-ltx-rule"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {skill.description && (
                      <p className="text-xs text-ltx-muted leading-relaxed">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div>
        <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">
          Tech Stack
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aboutData.techStackCategories.map((cat) => (
            <div
              key={cat.category}
              className="rounded-xl border border-ltx-rule bg-background p-5"
            >
              <h4 className="text-sm font-semibold text-ltx-pink mb-1">
                {cat.category}
              </h4>
              {cat.description && (
                <p className="text-xs text-ltx-muted mb-3">{cat.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {cat.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-ltx-alt rounded-full px-3 py-1 text-ltx-body"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================
   Tab: Timeline
   ============================================ */
function TimelineTab() {
  return (
    <motion.div
      key="timeline"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">
        Timeline
      </h3>
      <div className="space-y-4 max-w-2xl">
        {aboutData.timeline.map((event) => {
          const typeColors: Record<string, string> = {
            work: "bg-ltx-studio",
            project: "bg-ltx-pink",
            achievement: "bg-ltx-green",
            education: "bg-ltx-violet",
          };
          return (
            <div
              key={`${event.date}-${event.title}`}
              className="flex gap-4 items-start"
            >
              <div className="w-20 shrink-0 text-xs font-mono font-medium text-ltx-pink pt-0.5">
                {event.date}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${typeColors[event.type] ?? "bg-ltx-muted"}`}
                  />
                  <p className="text-sm font-semibold text-ltx-black">{event.title}</p>
                </div>
                <p className="text-xs text-ltx-muted mt-0.5 ml-4">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================
   Tab: Resume
   ============================================ */
function ResumeTab() {
  return (
    <motion.div
      key="resume"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-12"
    >
      {/* Agent Info */}
      {resumeData.agentInfo && (
        <div className="rounded-2xl border border-ltx-rule bg-background p-6 md:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ltx-black">
            {resumeData.agentInfo.name}
          </h3>
          <p className="text-xs font-mono font-medium tracking-widest text-ltx-pink mt-1">
            {resumeData.agentInfo.operationalStatus}
          </p>
        </div>
      )}

      {/* Work History */}
      <div>
        <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">
          Work History
        </h3>
        <div className="space-y-4">
          {resumeData.workHistory.map((item) => (
            <ResumeCard key={`${item.title}-${item.period}`} item={item} />
          ))}
        </div>
      </div>

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-6">
            Education & Training
          </h3>
          <div className="space-y-4">
            {resumeData.education.map((item) => (
              <ResumeCard key={`${item.title}-${item.period}`} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Download CTA */}
      {resumeData.pdfUrl && (
        <div className="pt-4">
          <a
            href={resumeData.pdfUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-ltx-rule bg-background px-6 py-3 text-sm font-semibold text-ltx-black hover:border-ltx-pink hover:text-ltx-pink transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v9M4 7l4 4 4-4M2 13h12" />
            </svg>
            Download Full Resume (PDF)
          </a>
        </div>
      )}
    </motion.div>
  );
}

/* ============================================
   Shared Components
   ============================================ */
function ResumeCard({ item }: { item: typeof resumeData.workHistory[number] }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = item.achievements && item.achievements.length > 0;

  return (
    <div className="rounded-xl border border-ltx-rule bg-background overflow-hidden">
      <button
        onClick={() => hasDetails && setExpanded((prev) => !prev)}
        className={`w-full text-left p-5 ${hasDetails ? "cursor-pointer hover:bg-ltx-alt/50 transition-colors" : "cursor-default"}`}
        aria-expanded={hasDetails ? expanded : undefined}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-ltx-black">{item.title}</h4>
            {item.subtitle && (
              <p className="text-xs font-medium text-ltx-pink mt-0.5">{item.subtitle}</p>
            )}
            <p className="text-xs text-ltx-muted mt-1 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
          <div className="sm:shrink-0 sm:text-right">
            <p className="text-xs font-mono font-medium text-ltx-muted">{item.period}</p>
            {item.location && (
              <p className="text-[10px] text-ltx-muted mt-0.5">{item.location}</p>
            )}
          </div>
        </div>
        {hasDetails && (
          <div className="mt-2 flex items-center gap-1 text-xs text-ltx-studio">
            <span>{expanded ? "Hide" : "Show"} details</span>
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M3 4.5l3 3 3-3" />
            </motion.svg>
          </div>
        )}
      </button>
      <AnimatePresence>
        {expanded && item.achievements && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-ltx-rule pt-4">
              <ul className="space-y-2">
                {item.achievements.map((achievement, i) => (
                  <li key={i} className="flex gap-2 text-xs text-ltx-body leading-relaxed">
                    <span className="text-ltx-pink mt-1 shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClientHighlight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ltx-rule bg-ltx-alt/50 p-5">
      <p className="text-xs font-semibold tracking-widest uppercase text-ltx-pink mb-2">
        {label}
      </p>
      <p className="text-sm text-ltx-body leading-relaxed">{value}</p>
    </div>
  );
}
