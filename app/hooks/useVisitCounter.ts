'use client';

import { useEffect, useState } from 'react';

export function useVisitCounter(): number {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCount = localStorage.getItem('portfolio_visitCount');
      const count = storedCount ? parseInt(storedCount, 10) : 0;
      const newCount = count + 1;

      localStorage.setItem('portfolio_visitCount', newCount.toString());
      setVisitCount(newCount);
    }
  }, []);

  return visitCount;
}

