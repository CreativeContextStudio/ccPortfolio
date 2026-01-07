'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TextDecoderProps {
  text: string;
  className?: string;
  onDecodeComplete?: () => void; // Callback when decoding finishes
  shouldDecode?: boolean; // Control whether to start decoding
  autoStart?: boolean; // Auto-start decoding on mount (default true)
}

export default function TextDecoder({ 
  text, 
  className,
  onDecodeComplete,
  shouldDecode = false,
  autoStart = true,
}: TextDecoderProps) {
  const [decodedText, setDecodedText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);
  const decodingRef = useRef<{ currentIndex: number; intervalId: NodeJS.Timeout | null }>({
    currentIndex: 0,
    intervalId: null,
  });
  const onDecodeCompleteRef = useRef(onDecodeComplete);
  
  // Keep callback ref updated
  useEffect(() => {
    onDecodeCompleteRef.current = onDecodeComplete;
  }, [onDecodeComplete]);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  // Reset when text changes
  useEffect(() => {
    // Clear any ongoing decoding
    if (decodingRef.current.intervalId) {
      clearInterval(decodingRef.current.intervalId);
      decodingRef.current.intervalId = null;
    }
    setIsDecoding(false);
    setDecodedText(text); // Always show the full text when text changes
    decodingRef.current.currentIndex = 0;
  }, [text]);

  // Handle controlled decoding start
  useEffect(() => {
    const shouldStartDecoding = shouldDecode !== undefined ? shouldDecode : autoStart;
    
    if (shouldStartDecoding && !isDecoding) {
      // Only start if not already decoding
      setIsDecoding(true);
      setDecodedText(''); // Clear to start decoding
      decodingRef.current.currentIndex = 0;
    } else if (!shouldStartDecoding && isDecoding) {
      // Stop decoding and show full text
      if (decodingRef.current.intervalId) {
        clearInterval(decodingRef.current.intervalId);
        decodingRef.current.intervalId = null;
      }
      setIsDecoding(false);
      setDecodedText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldDecode, autoStart]);

  // Decoding animation
  useEffect(() => {
    if (!isDecoding) {
      // Ensure we show full text when not decoding
      setDecodedText(text);
      return;
    }

    const targetText = text;
    decodingRef.current.currentIndex = 0;

    const interval = setInterval(() => {
      const currentIndex = decodingRef.current.currentIndex;
      
      if (currentIndex < targetText.length) {
        // Show random characters for decoding effect
        const randomChars = Array(targetText.length)
          .fill(0)
          .map(() => characters[Math.floor(Math.random() * characters.length)])
          .join('');

        // Gradually reveal the actual text
        const revealed = targetText
          .split('')
          .map((char, i) => (i <= currentIndex ? char : randomChars[i]))
          .join('');

        setDecodedText(revealed);
        decodingRef.current.currentIndex += 0.3;
      } else {
        // Decoding complete - stick with the final text permanently
        setDecodedText(targetText);
        setIsDecoding(false);
        clearInterval(interval);
        decodingRef.current.intervalId = null;
        
        // Call completion callback
        if (onDecodeCompleteRef.current) {
          setTimeout(() => {
            onDecodeCompleteRef.current?.();
          }, 300);
        }
      }
    }, 50);

    decodingRef.current.intervalId = interval;

    return () => {
      if (interval) {
        clearInterval(interval);
        decodingRef.current.intervalId = null;
      }
    };
  }, [isDecoding, text]);

  // Always show the decoded text (or full text if not decoding)
  const displayText = decodedText || text;

  return (
    <motion.span
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
      {isDecoding && (
        <motion.span
          className="inline-block w-2 h-4 bg-primary ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.span>
  );
}

