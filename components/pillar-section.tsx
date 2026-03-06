"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TiltCard } from "@/components/tilt-card";
import { SectionHeading } from "@/components/section-heading";
import { ProjectModal, cardKeyHandler } from "@/components/project-modal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Project } from "@/app/data/projects";
import Image from "next/image";

interface PillarSectionProps {
  id: string;
  title: string;
  subtitle: string;
  projects: Project[];
  bgAlt?: boolean;
  illustration?: React.ReactNode;
  accent?: string;
  children?: React.ReactNode;
}

export function PillarSection({ id, title, subtitle, projects, bgAlt = false, illustration, accent = "var(--ltx-pink)", children }: PillarSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? projects[activeIndex] : null;
  const closeModal = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const goNext = useCallback(() => setActiveIndex((i) => (i !== null && i < projects.length - 1 ? i + 1 : i)), [projects.length]);

  const cardGrid = (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
            {projects.map((project, idx) => (
              <motion.div key={project.key} variants={fadeInUp} className="h-full">
                <TiltCard className="h-full">
                  <Card
                    className="card-glow overflow-hidden border-ltx-rule group cursor-pointer h-full flex flex-col focus-visible:ring-2 focus-visible:ring-ltx-studio focus-visible:ring-offset-2 outline-none"
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveIndex(idx)}
                    onKeyDown={cardKeyHandler(() => setActiveIndex(idx))}
                  >
                    <div className="aspect-video w-full relative overflow-hidden bg-ltx-alt shrink-0">
                      <Image src={project.thumb} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" style={{ objectPosition: project.thumbPosition ?? "center" }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized={project.thumb.startsWith("http") || project.thumb.endsWith(".svg")} />
                    </div>
                    <CardContent className="p-5 flex flex-col flex-1">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ltx-black leading-snug">{project.title}</h3>
                      <p className="text-sm text-ltx-muted mt-2 leading-relaxed flex-1 line-clamp-3">{project.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: accent }}>
                          View details
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6h7M6.5 3l3 3-3 3" /></svg>
                        </span>
                        <Badge className="text-ltx-muted bg-ltx-alt text-[10px] font-medium border-0">{project.badge}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
    </motion.div>
  );

  return (
    <>
      <section id={id} className={`relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 ${bgAlt ? "bg-ltx-alt" : "bg-background"}`}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={title} subtitle={subtitle} />
          {illustration && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="mb-8 rounded-2xl border border-ltx-rule bg-ltx-alt overflow-hidden"
              aria-hidden="true"
            >
              <div className="w-full [&_.section-illustration]:!block">
                {illustration}
              </div>
            </motion.div>
          )}
          {cardGrid}
          {children}
        </div>
      </section>

      {/* Project modal */}
      <AnimatePresence>
        {active && activeIndex !== null && (
          <ProjectModal onClose={closeModal} ariaLabel={active.title}>
            {active.youtubeId ? (
              <div className="w-full aspect-video rounded-t-2xl overflow-hidden bg-black">
                <iframe src={`https://www.youtube.com/embed/${active.youtubeId}?rel=0&modestbranding=1&vq=hd1080`} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-t-2xl overflow-hidden relative" style={{ backgroundColor: active.heroBg ?? "var(--ltx-bg-alt)" }}>
                <Image src={active.thumb} alt={active.title} fill className="object-cover" style={{ objectPosition: active.thumbPosition ?? "center" }} sizes="(max-width: 768px) 100vw, 768px" unoptimized={active.thumb.startsWith("http") || active.thumb.endsWith(".svg")} />
              </div>
            )}
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ltx-black">{active.title}</h3>
                </div>
                <p className="text-ltx-muted mt-1 leading-relaxed">{active.description}</p>
              </div>
              {active.concept && (
                <>
                  <div className="h-px bg-ltx-rule" />
                  <div>
                    <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-2">Concept</h4>
                    <p className="text-sm text-ltx-body leading-relaxed">{active.concept}</p>
                  </div>
                </>
              )}
              {active.frames.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-3">Gallery</h4>
                  <div className={`grid gap-2 ${active.frames.length <= 3 ? "grid-cols-2 sm:grid-cols-3" : active.frames.length === 5 ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5" : "grid-cols-2 sm:grid-cols-4"}`}>
                    {active.frames.map((frame, i) => (
                      <div key={frame} className="aspect-video rounded-lg overflow-hidden relative bg-ltx-alt">
                        <Image src={frame} alt={`${active.title} ${i + 1}`} fill className="object-cover object-top" sizes="200px" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="h-px bg-ltx-rule" />
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-5">Details</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {active.details.map((d) => (
                    <div key={d.label} className="rounded-xl border border-ltx-rule bg-ltx-alt/50 p-4 space-y-1.5">
                      <p className="text-xs font-semibold" style={{ color: accent }}>{d.label}</p>
                      <p className="text-sm text-ltx-black leading-relaxed">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                {active.url && (
                  <a href={active.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition" style={{ backgroundColor: accent }}>
                    Visit Site
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                )}
                <a href="#contact" onClick={closeModal} className="inline-flex items-center gap-2 rounded-full border border-ltx-rule px-5 py-2.5 text-sm font-semibold text-ltx-black hover:border-ltx-studio hover:text-ltx-studio transition-colors">
                  Let&apos;s Talk
                </a>
              </div>

              {/* Prev / Next */}
              <div className="h-px bg-ltx-rule" />
              <div className="flex items-center justify-between">
                <button
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ltx-muted hover:text-ltx-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2L4 7l5 5" /></svg>
                  Prev
                </button>
                <span className="text-xs text-ltx-muted">{activeIndex + 1} / {projects.length}</span>
                <button
                  onClick={goNext}
                  disabled={activeIndex === projects.length - 1}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ltx-muted hover:text-ltx-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 2l5 5-5 5" /></svg>
                </button>
              </div>
            </div>
          </ProjectModal>
        )}
      </AnimatePresence>
    </>
  );
}
