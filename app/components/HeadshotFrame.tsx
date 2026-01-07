'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeadshotFrameProps {
  imageUrl?: string;
  className?: string;
}

export default function HeadshotFrame({
  imageUrl,
  className,
}: HeadshotFrameProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full aspect-square">
          <Image
            src={imageUrl}
            alt="Profile photo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
        </div>
      )}
    </motion.div>
  );
}

