'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel } from './ui';
import { Button } from './ui';

export default function EasterEggDocumentation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-12">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs"
      >
        {isOpen ? 'HIDE' : 'SHOW'} EASTER EGG DOCUMENTATION
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <Panel variant="bordered" headerVariant="accent" title="EASTER EGG DOCUMENTATION">
              <div className="space-y-6 text-sm font-mono">
                <div>
                  <h4 className="text-primary font-bold uppercase mb-2">
                    1. KONAMI CODE
                  </h4>
                  <p className="text-text mb-1">
                    Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
                  </p>
                  <p className="text-secondary text-xs">
                    Enter the classic Konami code to unlock a hidden project reveal.
                    Triggers a full-screen classified access message.
                  </p>
                </div>

                <div>
                  <h4 className="text-primary font-bold uppercase mb-2">
                    2. MISSION PATCH CLICK
                  </h4>
                  <p className="text-text mb-1">
                    Action: Click the mission patch 10 times
                  </p>
                  <p className="text-secondary text-xs">
                    Located on the home page. Click repeatedly to reveal a
                    classified access message. Persistence is rewarded!
                  </p>
                </div>

                <div>
                  <h4 className="text-primary font-bold uppercase mb-2">
                    3. NAVIGATION HOVER
                  </h4>
                  <p className="text-text mb-1">
                    Action: Hover over navigation menu for 5 seconds
                  </p>
                  <p className="text-secondary text-xs">
                    Hover over the navigation menu links and wait. A secret
                    message will appear after sustained hover.
                  </p>
                </div>

                <div>
                  <h4 className="text-primary font-bold uppercase mb-2">
                    4. HIDDEN TERMINAL
                  </h4>
                  <p className="text-text mb-1">
                    Action: Press ` (backtick) key
                  </p>
                  <p className="text-secondary text-xs">
                    Opens a hidden terminal interface at the bottom of the page.
                    Type "help" for available commands. Press ESC to close.
                  </p>
                </div>

                <div>
                  <h4 className="text-primary font-bold uppercase mb-2">
                    5. VISIT COUNTER
                  </h4>
                  <p className="text-text mb-1">
                    Action: Visit the site 10 times
                  </p>
                  <p className="text-secondary text-xs">
                    On your 10th visit, a milestone message will appear
                    acknowledging your continued interest. Checked via localStorage.
                  </p>
                </div>

                <div className="pt-4 border-t border-current/20">
                  <p className="text-xs text-muted">
                    NOTE: All easter eggs are designed to be discoverable and do not
                    interfere with normal site functionality. They celebrate attention
                    to detail and playful web development practices.
                  </p>
                </div>
              </div>
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

