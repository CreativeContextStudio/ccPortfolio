'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudioLabProject } from '../data/studioLabProjects';
import { Button, Panel } from './ui';

interface StudioLabDetailModalProps {
  project: StudioLabProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudioLabDetailModal({
  project,
  isOpen,
  onClose,
}: StudioLabDetailModalProps) {
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
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
  }, [isOpen, onClose]);

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
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
                        className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-text mb-2 break-words font-mono"
                      >
                        {project.name}
                      </h2>
                      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                        <span className="text-xs font-mono px-2 py-0.5 border border-primary bg-primary/10 text-primary">
                          {project.status}
                        </span>
                        <span className="text-xs font-mono text-secondary">
                          STUDIO LAB PROJECT
                        </span>
                      </div>
                      <p id="modal-description" className="sr-only">
                        Detailed information about {project.name} project
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
                {/* Description */}
                <Panel variant="bordered" headerVariant="primary" title="PROJECT OVERVIEW">
                  <p className="text-sm leading-relaxed text-text font-mono">
                    {project.fullDescription}
                  </p>
                </Panel>

                {/* Image Placeholders */}
                <div className="my-6 flex gap-4">
                  <div className="flex-1 h-48 border border-current/20 bg-muted/10" />
                  <div className="flex-1 h-48 border border-current/20 bg-muted/10" />
                </div>

                {/* Tags */}
                <div className="my-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-secondary mb-2">
                    CATEGORIES:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-secondary/70 px-2 py-0.5 border border-current/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feature Categories */}
                <div className="space-y-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-secondary">
                    FEATURE BREAKDOWN:
                  </p>
                  {project.featureCategories.map((category, index) => (
                    <Panel
                      key={category.name}
                      variant="bordered"
                      headerVariant={index % 2 === 0 ? 'accent' : 'default'}
                      title={category.name.toUpperCase()}
                    >
                      <ul className="space-y-2">
                        {category.features.map((feature) => (
                          <li
                            key={feature}
                            className="text-sm font-mono text-text flex items-start gap-2"
                          >
                            <span className="text-primary mt-0.5">▸</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  ))}
                </div>

                {/* Tech Stack (for contentManagement) */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="mt-6">
                    <Panel variant="bordered" headerVariant="primary" title="TECH STACK">
                      <ul className="space-y-2">
                        {project.techStack.map((tech) => (
                          <li
                            key={tech}
                            className="text-sm font-mono text-text flex items-start gap-2"
                          >
                            <span className="text-accent mt-0.5">◆</span>
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  </div>
                )}

                {/* Routes (for contentCreator) */}
                {project.routes && project.routes.length > 0 && (
                  <div className="mt-6">
                    <Panel variant="bordered" headerVariant="primary" title="APP ROUTES">
                      <ul className="space-y-2">
                        {project.routes.map((route) => (
                          <li
                            key={route}
                            className="text-sm font-mono text-text flex items-start gap-2"
                          >
                            <span className="text-accent mt-0.5">→</span>
                            <span>{route}</span>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  </div>
                )}

                {/* Status Footer */}
                <div className="mt-8 pt-6 border-t border-current/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-secondary">STATUS:</span>
                      <span className="text-xs font-mono px-2 py-0.5 border border-primary bg-primary/10 text-primary">
                        {project.status}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-secondary/50">
                      STUDIO LAB • EXPERIMENTAL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
