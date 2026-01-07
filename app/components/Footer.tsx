'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { newsTickerMessages, socialLinks } from '../data/newsTicker';

interface FooterProps {
  messages?: string[];
  socialLinks?: typeof socialLinks;
}

// Fisher-Yates shuffle algorithm for randomizing array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Footer({ 
  messages = newsTickerMessages,
  socialLinks: customSocialLinks = socialLinks 
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [randomizedMessages, setRandomizedMessages] = useState<string[]>(messages);

  // Randomize messages only on client side after mount to avoid hydration mismatch
  useEffect(() => {
    setRandomizedMessages(shuffleArray(messages));
  }, [messages]);

  // Create ticker items: alternate between messages and social icons
  const createTickerItems = () => {
    const items: Array<{ type: 'message' | 'social'; content: string; url?: string; name?: string }> = [];
    
    randomizedMessages.forEach((message, index) => {
      // Add message
      items.push({ type: 'message', content: message });
      
      // Add social icon after each message (cycle through social links)
      const socialIndex = index % customSocialLinks.length;
      const social = customSocialLinks[socialIndex];
      items.push({ 
        type: 'social', 
        content: social.icon, 
        url: social.url,
        name: social.name 
      });
    });
    
    return items;
  };

  const tickerItems = useMemo(() => createTickerItems(), [randomizedMessages, customSocialLinks]);
  // Duplicate for seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <footer className="sticky bottom-0 z-40 border-t-2 border-current/20 bg-background/95 backdrop-blur-sm mt-auto">
      {/* News Ticker Section */}
      <div className="relative overflow-hidden border-b-2 border-current/20 bg-secondary/5">
        <div className="flex items-center h-10 sm:h-12">
          {/* Ticker Label */}
          <div className="flex-shrink-0 px-2 sm:px-4 py-2 bg-accent text-background font-mono text-[10px] sm:text-xs uppercase tracking-wider border-r-2 border-current/20 z-10">
            <span className="font-bold hidden sm:inline">LATEST</span>
            <span className="font-bold sm:hidden">NEWS</span>
          </div>
          
          {/* Scrolling Ticker */}
          <div className="flex-1 overflow-hidden relative h-full">
            <div 
              className="flex items-center h-full ticker-container"
            >
              {duplicatedItems.map((item, index) => {
                if (item.type === 'social') {
                  return (
                    <Link
                      key={`social-${index}`}
                      href={item.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 px-3 sm:px-6 font-mono text-xs sm:text-sm text-accent hover:text-primary transition-colors min-h-[44px] flex items-center"
                      aria-label={item.name}
                      title={item.name}
                    >
                      {item.content}
                    </Link>
                  );
                }
                
                return (
                  <span
                    key={`message-${index}`}
                    className="flex-shrink-0 px-3 sm:px-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider whitespace-nowrap text-secondary"
                  >
                    {item.content}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-secondary">
          <div className="font-mono uppercase tracking-wider text-center sm:text-left">
            © {currentYear} CREATIVE CONTEXT STUDIO
          </div>
          <div className="text-[10px] sm:text-xs font-mono">
            ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}
