"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectModal, cardKeyHandler } from "@/components/project-modal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { REEL } from "@/app/data/projects";
import Image from "next/image";

export function ReelShowcase() {
  const [showReel, setShowReel] = useState(false);
  const closeReel = useCallback(() => setShowReel(false), []);

  return (
    <>
      <section className="py-6 md:py-10 px-4 sm:px-6 bg-background">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-4 text-center">Featured Reel</motion.p>
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-stretch">
            {/* Production Reel — 16:9 */}
            <Card
              className="card-glow overflow-hidden border-ltx-rule group cursor-pointer focus-visible:ring-2 focus-visible:ring-ltx-studio focus-visible:ring-offset-2 outline-none flex flex-col"
              role="button"
              tabIndex={0}
              onClick={() => setShowReel(true)}
              onKeyDown={cardKeyHandler(() => setShowReel(true))}
            >
              <div className="aspect-video w-full relative overflow-hidden bg-black">
                <Image src={REEL.thumb} alt="Production Reel" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 768px" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" className="ml-0.5"><path d="M18.5 9.268a2 2 0 010 3.464L3.5 21.124A2 2 0 010 19.392V2.608A2 2 0 013.5.876L18.5 9.268z" fill="var(--ltx-black)" /></svg>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ltx-black">{REEL.title}</h3>
                <p className="text-sm text-ltx-muted mt-1 leading-snug">{REEL.description}</p>
              </CardContent>
            </Card>

            {/* Vertical Video Placeholder — 9:16 */}
            <div className="hidden md:flex flex-col">
              <div className="aspect-[9/16] h-full rounded-2xl border border-ltx-rule bg-ltx-alt overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-ltx-muted p-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-40">
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <path d="M10 10l4 2.5-4 2.5V10z" />
                  </svg>
                  <span className="text-xs font-medium text-center opacity-60">Vertical Reel</span>
                  <span className="text-[10px] text-center opacity-40 mt-1">9:16</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showReel && (
          <ProjectModal onClose={closeReel} ariaLabel={REEL.title}>
            <div className="w-full aspect-video rounded-t-2xl overflow-hidden bg-black">
              <iframe src={`https://www.youtube.com/embed/${REEL.youtubeId}?rel=0&modestbranding=1&autoplay=1&vq=hd1080`} title="Production Reel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-ltx-black">{REEL.title}</h3>
                <p className="text-ltx-muted mt-1">{REEL.description}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-3">Frames</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {REEL.frames.map((frame, i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden bg-ltx-alt relative">
                      <Image src={frame} alt={`Reel frame ${i + 1}`} fill className="object-cover" sizes="160px" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ProjectModal>
        )}
      </AnimatePresence>
    </>
  );
}
