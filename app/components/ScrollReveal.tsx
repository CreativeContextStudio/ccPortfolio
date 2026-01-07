'use client';

import { motion } from 'framer-motion';
import { useFadeInOnScroll, useSlideInOnScroll, useScaleInOnScroll } from '../hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = 'fade',
  delay = 0,
  threshold = 0.2,
  className,
}: ScrollRevealProps) {
  const fadeInProps = useFadeInOnScroll({ delay, threshold });
  const slideUpProps = useSlideInOnScroll('up', { threshold });
  const slideDownProps = useSlideInOnScroll('down', { threshold });
  const slideLeftProps = useSlideInOnScroll('left', { threshold });
  const slideRightProps = useSlideInOnScroll('right', { threshold });
  const scaleProps = useScaleInOnScroll({ threshold });

  const getAnimationProps = () => {
    switch (variant) {
      case 'fade':
        return fadeInProps;
      case 'slideUp':
        return slideUpProps;
      case 'slideDown':
        return slideDownProps;
      case 'slideLeft':
        return slideLeftProps;
      case 'slideRight':
        return slideRightProps;
      case 'scale':
        return scaleProps;
      default:
        return fadeInProps;
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div ref={animationProps.ref} initial={animationProps.initial} animate={animationProps.animate} transition={animationProps.transition} className={className}>
      {children}
    </motion.div>
  );
}

