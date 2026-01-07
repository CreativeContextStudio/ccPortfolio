'use client';

import { useState, useRef, useEffect } from 'react';

export function useHiddenHover(
  duration: number = 5,
  callback: () => void
): {
  hoverTime: number;
  showSecret: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
} {
  const [hoverTime, setHoverTime] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    intervalRef.current = setInterval(() => {
      setHoverTime((prev) => {
        const newTime = prev + 1;
        if (newTime >= duration && !showSecret) {
          callback();
          setShowSecret(true);
        }
        return newTime;
      });
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHoverTime(0);
    setShowSecret(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    hoverTime,
    showSecret,
    handleMouseEnter,
    handleMouseLeave,
  };
}

