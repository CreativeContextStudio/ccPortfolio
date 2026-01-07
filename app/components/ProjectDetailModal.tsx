'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data/projects';
import { Button, Panel, StatusBadge, TechStackIcon } from './ui';
import ImageGallery from './ImageGallery';
import CodeSnippet from './CodeSnippet';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabId = 'objectives' | 'approach' | 'outcomes';

interface Tab {
  id: TabId;
  label: string;
}

const tabs: Tab[] = [
  { id: 'objectives', label: 'OBJECTIVES' },
  { id: 'approach', label: 'APPROACH' },
  { id: 'outcomes', label: 'OUTCOMES' },
];

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('objectives');
  const [reducedMotion, setReducedMotion] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Focus management
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      // Focus close button when modal opens
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
        if (e.key === 'ArrowRight') {
          const nextIndex = (currentIndex + 1) % tabs.length;
          setActiveTab(tabs[nextIndex].id);
        } else {
          const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          setActiveTab(tabs[prevIndex].id);
        }
      } else if (e.key === 'Tab') {
        // Focus trap
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="fixed inset-0 md:inset-y-0 md:right-0 md:left-auto w-full md:w-full md:max-w-2xl lg:max-w-4xl bg-background z-50 overflow-y-auto"
            initial={{ x: '100%', y: '100%' }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: '100%', y: '100%' }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: 'spring', damping: 30, stiffness: 300 }
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <div className="min-h-full">
              {/* Header */}
              <div className="sticky top-0 bg-background border-b-2 border-primary z-10">
                <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h2
                        id="modal-title"
                        className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-text mb-2 break-words"
                      >
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                        <span className="text-xs font-mono text-secondary">
                          {project.projectId}
                        </span>
                        <StatusBadge status={project.status} variant="stamp" />
                        <span className="text-xs font-mono text-secondary">
                          {project.dateRange}
                        </span>
                      </div>
                      <p id="modal-description" className="sr-only">
                        Detailed information about {project.title} project
                      </p>
                    </div>
                    <Button
                      ref={closeButtonRef}
                      variant="outline"
                      size="sm"
                      onClick={onClose}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          e.preventDefault();
                          onClose();
                        }
                      }}
                      className="ml-2 sm:ml-4 flex-shrink-0"
                      aria-label="Close project detail modal"
                    >
                      <span className="hidden sm:inline">CLOSE FILE</span>
                      <span className="sm:hidden">CLOSE</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* Tech Stack */}
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-2">
                    TECH STACK:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <TechStackIcon key={tech} tech={tech} size="md" showLabel />
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-2">
                      CATEGORIES:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 border-2 border-current bg-muted/20 font-mono text-xs uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab Navigation */}
                <div className="border-b-2 border-current/20 mb-6">
                  <div
                    className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide"
                    role="tablist"
                    aria-label="Project detail tabs"
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveTab(tab.id);
                          }
                        }}
                        className={`px-3 sm:px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] flex items-center ${
                          activeTab === tab.id
                            ? 'border-primary text-primary font-bold'
                            : 'border-transparent text-secondary hover:text-text'
                        }`}
                        aria-selected={activeTab === tab.id}
                        role="tab"
                        aria-controls={`tab-${tab.id}`}
                        id={`tab-button-${tab.id}`}
                        tabIndex={activeTab === tab.id ? 0 : -1}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: reducedMotion ? 0 : 0.2 }}
                      role="tabpanel"
                      id={`tab-${activeTab}`}
                      aria-labelledby={`tab-button-${activeTab}`}
                      tabIndex={0}
                      hidden={false}
                    >
                      {activeTab === 'objectives' && (
                        <TabContentObjectives project={project} />
                      )}
                      {activeTab === 'approach' && (
                        <TabContentApproach project={project} />
                      )}
                      {activeTab === 'outcomes' && (
                        <TabContentOutcomes project={project} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Tab Content Components
function TabContentObjectives({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <Panel variant="bordered" headerVariant="primary" title="PRIMARY OBJECTIVE">
        <p className="text-sm leading-relaxed text-text font-mono">
          {project.description}
        </p>
      </Panel>

      {project.problemSolved && (
        <Panel variant="bordered" headerVariant="accent" title="PROBLEM STATEMENT">
          <p className="text-sm leading-relaxed text-text font-mono">
            {project.problemSolved}
          </p>
        </Panel>
      )}

      {project.domain && (
        <Panel variant="bordered" title="DOMAIN">
          <p className="text-sm font-mono uppercase tracking-wider text-text">
            {project.domain}
          </p>
        </Panel>
      )}
    </div>
  );
}

function TabContentApproach({ project }: { project: Project }) {
  // Example code snippets based on tech stack
  const getCodeExample = () => {
    if (project.techStack.includes('react') || project.techStack.includes('nextjs')) {
      return `// Example React component structure
import { useState } from 'react';

export default function ${project.title.replace(/\s+/g, '')}Component() {
  const [state, setState] = useState(null);
  
  return (
    <div className="container">
      <h1>${project.title}</h1>
      {/* Component implementation */}
    </div>
  );
}`;
    } else if (project.techStack.includes('python')) {
      return `# Example Python implementation
class ${project.title.replace(/\s+/g, '')}:
    def __init__(self):
        self.initialized = True
    
    def process(self):
        # Implementation logic
        return result`;
    } else if (project.techStack.includes('nodejs')) {
      return `// Example Node.js implementation
const express = require('express');
const app = express();

app.get('/api/${project.title.toLowerCase().replace(/\s+/g, '-')}', (req, res) => {
  res.json({ message: '${project.title} API endpoint' });
});

module.exports = app;`;
    }
    return `// Implementation code for ${project.title}`;
  };

  return (
    <div className="space-y-6">
      <Panel variant="bordered" headerVariant="primary" title="ARCHITECTURE">
        <p className="text-sm leading-relaxed text-text font-mono mb-4">
          Technical implementation details and architectural decisions for this project.
        </p>
        <CodeSnippet code={getCodeExample()} language="typescript" />
      </Panel>

      <Panel variant="bordered" headerVariant="accent" title="TECHNICAL STACK">
        <div className="space-y-2">
          {project.techStack.map((tech) => (
            <div key={tech} className="flex items-center gap-2">
              <TechStackIcon tech={tech} size="sm" />
              <span className="text-sm font-mono uppercase tracking-wider text-text">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function TabContentOutcomes({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <Panel variant="bordered" headerVariant="primary" title="RESULTS">
        <p className="text-sm leading-relaxed text-text font-mono">
          {project.preview?.additionalInfo || 'Project outcomes and results will be displayed here.'}
        </p>
      </Panel>

      {project.link && (
        <Panel variant="bordered" headerVariant="accent" title="LIVE DEMO">
          <Button
            variant="primary"
            size="md"
            onClick={() => window.open(project.link, '_blank')}
            className="w-full"
          >
            VIEW LIVE PROJECT
          </Button>
        </Panel>
      )}

      <Panel variant="bordered" title="STATUS">
        <div className="flex items-center gap-2">
          <StatusBadge status={project.status} variant="stamp" />
          <span className="text-xs font-mono text-secondary">
            Current project status
          </span>
        </div>
      </Panel>
    </div>
  );
}

