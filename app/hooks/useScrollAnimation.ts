'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useScroll, useTransform, MotionValue } from 'framer-motion';

// Check for prefers-reduced-motion
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

// Scroll-triggered animation using Intersection Observer
export function useScrollTrigger(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Build options object only with provided values
  const viewOptions: Parameters<typeof useInView>[1] = {
    once: options?.once ?? true,
  };
  
  // Type-safe option assignment
  if (options?.rootMargin) {
    Object.assign(viewOptions, { margin: options.rootMargin });
  }
  
  if (options?.threshold !== undefined) {
    Object.assign(viewOptions, { amount: options.threshold });
  }
  
  const isInView = useInView(ref, viewOptions);

  return { ref, isInView };
}

// Parallax scroll effect
export function useParallaxScroll(
  containerRef: React.RefObject<HTMLElement>,
  speed: number = 0.5
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  return y;
}

// Fade in on scroll
export function useFadeInOnScroll(options?: {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}) {
  const { ref, isInView } = useScrollTrigger({
    threshold: options?.threshold ?? 0.2,
    rootMargin: options?.rootMargin ?? '-50px',
    once: true,
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  return {
    ref,
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: isInView
      ? { opacity: 1, y: 0 }
      : prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 20 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.6,
      delay: options?.delay ?? 0,
      ease: [0.43, 0.13, 0.23, 0.96] as const, // easeOut curve
    },
  };
}

// Slide in from direction
export function useSlideInOnScroll(
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  options?: {
    threshold?: number;
    rootMargin?: string;
    distance?: number;
  }
) {
  const { ref, isInView } = useScrollTrigger({
    threshold: options?.threshold ?? 0.2,
    rootMargin: options?.rootMargin ?? '-50px',
    once: true,
  });

  const prefersReducedMotion = usePrefersReducedMotion();
  const distance = options?.distance ?? 50;

  const getInitialValue = () => {
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0 };
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -distance, y: 0 };
      case 'right':
        return { opacity: 0, x: distance, y: 0 };
      case 'up':
        return { opacity: 0, x: 0, y: distance };
      case 'down':
        return { opacity: 0, x: 0, y: -distance };
      default:
        return { opacity: 0, x: 0, y: distance };
    }
  };

  const getAnimateValue = () => {
    if (prefersReducedMotion || isInView) {
      return { opacity: 1, x: 0, y: 0 };
    }
    return getInitialValue();
  };

  return {
    ref,
    initial: getInitialValue(),
    animate: getAnimateValue(),
    transition: {
      duration: prefersReducedMotion ? 0 : 0.6,
      ease: [0.43, 0.13, 0.23, 0.96] as const, // easeOut curve
    },
  };
}

// Scale in on scroll
export function useScaleInOnScroll(options?: {
  threshold?: number;
  rootMargin?: string;
  minScale?: number;
}) {
  const { ref, isInView } = useScrollTrigger({
    threshold: options?.threshold ?? 0.2,
    rootMargin: options?.rootMargin ?? '-50px',
    once: true,
  });

  const prefersReducedMotion = usePrefersReducedMotion();
  const minScale = options?.minScale ?? 0.8;

  return {
    ref,
    initial: prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: minScale, opacity: 0 },
    animate: isInView
      ? { scale: 1, opacity: 1 }
      : prefersReducedMotion
      ? { scale: 1, opacity: 1 }
      : { scale: minScale, opacity: 0 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.5,
      ease: [0.43, 0.13, 0.23, 0.96] as const, // easeOut curve
    },
  };
}

