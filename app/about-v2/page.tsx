'use client';

import { motion } from 'framer-motion';
import { aboutData } from '../data/about';
import { resumeData } from '../data/resume';
import { Panel } from '../components/ui';
import ProfileHeader from '../components/ProfileHeader';
import HeadshotFrame from '../components/HeadshotFrame';
import SkillsMatrix from '../components/SkillsMatrix';
import TechStackGrid from '../components/TechStackGrid';
import ResumeSection from '../components/ResumeSection';
import ResumeDownload from '../components/ResumeDownload';
import EasterEggDocumentation from '../components/EasterEggDocumentation';

export default function AboutV2Page() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold mb-8 uppercase tracking-wider text-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ABOUT
      </motion.h1>

      {/* Profile Header and Headshot */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="lg:col-span-2">
          <ProfileHeader
            agentId={aboutData.agentId}
            specialization={aboutData.specialization}
            location={aboutData.location}
          />
        </div>
        <div className="flex items-start justify-center lg:justify-end">
          <HeadshotFrame />
        </div>
      </motion.div>

      {/* Professional Summary */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Panel variant="bordered" headerVariant="accent" title="SUMMARY">
          <p className="text-sm leading-relaxed text-text font-mono">
            Producer and creator building production systems that work at any scale, from boutique creative direction to distributed teams producing 100+ assets weekly. Combines 18+ years of traditional, brand, and broadcast experience (network television, Fortune 500 campaigns, film) with hands-on expertise in physical production with teams and crews all over the globe. Expertise concepting narrative content, optimizing video, directing talent, solving technical problems, and building automated operations and content systems. Equally comfortable with generative AI tools, context engineering, and agentic workflows. Works remotely from anywhere on projects anywhere.
          </p>
        </Panel>
      </motion.div>

      {/* Skills Matrix */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <SkillsMatrix skills={aboutData.skills} />
      </motion.div>

      {/* Technology Stack Grid */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <TechStackGrid categories={aboutData.techStackCategories} />
      </motion.div>

      {/* Core Competencies */}
      {resumeData.competencies && resumeData.competencies.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ResumeSection
            title="CORE COMPETENCIES"
            items={resumeData.competencies}
          />
        </motion.div>
      )}

      {/* Work History */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ResumeSection
          title="WORK HISTORY"
          items={resumeData.workHistory}
        />
      </motion.div>

      {/* Specialized Qualifications */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <ResumeSection
          title="SPECIALIZED QUALIFICATIONS"
          items={resumeData.certifications}
        />
      </motion.div>

      {/* Clients & Highlights */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Panel variant="bordered" headerVariant="primary" title="CLIENTS & HIGHLIGHTS">
          <div className="space-y-4 text-sm font-mono text-text">
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary mb-2">
                BRAND & PERFORMANCE VIDEO:
              </p>
              <p className="leading-relaxed">
                IBM, Adidas, JP Morgan Chase, Complex, Champs, Facebook, and 50+ additional Fortune 500 and mid-market brands
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary mb-2">
                BROADCAST & NETWORK PRODUCTION:
              </p>
              <p className="leading-relaxed">
                Travel Channel ("Ripley's Believe It or Not!"), Discovery ID ("Shadow of Doubt"), The CW ("Would I Lie To You?"), A&E Networks, MTV, National Geographic, SyFy, Animal Planet, Food Network, Disney, Warner Bros., Sony Pictures, NBC Universal
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary mb-2">
                NARRATIVE & INDEPENDENT FILM:
              </p>
              <p className="leading-relaxed">
                "netuser" (award-winning feature film, Best Film LGBT Los Angeles Film Festival)
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary mb-2">
                OPERATIONAL SCALE & ACHIEVEMENT:
              </p>
              <p className="leading-relaxed">
                Delivered 60+ international video segments across 25+ cities spanning 6 continents. Managed productions ranging from 15-second social ads to 60-minute broadcast episodes. Created video content viewed by millions across all major digital platforms.
              </p>
            </div>
          </div>
        </Panel>
      </motion.div>

      {/* Download Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <ResumeDownload pdfUrl={resumeData.pdfUrl} />
      </motion.div>

      {/* Easter Egg Documentation */}
      <EasterEggDocumentation />
    </div>
  );
}
