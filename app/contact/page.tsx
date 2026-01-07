'use client';

import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import DirectContactPanel from '../components/DirectContactPanel';
import StatusIndicator from '../components/StatusIndicator';
import { Panel } from '../components/ui';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      {/* Header Section */}
      <motion.h1
        className="text-4xl font-bold mb-8 uppercase tracking-wider text-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        CONTACT
      </motion.h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
        {/* Left Column - Contact Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Right Sidebar - Info and Status Indicator */}
        <div className="lg:col-span-1 space-y-6 sm:space-y-8">
          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Panel variant="bordered" headerVariant="default" title="">
              <div className="space-y-4">
                <div>
                  <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-text font-semibold mb-1.5">
                    PROJECT TYPES
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-text">
                    Storytelling, film and video production, interactive experiences, branded content, AI workflow automation, and full-stack applications.
                  </p>
                </div>
                <div className="pt-2 border-t border-current/20">
                  <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-text font-semibold mb-1.5">
                    COLLABORATION
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-text">
                    Remote-friendly. Based in Atlanta Metro, available on-site.
                  </p>
                </div>
              </div>
            </Panel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatusIndicator
              status="CURRENTLY AVAILABLE FOR PROJECTS"
              responseTime="24-48 HRS"
            />
          </motion.div>
        </div>
      </div>

      {/* Direct Contact - Full Width */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <DirectContactPanel />
      </motion.div>
    </div>
  );
}

