'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useKonamiCode } from '@/app/hooks/useKonamiCode';
import { useVisitCounter } from '@/app/hooks/useVisitCounter';

export default function EasterEggManager() {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['Creative Context Studio Terminal', 'Type "help" for commands.']);
  const visitCount = useVisitCounter();
  const [showVisitMessage, setShowVisitMessage] = useState(false);

  useKonamiCode(() => {
    setKonamiActivated(true);
    document.documentElement.classList.add('chaos-mode');
    setTimeout(() => {
      setKonamiActivated(false);
      document.documentElement.classList.remove('chaos-mode');
    }, 8000);
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '`' && e.target === document.body) { e.preventDefault(); setTerminalOpen((prev) => !prev); }
      if (e.key === 'Escape' && terminalOpen) setTerminalOpen(false);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [terminalOpen]);

  useEffect(() => {
    if (visitCount === 10) { setShowVisitMessage(true); setTimeout(() => setShowVisitMessage(false), 6000); }
  }, [visitCount]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.toLowerCase().trim();
    if (!cmd) return;
    const addLine = (...lines: string[]) => setTerminalHistory((h) => [...h, `$ ${cmd}`, ...lines]);
    if (cmd === 'help') addLine('COMMANDS:', '  help    — show this list', '  about   — who is this?', '  skills  — technical toolkit', '  secret  — easter egg', '  themes  — available themes', '  clear   — clear terminal', '  quit    — close terminal');
    else if (cmd === 'about') addLine('Creative Producer. Technologist.', '20+ years across brand, broadcast, film, and AI.');
    else if (cmd === 'skills') addLine('Production Management, Creative Direction,', 'AI/ML Workflows, Full-Stack Development,', 'Virtual Production, Multi-continent Logistics');
    else if (cmd === 'secret') addLine('You found the hidden terminal!', 'Try the Konami code for chaos mode.');
    else if (cmd === 'themes') addLine('Available: default, hiya, dieter-rams, miami-vibes, lofi-wave', 'Use the theme selector in the nav to switch.');
    else if (cmd === 'clear') { setTerminalHistory(['Terminal cleared.']); setTerminalInput(''); return; }
    else if (cmd === 'quit' || cmd === 'exit') { setTerminalOpen(false); setTerminalInput(''); return; }
    else addLine(`Unknown command: ${cmd}. Type "help".`);
    setTerminalInput('');
  };

  return (
    <>
      <AnimatePresence>
        {konamiActivated && (
          <motion.div className="fixed bottom-6 left-6 z-[9999] max-w-xs" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}>
            <div className="bg-ltx-studio text-white p-4 rounded-2xl shadow-lg text-sm">
              <p className="font-semibold mb-1">Chaos Mode Activated</p>
              <p className="text-white/80 text-xs">All effects cranked to max. Auto-revert in 8s.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVisitMessage && (
          <motion.div className="fixed bottom-6 right-6 z-[9998] max-w-sm" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}>
            <div className="bg-ltx-studio text-white p-4 rounded-2xl shadow-lg text-sm">
              <p className="font-semibold mb-1">Milestone!</p>
              <p>You&apos;ve visited {visitCount} times. Thank you for your continued interest!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[9997] bg-background border-t border-ltx-rule shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="max-w-4xl mx-auto p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-ltx-studio">Terminal</span>
                <button onClick={() => setTerminalOpen(false)} className="text-xs text-ltx-muted hover:text-ltx-black">[ESC] Close</button>
              </div>
              <div className="bg-ltx-alt rounded-lg p-3 mb-2 text-xs text-ltx-muted font-mono h-40 overflow-y-auto" ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}>
                {terminalHistory.map((line, i) => (
                  <div key={i} className={line.startsWith('$') ? 'text-ltx-studio' : ''}>{line}</div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="flex gap-2">
                <span className="text-ltx-studio font-mono">$</span>
                <input type="text" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} className="flex-1 bg-transparent border-b border-ltx-rule focus:border-ltx-studio focus:outline-none text-xs font-mono" autoFocus autoComplete="off" placeholder="Enter command..." />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
