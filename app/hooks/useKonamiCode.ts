'use client';

import { useEffect, useState, useCallback } from 'react';

export function useKonamiCode(callback: () => void) {
  const [sequence, setSequence] = useState<string[]>([]);
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      const newSequence = [...sequence, event.key];
      setSequence(newSequence.slice(-konamiCode.length));
    };

    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [sequence, konamiCode.length]);

  useEffect(() => {
    if (sequence.length === konamiCode.length) {
      const match = sequence.every((key, i) => key === konamiCode[i]);
      if (match) {
        callback();
        setSequence([]); // Reset after triggering
      }
    }
  }, [sequence, konamiCode, callback]);
}

