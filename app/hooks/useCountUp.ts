'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  duration?: number;
  start?: number;
  end: number;
  enabled?: boolean;
}

export function useCountUp({ duration = 2000, start = 0, end, enabled = true }: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Reset state when values change
    setCount(start);
    setIsAnimating(false);
    
    if (!enabled) {
      setCount(end);
      return;
    }

    // Check for prefers-reduced-motion
    if (typeof window === 'undefined') {
      setCount(end);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    setIsAnimating(true);
    const startTime = Date.now();
    startTimeRef.current = startTime;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + (end - start) * easeOut);

      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsAnimating(false);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = undefined;
      }
    };
  }, [start, end, duration, enabled]);

  return { count, isAnimating };
}

