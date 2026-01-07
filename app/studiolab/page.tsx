'use client';

import { motion } from 'framer-motion';
import { Panel } from '../components/ui';

export default function StudioLabPage() {
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
      >
        <Panel variant="bordered" headerVariant="primary" title="COMING SOON">
          <div className="space-y-6 text-center py-12">
            <div className="space-y-4">
              <p className="text-lg font-mono text-text">
                STUDIO LAB IS UNDER CONSTRUCTION
              </p>
              <p className="text-sm font-mono text-secondary leading-relaxed max-w-2xl mx-auto">
                This space will host experimental mini apps and interactive experiences 
                that the team is building and experimenting with. The first projects will 
                include motion tracking and WebGL experiments.
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
    </div>
  );
}
