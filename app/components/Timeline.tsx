'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Panel } from './ui';
import { TimelineEvent } from '../data/about';

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export default function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={className}>
      <Panel variant="bordered" headerVariant="primary" title="TIMELINE">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-current/20" />

          <div className="space-y-8">
            {events.map((event, index) => (
              <TimelineEventItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

interface TimelineEventItemProps {
  event: TimelineEvent;
  index: number;
}

function TimelineEventItem({ event, index }: TimelineEventItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const typeColors = {
    education: 'bg-accent',
    work: 'bg-primary',
    project: 'bg-success',
    achievement: 'bg-warning',
  };

  return (
    <motion.div
      ref={ref}
      className="relative pl-12"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline Node */}
      <div className="absolute left-0 top-1">
        <div
          className={`w-8 h-8 rounded-full border-2 border-current ${typeColors[event.type]} flex items-center justify-center`}
        >
          <div className="w-3 h-3 rounded-full bg-background" />
        </div>
      </div>

      {/* Event Content */}
      <div className="border-l-2 border-current/20 pl-4 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-secondary">
            {event.date}
          </span>
          <span
            className={`text-xs font-mono uppercase tracking-wider px-2 py-0.5 border border-current ${
              typeColors[event.type]
            } text-background`}
          >
            {event.type.toUpperCase()}
          </span>
        </div>
        <h4 className="text-base font-bold uppercase tracking-wider text-text mb-1">
          {event.title}
        </h4>
        <p className="text-sm text-secondary font-mono leading-relaxed">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}

