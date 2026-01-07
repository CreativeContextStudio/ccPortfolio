'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export function useClickPattern<T extends string>(
  pattern: T[],
  callback: () => void,
  timeout: number = 2000
) {
  const [clicks, setClicks] = useState<T[]>([]);
  const lastClickTimeRef = useRef<number>(0);

  // Check for pattern match
  useEffect(() => {
    if (clicks.length === pattern.length) {
      const match = clicks.every((click, i) => click === pattern[i]);
      if (match) {
        callback();
        setClicks([]);
      }
    }
  }, [clicks, pattern, callback]);

  const handleClick = useCallback(
    (id: T) => {
      const now = Date.now();
      if (now - lastClickTimeRef.current > timeout) {
        // Reset if more than timeout ms between clicks
        setClicks([id]);
      } else {
        setClicks((prev) => [...prev, id].slice(-pattern.length));
      }
      lastClickTimeRef.current = now;
    },
    [pattern.length, timeout]
  );

  return handleClick;
}

