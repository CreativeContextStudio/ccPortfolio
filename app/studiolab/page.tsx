'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Panel } from '../components/ui';
import StudioLabDetailModal from '../components/StudioLabDetailModal';
import { studioLabProjects, StudioLabProject } from '../data/studioLabProjects';

export default function StudioLabPage() {
  const [selectedProject, setSelectedProject] = useState<StudioLabProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (projectId: string) => {
    const project = studioLabProjects[projectId];
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 uppercase tracking-wider text-text">
          STUDIO LAB
        </h1>
        <p className="text-sm font-mono text-secondary uppercase tracking-wider">
          EXPERIMENTAL INTERACTIONS & MINI APPS
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        {/* Active Projects */}
        <Panel variant="bordered" headerVariant="primary" title="ACTIVE PROJECTS">
          <div className="space-y-4 py-6">
            {/* Bartender Friend - TODO: Add entrance animation class */}
            <motion.a
              href="https://bartender-friend.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="block group"
            >
              <div className="flex items-start gap-4 p-4 border border-current/20 bg-muted/5 hover:bg-muted/10 hover:border-current/30 transition-all cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 border border-current/20 bg-primary/10 flex items-center justify-center font-mono text-xs">
                  BF
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-mono font-semibold text-text group-hover:text-primary transition-colors">
                      bartenderFriend
                    </h3>
                    <span className="text-xs font-mono text-secondary">→</span>
                  </div>
                  <p className="text-xs font-mono text-secondary leading-relaxed">
                    A pocket reference for classic recipes, modern techniques, and industry standards.
                    Build faster, smarter, and with confidence.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      COCKTAILS
                    </span>
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      RECIPES
                    </span>
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      TRAINING
                    </span>
                  </div>
                </div>
                {/* TODO: Add project screenshot */}
                <div className="flex-shrink-0 w-24 h-16 border border-current/20 bg-muted/10 flex items-center justify-center hidden sm:flex">
                  <span className="text-xs font-mono text-secondary/50">IMG</span>
                </div>
              </div>
            </motion.a>

            {/* Content Creator - TODO: Add entrance animation class */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block group cursor-pointer"
              onClick={() => handleOpenModal('contentCreator')}
            >
              <div className="flex items-start gap-4 p-4 border border-current/20 bg-muted/5 hover:bg-muted/10 hover:border-current/30 transition-all">
                <div className="flex-shrink-0 w-12 h-12 border border-current/20 bg-primary/10 flex items-center justify-center font-mono text-xs">
                  CC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-mono font-semibold text-text group-hover:text-primary transition-colors">
                      contentCreator
                    </h3>
                    <span className="text-xs font-mono text-secondary/50">IN DEV</span>
                    <span className="text-xs font-mono text-secondary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                  <p className="text-xs font-mono text-secondary leading-relaxed">
                    Professional social media content creation app with broadcast-quality GFX overlays,
                    25+ themes, 50+ animation presets, and batch export for images and video.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      CONTENT
                    </span>
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      GFX
                    </span>
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      VIDEO
                    </span>
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      THEMES
                    </span>
                  </div>
                </div>
                {/* TODO: Add project screenshot */}
                <div className="flex-shrink-0 w-24 h-16 border border-current/20 bg-muted/10 hidden sm:flex" />
                {/* TODO: Add CSS animation */}
                <div className="flex-shrink-0 w-16 h-16 border border-current/20 bg-muted/10 hidden sm:flex" />
              </div>
            </motion.div>

            {/* Content Management Platform - TODO: Add entrance animation class */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="block group cursor-pointer"
              onClick={() => handleOpenModal('contentManagement')}
            >
              <div className="flex items-start gap-4 p-4 border border-current/20 bg-muted/5 hover:bg-muted/10 hover:border-current/30 transition-all">
                <div className="flex-shrink-0 w-12 h-12 border border-current/20 bg-primary/10 flex items-center justify-center font-mono text-xs">
                  CM
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-mono font-semibold text-text group-hover:text-primary transition-colors">
                      contentManagement
                    </h3>
                    <span className="text-xs font-mono text-secondary/50">~40-55%</span>
                    <span className="text-xs font-mono text-secondary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                  <p className="text-xs font-mono text-secondary leading-relaxed">
                    AI-powered production management platform with multi-brand support,
                    episode lifecycle tracking, Claude-generated guides, and real-time collaboration.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      AI
                    </span>
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      PRODUCTION
                    </span>
                    <span className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10">
                      COLLABORATION
                    </span>
                  </div>
                </div>
                {/* TODO: Add project screenshot */}
                <div className="flex-shrink-0 w-24 h-16 border border-current/20 bg-muted/10 hidden sm:flex" />
                {/* TODO: Add CSS animation */}
                <div className="flex-shrink-0 w-16 h-16 border border-current/20 bg-muted/10 hidden sm:flex" />
              </div>
            </motion.div>
          </div>
        </Panel>

        {/* Coming Soon Section */}
        <Panel variant="bordered" headerVariant="primary" title="COMING SOON">
          <div className="space-y-6 text-center py-12">
            <div className="space-y-4">
              <p className="text-lg font-mono text-text">
                MORE EXPERIMENTS IN DEVELOPMENT
              </p>
              <p className="text-sm font-mono text-secondary leading-relaxed max-w-2xl mx-auto">
                Additional experimental mini apps and interactive experiences 
                are being developed. The next projects will include motion tracking 
                and WebGL experiments.
              </p>
            </div>

            <div className="pt-8 border-t border-current/20">
              <div className="space-y-3 text-left max-w-xl mx-auto">
                <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-4">
                  UPCOMING EXPERIMENTS:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 border border-current/10 bg-muted/5">
                    <span className="text-xs font-mono text-secondary">01</span>
                    <div>
                      <p className="text-sm font-mono font-semibold text-text">
                        MOTION TRACKING
                      </p>
                      <p className="text-xs font-mono text-secondary mt-1">
                        Interactive motion tracking experiments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-current/10 bg-muted/5">
                    <span className="text-xs font-mono text-secondary">02</span>
                    <div>
                      <p className="text-sm font-mono font-semibold text-text">
                        WEBGL EXPERIMENTS
                      </p>
                      <p className="text-xs font-mono text-secondary mt-1">
                        3D graphics and WebGL interactive experiences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-xs font-mono text-secondary uppercase tracking-wider">
                CHECK BACK SOON FOR UPDATES
              </p>
            </div>
          </div>
        </Panel>
      </motion.div>

      {/* Project Detail Modal */}
      <StudioLabDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
