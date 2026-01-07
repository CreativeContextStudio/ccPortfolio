'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui';

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className={`border-2 border-current/20 p-8 text-center ${className}`}>
        <p className="text-sm font-mono uppercase tracking-wider text-secondary">
          NO IMAGES AVAILABLE
        </p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`space-y-4 ${className}`} role="region" aria-label="Image gallery">
      {/* Main Image */}
      <div className="relative border-2 border-current/20 bg-muted/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative w-full aspect-video"
            initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? {} : { opacity: 0, x: -20 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            <Image
              src={images[currentIndex]}
              alt={`Project image ${currentIndex + 1} of ${images.length}`}
              fill
              className="object-contain"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              id="gallery-main-image"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  prevImage();
                }
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90 border-2 border-current p-2 hover:bg-primary hover:text-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              aria-label={`Previous image, currently showing image ${currentIndex + 1} of ${images.length}`}
              aria-controls="gallery-main-image"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  nextImage();
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90 border-2 border-current p-2 hover:bg-primary hover:text-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              aria-label={`Next image, currently showing image ${currentIndex + 1} of ${images.length}`}
              aria-controls="gallery-main-image"
            >
              →
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div
            className="absolute bottom-2 right-2 bg-background/90 border-2 border-current px-2 py-1"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-text">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label="Image thumbnails"
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentIndex(index);
                }
              }}
              className={`flex-shrink-0 border-2 ${
                index === currentIndex
                  ? 'border-primary'
                  : 'border-current/20 hover:border-current/40'
              } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors`}
              aria-label={`View image ${index + 1} of ${images.length}`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-controls="gallery-main-image"
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

