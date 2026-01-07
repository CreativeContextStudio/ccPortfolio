'use client';

import { motion } from 'framer-motion';
import { Panel } from './ui';

interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon?: string;
  inactive?: boolean;
}

interface DirectContactPanelProps {
  className?: string;
}

export default function DirectContactPanel({
  className,
}: DirectContactPanelProps) {
  const channels: ContactChannel[] = [
    {
      label: 'SUBSTACK',
      value: 'Substack',
      href: 'https://creativecontextstudio.substack.com/subscribe',
    },
    {
      label: 'INSTAGRAM',
      value: 'Instagram',
      href: 'https://www.instagram.com/creativecontext.studio/',
    },
    {
      label: 'X',
      value: 'X (Twitter)',
      href: 'https://x.com/CreateContextSt',
    },
    {
      label: 'THREADS',
      value: 'Threads',
      href: '#', // Placeholder - update when social media URLs are available
      inactive: true,
    },
    {
      label: 'BLUESKY',
      value: 'Bluesky',
      href: '#', // Placeholder - update when social media URLs are available
      inactive: true,
    },
    {
      label: 'LINKEDIN',
      value: 'LinkedIn',
      href: 'https://linkedin.com',
      inactive: true,
    },
    {
      label: 'EMAIL',
      value: 'hello@creativecontext.studio',
      href: 'mailto:hello@creativecontext.studio',
    },
  ];

  return (
    <Panel variant="bordered" headerVariant="accent" title="DIRECT CONTACT" className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {channels.map((channel, index) => {
          const isInactive = channel.inactive || channel.href === '#';
          return (
            <motion.a
              key={channel.label}
              href={isInactive ? undefined : channel.href}
              target={!isInactive && channel.href.startsWith('http') ? '_blank' : undefined}
              rel={!isInactive && channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`block p-3 sm:p-4 border-2 transition-all duration-200 group ${
                isInactive
                  ? 'border-current/10 bg-current/5 opacity-50 cursor-not-allowed'
                  : 'border-current/20 hover:border-primary hover:bg-primary/10 hover:shadow-[2px_2px_0px_rgba(0,0,0,0.1)]'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isInactive ? 0.5 : 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={!isInactive ? { x: 2, y: -2 } : {}}
              onClick={isInactive ? (e) => e.preventDefault() : undefined}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-1 ${
                    isInactive ? 'text-secondary/50' : 'text-secondary'
                  }`}>
                    {channel.label}
                  </p>
                  <p className={`text-xs sm:text-sm font-mono font-semibold truncate ${
                    isInactive
                      ? 'text-text/40'
                      : 'text-text group-hover:text-primary transition-colors'
                  }`}>
                    {channel.value}
                  </p>
                </div>
                {!isInactive && (
                  <motion.span
                    className="text-xs font-mono uppercase tracking-wider text-secondary opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                    initial={{ x: -5 }}
                    whileHover={{ x: 0 }}
                  >
                    →
                  </motion.span>
                )}
              </div>
            </motion.a>
          );
        })}
      </div>
    </Panel>
  );
}

