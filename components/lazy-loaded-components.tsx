'use client';

import dynamic from 'next/dynamic';

export const Chatbot = dynamic(() => import('./chatbot'), { ssr: false });
export const EasterEggManager = dynamic(() => import('./easter-egg-manager'), { ssr: false });
