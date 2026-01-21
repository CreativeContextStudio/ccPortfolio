'use client';

import dynamic from 'next/dynamic';

// Lazy load components that aren't needed immediately
export const Chatbot = dynamic(() => import('./Chatbot'), {
  ssr: false, // Uses browser-only APIs (sessionStorage, etc.)
});

export const EasterEggManager = dynamic(() => import('./EasterEggManager'), {
  ssr: false, // Uses browser-only APIs (keyboard events, localStorage, etc.)
});

