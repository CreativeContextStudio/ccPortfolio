'use client';

import dynamic from 'next/dynamic';

// Lazy load components that aren't needed immediately
export const AgentQueryInterface = dynamic(() => import('./AgentQueryInterface'), {
  ssr: false, // Uses browser-only APIs (localStorage, etc.)
});

export const EasterEggManager = dynamic(() => import('./EasterEggManager'), {
  ssr: false, // Uses browser-only APIs (keyboard events, localStorage, etc.)
});

