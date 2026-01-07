'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../hooks/useKonamiCode';
import { useVisitCounter } from '../hooks/useVisitCounter';

export default function EasterEggManager() {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const visitCount = useVisitCounter();
  const [showVisitMessage, setShowVisitMessage] = useState(false);

  // Konami code handler
  useKonamiCode(() => {
    setKonamiActivated(true);
    setTimeout(() => setKonamiActivated(false), 8000);
  });

  // Terminal toggle with ` key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '`' && e.target === document.body) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && terminalOpen) {
        setTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [terminalOpen]);

  // Visit count easter egg (10th visit)
  useEffect(() => {
    if (visitCount === 10) {
      setShowVisitMessage(true);
      setTimeout(() => setShowVisitMessage(false), 6000);
    }
  }, [visitCount]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.toLowerCase().trim();

    if (command === 'help') {
      alert(
        'AVAILABLE COMMANDS:\n' +
          '- help: Show this message\n' +
          '- clear: Clear terminal\n' +
          '- about: Show about information\n' +
          '- secret: Reveal secret message\n' +
          '- quit: Close terminal'
      );
    } else if (command === 'clear') {
      setTerminalInput('');
    } else if (command === 'about') {
      alert('CREATIVE CONTEXT STUDIO\nVersion 1.0\nCold War Aerospace Portfolio');
    } else if (command === 'secret') {
      alert('ACCESS GRANTED\nYou found the hidden terminal!');
    } else if (command === 'quit' || command === 'exit') {
      setTerminalOpen(false);
    } else if (command) {
      alert(`COMMAND NOT RECOGNIZED: ${command}\nType "help" for available commands.`);
    }

    setTerminalInput('');
  };

  return (
    <>
      {/* Konami Code Easter Egg */}
      <AnimatePresence>
        {konamiActivated && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-2xl mx-4 p-8 border-4 border-primary bg-background text-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <motion.h2
                className="text-3xl font-bold uppercase tracking-wider text-primary mb-4"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ACCESS GRANTED
              </motion.h2>
              <p className="font-mono text-sm text-text mb-4">
                CLASSIFIED PROJECT UNLOCKED
              </p>
              <div className="border-2 border-primary p-4 bg-muted/20">
                <p className="font-mono text-xs text-secondary uppercase mb-2">
                  PROJECT CODE: KONAMI-ACCESS
                </p>
                <p className="text-sm text-text">
                  You've discovered the hidden Konami code easter egg! This demonstrates
                  attention to detail and a playful approach to web development.
                </p>
              </div>
              <p className="font-mono text-xs text-muted mt-4 uppercase">
                AUTO-CLOSE IN 8 SECONDS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visit Count Easter Egg */}
      <AnimatePresence>
        {showVisitMessage && (
          <motion.div
            className="fixed bottom-6 right-6 z-[9998] max-w-sm"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="bg-primary text-background p-4 border-2 border-primary font-mono text-xs uppercase">
              <p className="font-bold mb-2">MILESTONE ACHIEVED</p>
              <p>
                You've visited this portfolio {visitCount} times. Thank you for your
                continued interest!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Terminal */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[9997] bg-background border-t-4 border-primary font-mono"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="max-w-4xl mx-auto p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs uppercase tracking-wider text-primary font-bold">
                  TERMINAL v1.0
                </div>
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="text-xs text-secondary hover:text-text uppercase"
                >
                  [ESC] CLOSE
                </button>
              </div>
              <div className="bg-muted/30 border border-current/20 p-2 mb-2 text-xs text-text font-mono h-32 overflow-y-auto">
                <div className="text-secondary">CREATIVE CONTEXT STUDIO TERMINAL</div>
                <div className="text-secondary">Type "help" for available commands.</div>
                <div className="text-secondary mt-2">READY...</div>
              </div>
              <form onSubmit={handleTerminalSubmit} className="flex gap-2">
                <span className="text-primary">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-background border-b-2 border-primary focus:outline-none text-xs font-mono text-text"
                  autoFocus
                  autoComplete="off"
                  placeholder="Enter command..."
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

