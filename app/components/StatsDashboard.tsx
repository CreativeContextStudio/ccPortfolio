'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Panel } from './ui';
import { useCountUp } from '../hooks/useCountUp';
import { useParallax } from '../hooks/useParallax';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  description?: string;
}

interface StatsDashboardProps {
  stats: Stat[];
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const parallaxOffset = useParallax(0.1);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-2xl font-bold uppercase tracking-wider text-text text-center">
        OPERATIONAL STATISTICS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={index}
            shouldAnimate={hasAnimated}
            parallaxOffset={parallaxOffset}
          />
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  stat: Stat;
  index: number;
  shouldAnimate: boolean;
  parallaxOffset: number;
}

function StatCard({ stat, index, shouldAnimate, parallaxOffset }: StatCardProps) {
  const { count } = useCountUp({
    end: stat.value,
    enabled: shouldAnimate,
    duration: 2000,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: shouldAnimate ? 1 : 0,
        y: shouldAnimate ? parallaxOffset * (index % 2 === 0 ? 1 : -1) : 20,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      <Panel
        variant="bordered"
        headerVariant="accent"
        title={stat.label}
        className="h-full"
      >
        <div className="text-center">
          <motion.div
            className="text-3xl font-bold text-primary mb-2"
            key={count}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {count}
            {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
          </motion.div>
          {stat.description && (
            <p className="text-xs text-secondary font-mono uppercase tracking-wider">
              {stat.description}
            </p>
          )}
        </div>
      </Panel>
    </motion.div>
  );
}

