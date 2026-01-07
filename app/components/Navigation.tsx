'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSelector from './ThemeSelector';
import { useHiddenHover } from '../hooks/useHiddenHover';

export default function Navigation() {
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [isNeobrutalism, setIsNeobrutalism] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { hoverTime, showSecret, handleMouseEnter, handleMouseLeave } = useHiddenHover(
    5,
    () => {
      setShowSecretMessage(true);
    }
  );

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/studiolab', label: 'STUDIO LAB' },
    { href: '/contact', label: 'CONTACT' },
    { href: 'https://creativecontextstudio.substack.com/subscribe', label: 'SUBSCRIBE' },
  ];

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const checkTheme = () => {
        const theme = document.documentElement.getAttribute('data-theme');
        setIsNeobrutalism(theme === 'hiya');
      };
      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    }
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const linkClassName = `hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isNeobrutalism ? 'font-bold underline decoration-2 underline-offset-2' : ''}`;

  return (
    <nav
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-current/20 relative"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <ThemeSelector />
          
          {/* Desktop Navigation */}
          <div className="hidden md:block relative">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => {
                handleMouseLeave();
                setShowSecretMessage(false);
              }}
            >
              <ul className={`flex gap-6 lg:gap-8 font-mono text-sm lg:text-base uppercase tracking-wider ${isNeobrutalism ? 'font-bold' : ''}`}>
                {navItems.map((item) => {
                  const isExternal = item.href.startsWith('http') || item.href === '#';
                  const linkProps = isExternal
                    ? {
                        href: item.href,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : { href: item.href };

                  return (
                    <li key={item.href}>
                      {isExternal ? (
                        <a
                          {...linkProps}
                          className={linkClassName}
                          aria-label={item.label}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          {...linkProps}
                          className={linkClassName}
                          aria-label={item.label}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Hidden Hover Easter Egg */}
            <AnimatePresence>
              {showSecretMessage && showSecret && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-64 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="bg-accent text-background p-3 border-2 border-accent font-mono text-xs">
                    <p className="font-bold uppercase mb-1">SECRET MESSAGE</p>
                    <p>
                      You hovered for 5 seconds! Patience is a virtue in software
                      development.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-current rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              className="flex flex-col gap-1.5 w-6"
              animate={isMobileMenuOpen ? 'open' : 'closed'}
            >
              <motion.span
                className="h-0.5 bg-current w-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
              />
              <motion.span
                className="h-0.5 bg-current w-full"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.span
                className="h-0.5 bg-current w-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              className="fixed top-[73px] left-0 right-0 bottom-0 bg-background border-t-2 border-current z-40 overflow-y-auto md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              role="menu"
            >
              <ul className="flex flex-col p-4 gap-2 font-mono text-base uppercase tracking-wider">
                {navItems.map((item, index) => {
                  const isExternal = item.href.startsWith('http') || item.href === '#';
                  const linkProps = isExternal
                    ? {
                        href: item.href,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : { href: item.href };

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {isExternal ? (
                        <a
                          {...linkProps}
                          className={`block py-3 px-4 border-2 border-current/20 rounded hover:bg-primary hover:text-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] flex items-center ${isNeobrutalism ? 'font-bold' : ''}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          aria-label={item.label}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          {...linkProps}
                          className={`block py-3 px-4 border-2 border-current/20 rounded hover:bg-primary hover:text-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] flex items-center ${isNeobrutalism ? 'font-bold' : ''}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          aria-label={item.label}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

