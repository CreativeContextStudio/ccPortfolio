'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function MagneticCard({
  children,
  className,
  disabled = false,
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Check for prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || reducedMotion || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxRotate = 10; // max rotation in degrees

    setRotateX(-(y / rect.height) * maxRotate);
    setRotateY((x / rect.width) * maxRotate);
    setScale(1.05);
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (!reducedMotion) {
      setIsHovered(true);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: 'preserve-3d',
        transform: reducedMotion
          ? undefined
          : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: reducedMotion ? undefined : 'transform 0.2s ease-out',
      }}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}

