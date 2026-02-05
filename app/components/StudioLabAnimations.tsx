'use client';

import React from 'react';

interface AnimationProps {
  className?: string;
}

/**
 * BartenderFriendAnimation - Minimalist martini glass with animated liquid wave and rising bubbles
 */
export function BartenderFriendAnimation({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 96 64"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Martini glass outline */}
      <path
        d="M28 12 L68 12 L50 44 L50 54 L40 54 L40 56 L60 56 L60 58 L36 58 L36 56 L46 56 L46 54 L46 44 L28 12 Z"
        fill="none"
        stroke="var(--theme-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Liquid fill with wave animation */}
      <g className="liquid-wave-group">
        <path
          d="M34 20 Q42 22 50 20 Q58 18 62 20 L54 36 L46 36 Z"
          fill="var(--theme-accent)"
          opacity="0.7"
          style={{
            animation: 'liquid-wave 2s ease-in-out infinite',
          }}
        />
      </g>

      {/* Bubbles */}
      <circle
        cx="44"
        cy="30"
        r="1.5"
        fill="var(--theme-background)"
        opacity="0.8"
        style={{
          animation: 'bubble-rise 2s ease-out infinite',
        }}
      />
      <circle
        cx="52"
        cy="32"
        r="1"
        fill="var(--theme-background)"
        opacity="0.6"
        style={{
          animation: 'bubble-rise 2.5s ease-out infinite 0.5s',
        }}
      />
      <circle
        cx="48"
        cy="28"
        r="1.2"
        fill="var(--theme-background)"
        opacity="0.7"
        style={{
          animation: 'bubble-rise 1.8s ease-out infinite 1s',
        }}
      />

      {/* Olive on pick */}
      <line
        x1="56"
        y1="8"
        x2="42"
        y2="22"
        stroke="var(--theme-primary)"
        strokeWidth="1.5"
      />
      <circle
        cx="44"
        cy="18"
        r="4"
        fill="var(--theme-success)"
        stroke="var(--theme-primary)"
        strokeWidth="1"
      />
      <circle
        cx="44"
        cy="18"
        r="1.5"
        fill="var(--theme-warning)"
      />

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .liquid-wave-group path,
          circle {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * ContentCreatorAnimation - Monitor frame with cycling color bars and pulsing broadcast signal
 */
export function ContentCreatorAnimation({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 96 64"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Monitor frame with glow */}
      <rect
        x="8"
        y="6"
        width="80"
        height="48"
        rx="2"
        fill="none"
        stroke="var(--theme-primary)"
        strokeWidth="2"
        style={{
          filter: 'drop-shadow(0 0 3px var(--theme-primary))',
        }}
      />

      {/* Inner screen */}
      <rect
        x="12"
        y="10"
        width="72"
        height="40"
        fill="var(--theme-background)"
        opacity="0.3"
      />

      {/* Color bars container with clip */}
      <defs>
        <clipPath id="screen-clip">
          <rect x="12" y="10" width="72" height="40" />
        </clipPath>
      </defs>

      <g clipPath="url(#screen-clip)">
        {/* Animated color bars */}
        <g
          style={{
            animation: 'color-bars-shift 3s linear infinite',
          }}
        >
          <rect x="12" y="10" width="18" height="40" fill="var(--theme-primary)" opacity="0.8" />
          <rect x="30" y="10" width="18" height="40" fill="var(--theme-accent)" opacity="0.8" />
          <rect x="48" y="10" width="18" height="40" fill="var(--theme-secondary)" opacity="0.6" />
          <rect x="66" y="10" width="18" height="40" fill="var(--theme-primary)" opacity="0.8" />
          <rect x="84" y="10" width="18" height="40" fill="var(--theme-accent)" opacity="0.8" />
          <rect x="102" y="10" width="18" height="40" fill="var(--theme-secondary)" opacity="0.6" />
        </g>
      </g>

      {/* Play triangle in center */}
      <polygon
        points="42,25 42,39 56,32"
        fill="var(--theme-background)"
        stroke="var(--theme-text)"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Broadcast signal indicator - concentric circles */}
      <g style={{ transformOrigin: '78px 16px' }}>
        <circle
          cx="78"
          cy="16"
          r="3"
          fill="var(--theme-warning)"
          style={{
            animation: 'signal-pulse 1.5s ease-out infinite',
          }}
        />
        <circle
          cx="78"
          cy="16"
          r="5"
          fill="none"
          stroke="var(--theme-warning)"
          strokeWidth="1"
          opacity="0.6"
          style={{
            animation: 'signal-pulse 1.5s ease-out infinite 0.3s',
          }}
        />
        <circle
          cx="78"
          cy="16"
          r="7"
          fill="none"
          stroke="var(--theme-warning)"
          strokeWidth="1"
          opacity="0.3"
          style={{
            animation: 'signal-pulse 1.5s ease-out infinite 0.6s',
          }}
        />
      </g>

      {/* Monitor stand */}
      <rect
        x="40"
        y="54"
        width="16"
        height="4"
        fill="var(--theme-primary)"
      />
      <rect
        x="32"
        y="58"
        width="32"
        height="2"
        fill="var(--theme-primary)"
      />

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          g[style*="color-bars-shift"],
          circle[style*="signal-pulse"] {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * ContentCreatorThemeCarousel - Sliding design theme cards representing 25+ themes
 */
export function ContentCreatorThemeCarousel({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 300 192"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background grid */}
      <defs>
        <pattern id="detail-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--theme-secondary)" strokeWidth="0.5" opacity="0.2" />
        </pattern>
        <clipPath id="carousel-clip">
          <rect x="20" y="30" width="260" height="132" />
        </clipPath>
      </defs>
      <rect width="300" height="192" fill="url(#detail-grid)" />

      {/* Section label */}
      <text x="20" y="20" fontSize="10" fontFamily="monospace" fill="var(--theme-secondary)" opacity="0.7">
        THEME LIBRARY ▸ 25+ PRESETS
      </text>

      {/* Carousel container */}
      <g clipPath="url(#carousel-clip)">
        {/* Animated theme cards - doubled for seamless loop */}
        <g className="carousel-cards" style={{ animation: 'carousel-slide 12s linear infinite' }}>
          {/* First set of cards */}
          <rect x="30" y="45" width="55" height="100" fill="var(--theme-primary)" opacity="0.9" rx="2" />
          <rect x="35" y="55" width="45" height="8" fill="var(--theme-background)" opacity="0.8" />
          <rect x="35" y="68" width="30" height="4" fill="var(--theme-background)" opacity="0.5" />
          <rect x="35" y="115" width="45" height="20" fill="var(--theme-accent)" opacity="0.7" />

          <rect x="95" y="45" width="55" height="100" fill="var(--theme-accent)" opacity="0.9" rx="2" />
          <rect x="100" y="55" width="45" height="8" fill="var(--theme-background)" opacity="0.8" />
          <rect x="100" y="68" width="30" height="4" fill="var(--theme-background)" opacity="0.5" />
          <rect x="100" y="115" width="45" height="20" fill="var(--theme-primary)" opacity="0.7" />

          <rect x="160" y="45" width="55" height="100" fill="var(--theme-secondary)" opacity="0.7" rx="2" />
          <rect x="165" y="55" width="45" height="8" fill="var(--theme-background)" opacity="0.8" />
          <rect x="165" y="68" width="30" height="4" fill="var(--theme-background)" opacity="0.5" />
          <rect x="165" y="115" width="45" height="20" fill="var(--theme-warning)" opacity="0.7" />

          <rect x="225" y="45" width="55" height="100" fill="var(--theme-success)" opacity="0.8" rx="2" />
          <rect x="230" y="55" width="45" height="8" fill="var(--theme-background)" opacity="0.8" />
          <rect x="230" y="68" width="30" height="4" fill="var(--theme-background)" opacity="0.5" />
          <rect x="230" y="115" width="45" height="20" fill="var(--theme-text)" opacity="0.3" />

          {/* Second set (duplicate for seamless loop) */}
          <rect x="290" y="45" width="55" height="100" fill="var(--theme-primary)" opacity="0.9" rx="2" />
          <rect x="295" y="55" width="45" height="8" fill="var(--theme-background)" opacity="0.8" />
          <rect x="295" y="68" width="30" height="4" fill="var(--theme-background)" opacity="0.5" />
          <rect x="295" y="115" width="45" height="20" fill="var(--theme-accent)" opacity="0.7" />

          <rect x="355" y="45" width="55" height="100" fill="var(--theme-accent)" opacity="0.9" rx="2" />
          <rect x="360" y="55" width="45" height="8" fill="var(--theme-background)" opacity="0.8" />
          <rect x="360" y="68" width="30" height="4" fill="var(--theme-background)" opacity="0.5" />
          <rect x="360" y="115" width="45" height="20" fill="var(--theme-primary)" opacity="0.7" />

          <rect x="420" y="45" width="55" height="100" fill="var(--theme-secondary)" opacity="0.7" rx="2" />
          <rect x="425" y="55" width="45" height="8" fill="var(--theme-background)" opacity="0.8" />
          <rect x="425" y="68" width="30" height="4" fill="var(--theme-background)" opacity="0.5" />
          <rect x="425" y="115" width="45" height="20" fill="var(--theme-warning)" opacity="0.7" />

          <rect x="485" y="45" width="55" height="100" fill="var(--theme-success)" opacity="0.8" rx="2" />
          <rect x="490" y="55" width="45" height="8" fill="var(--theme-background)" opacity="0.8" />
          <rect x="490" y="68" width="30" height="4" fill="var(--theme-background)" opacity="0.5" />
          <rect x="490" y="115" width="45" height="20" fill="var(--theme-text)" opacity="0.3" />
        </g>
      </g>

      {/* Edge fade overlays */}
      <defs>
        <linearGradient id="fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--theme-background)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--theme-background)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--theme-background)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--theme-background)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect x="20" y="30" width="30" height="132" fill="url(#fade-left)" />
      <rect x="250" y="30" width="30" height="132" fill="url(#fade-right)" />

      {/* Frame border */}
      <rect x="20" y="30" width="260" height="132" fill="none" stroke="var(--theme-primary)" strokeWidth="2" />

      {/* Footer indicator */}
      <text x="150" y="180" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">
        ◂ AUTO-SCROLL ▸
      </text>

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .carousel-cards {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * ContentCreatorTimeline - Animation timeline with moving playhead and keyframes
 */
export function ContentCreatorTimeline({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 300 192"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background grid */}
      <defs>
        <pattern id="timeline-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--theme-secondary)" strokeWidth="0.5" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="300" height="192" fill="url(#timeline-grid)" />

      {/* Section label */}
      <text x="20" y="20" fontSize="10" fontFamily="monospace" fill="var(--theme-secondary)" opacity="0.7">
        ANIMATION PRESETS ▸ 50+ EFFECTS
      </text>

      {/* Timeline tracks */}
      {/* Track 1 - Opacity */}
      <text x="20" y="50" fontSize="8" fontFamily="monospace" fill="var(--theme-text)" opacity="0.5">OPACITY</text>
      <rect x="70" y="42" width="210" height="16" fill="var(--theme-muted)" opacity="0.3" rx="2" />
      <rect x="70" y="42" width="210" height="16" fill="none" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.3" rx="2" />
      {/* Keyframe dots */}
      <circle cx="85" cy="50" r="4" fill="var(--theme-primary)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite' }} />
      <circle cx="140" cy="50" r="4" fill="var(--theme-primary)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.3s' }} />
      <circle cx="200" cy="50" r="4" fill="var(--theme-primary)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.6s' }} />
      <circle cx="265" cy="50" r="4" fill="var(--theme-primary)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.9s' }} />

      {/* Track 2 - Position */}
      <text x="20" y="80" fontSize="8" fontFamily="monospace" fill="var(--theme-text)" opacity="0.5">POSITION</text>
      <rect x="70" y="72" width="210" height="16" fill="var(--theme-muted)" opacity="0.3" rx="2" />
      <rect x="70" y="72" width="210" height="16" fill="none" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.3" rx="2" />
      {/* Waveform */}
      <path d="M 75 80 Q 95 70 115 80 T 155 80 T 195 80 T 235 80 T 275 80" fill="none" stroke="var(--theme-accent)" strokeWidth="2" opacity="0.7" />
      <circle cx="115" cy="80" r="4" fill="var(--theme-accent)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.2s' }} />
      <circle cx="195" cy="80" r="4" fill="var(--theme-accent)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.5s' }} />

      {/* Track 3 - Scale */}
      <text x="20" y="110" fontSize="8" fontFamily="monospace" fill="var(--theme-text)" opacity="0.5">SCALE</text>
      <rect x="70" y="102" width="210" height="16" fill="var(--theme-muted)" opacity="0.3" rx="2" />
      <rect x="70" y="102" width="210" height="16" fill="none" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.3" rx="2" />
      <circle cx="100" cy="110" r="4" fill="var(--theme-success)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.4s' }} />
      <circle cx="175" cy="110" r="4" fill="var(--theme-success)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.7s' }} />
      <circle cx="250" cy="110" r="4" fill="var(--theme-success)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 1s' }} />

      {/* Track 4 - Rotation */}
      <text x="20" y="140" fontSize="8" fontFamily="monospace" fill="var(--theme-text)" opacity="0.5">ROTATION</text>
      <rect x="70" y="132" width="210" height="16" fill="var(--theme-muted)" opacity="0.3" rx="2" />
      <rect x="70" y="132" width="210" height="16" fill="none" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.3" rx="2" />
      <circle cx="130" cy="140" r="4" fill="var(--theme-warning)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.1s' }} />
      <circle cx="220" cy="140" r="4" fill="var(--theme-warning)" style={{ animation: 'keyframe-pulse 2s ease-in-out infinite 0.8s' }} />

      {/* Playhead */}
      <g className="playhead" style={{ animation: 'playhead-move 4s linear infinite' }}>
        <line x1="70" y1="35" x2="70" y2="155" stroke="var(--theme-primary)" strokeWidth="2" />
        <polygon points="65,35 75,35 70,28" fill="var(--theme-primary)" />
      </g>

      {/* Time markers */}
      <text x="70" y="170" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">0:00</text>
      <text x="175" y="170" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">0:15</text>
      <text x="280" y="170" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">0:30</text>

      {/* Duration bar */}
      <rect x="70" y="175" width="210" height="4" fill="var(--theme-muted)" opacity="0.3" rx="2" />
      <rect x="70" y="175" width="210" height="4" fill="none" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.3" rx="2" />

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .playhead,
          circle[style*="keyframe-pulse"] {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * ContentManagementLifecycle - Episode production pipeline flow
 */
export function ContentManagementLifecycle({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 300 192"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background grid */}
      <defs>
        <pattern id="lifecycle-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--theme-secondary)" strokeWidth="0.5" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="300" height="192" fill="url(#lifecycle-grid)" />

      {/* Section label */}
      <text x="20" y="20" fontSize="10" fontFamily="monospace" fill="var(--theme-secondary)" opacity="0.7">
        EPISODE LIFECYCLE TRACKING
      </text>

      {/* Connection lines */}
      <line x1="70" y1="80" x2="115" y2="80" stroke="var(--theme-secondary)" strokeWidth="2" strokeDasharray="4 2" style={{ animation: 'data-flow 1s linear infinite' }} />
      <line x1="135" y1="80" x2="180" y2="80" stroke="var(--theme-secondary)" strokeWidth="2" strokeDasharray="4 2" style={{ animation: 'data-flow 1s linear infinite 0.25s' }} />
      <line x1="200" y1="80" x2="245" y2="80" stroke="var(--theme-secondary)" strokeWidth="2" strokeDasharray="4 2" style={{ animation: 'data-flow 1s linear infinite 0.5s' }} />

      {/* Stage 1 - PRE */}
      <rect x="20" y="55" width="50" height="50" fill="var(--theme-background)" stroke="var(--theme-primary)" strokeWidth="2" rx="4" />
      <rect x="20" y="55" width="50" height="50" fill="var(--theme-primary)" opacity="0.1" rx="4" className="stage-bg" style={{ animation: 'stage-active 3s ease-in-out infinite' }} />
      <text x="45" y="85" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-primary)">PRE</text>
      <text x="45" y="120" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.7">PLANNING</text>

      {/* Stage 2 - PROD */}
      <rect x="115" y="55" width="50" height="50" fill="var(--theme-background)" stroke="var(--theme-accent)" strokeWidth="2" rx="4" />
      <rect x="115" y="55" width="50" height="50" fill="var(--theme-accent)" opacity="0.1" rx="4" className="stage-bg" style={{ animation: 'stage-active 3s ease-in-out infinite 0.75s' }} />
      <text x="140" y="85" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-accent)">PROD</text>
      <text x="140" y="120" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.7">FILMING</text>

      {/* Stage 3 - POST */}
      <rect x="195" y="55" width="50" height="50" fill="var(--theme-background)" stroke="var(--theme-warning)" strokeWidth="2" rx="4" />
      <rect x="195" y="55" width="50" height="50" fill="var(--theme-warning)" opacity="0.1" rx="4" className="stage-bg" style={{ animation: 'stage-active 3s ease-in-out infinite 1.5s' }} />
      <text x="220" y="85" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-warning)">POST</text>
      <text x="220" y="120" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.7">EDITING</text>

      {/* Stage 4 - DIST */}
      <rect x="260" y="55" width="30" height="50" fill="var(--theme-background)" stroke="var(--theme-success)" strokeWidth="2" rx="4" />
      <rect x="260" y="55" width="30" height="50" fill="var(--theme-success)" opacity="0.1" rx="4" className="stage-bg" style={{ animation: 'stage-active 3s ease-in-out infinite 2.25s' }} />
      <text x="275" y="85" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-success)">DIST</text>
      <text x="275" y="120" fontSize="6" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.7">PUBLISH</text>

      {/* Flow particles */}
      <circle r="3" fill="var(--theme-primary)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 45 80 L 140 80 L 220 80 L 275 80" begin="0s" />
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="var(--theme-accent)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 45 80 L 140 80 L 220 80 L 275 80" begin="1s" />
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
      </circle>
      <circle r="3" fill="var(--theme-warning)">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 45 80 L 140 80 L 220 80 L 275 80" begin="2s" />
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="2s" />
      </circle>

      {/* Progress indicators */}
      <text x="20" y="150" fontSize="8" fontFamily="monospace" fill="var(--theme-text)" opacity="0.6">EPISODES IN PIPELINE:</text>
      <rect x="20" y="158" width="260" height="8" fill="var(--theme-muted)" opacity="0.3" rx="2" />
      <rect x="20" y="158" width="65" height="8" fill="var(--theme-primary)" opacity="0.8" rx="2" />
      <rect x="85" y="158" width="85" height="8" fill="var(--theme-accent)" opacity="0.8" rx="2" />
      <rect x="170" y="158" width="60" height="8" fill="var(--theme-warning)" opacity="0.8" rx="2" />
      <rect x="230" y="158" width="50" height="8" fill="var(--theme-success)" opacity="0.8" rx="2" />

      {/* Status counts */}
      <text x="50" y="180" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">12</text>
      <text x="127" y="180" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">18</text>
      <text x="200" y="180" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">9</text>
      <text x="255" y="180" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">7</text>

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .stage-bg,
          line[style*="data-flow"],
          circle animateMotion,
          circle animate {
            animation: none !important;
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * ContentManagementCollab - Real-time collaboration visualization
 */
export function ContentManagementCollab({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 300 192"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Background grid */}
      <defs>
        <pattern id="collab-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--theme-secondary)" strokeWidth="0.5" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="300" height="192" fill="url(#collab-grid)" />

      {/* Section label */}
      <text x="20" y="20" fontSize="10" fontFamily="monospace" fill="var(--theme-secondary)" opacity="0.7">
        REAL-TIME COLLABORATION
      </text>

      {/* Connection lines between users */}
      <line x1="75" y1="70" x2="150" y2="96" stroke="var(--theme-secondary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <line x1="225" y1="70" x2="150" y2="96" stroke="var(--theme-secondary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <line x1="75" y1="140" x2="150" y2="96" stroke="var(--theme-secondary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <line x1="225" y1="140" x2="150" y2="96" stroke="var(--theme-secondary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
      <line x1="75" y1="70" x2="75" y2="140" stroke="var(--theme-secondary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />
      <line x1="225" y1="70" x2="225" y2="140" stroke="var(--theme-secondary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />

      {/* User 1 - Top Left (Producer) */}
      <circle cx="75" cy="70" r="20" fill="var(--theme-background)" stroke="var(--theme-primary)" strokeWidth="2" />
      <text x="75" y="75" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-primary)">JD</text>
      <circle cx="90" cy="55" r="6" fill="var(--theme-success)" stroke="var(--theme-background)" strokeWidth="2" />
      {/* Typing indicator */}
      <g style={{ animation: 'typing-indicator 1s ease-in-out infinite' }}>
        <circle cx="60" cy="90" r="2" fill="var(--theme-primary)" opacity="0.7" />
        <circle cx="68" cy="90" r="2" fill="var(--theme-primary)" opacity="0.7" />
        <circle cx="76" cy="90" r="2" fill="var(--theme-primary)" opacity="0.7" />
      </g>
      <text x="75" y="48" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">PRODUCER</text>

      {/* User 2 - Top Right (Editor) */}
      <circle cx="225" cy="70" r="20" fill="var(--theme-background)" stroke="var(--theme-accent)" strokeWidth="2" />
      <text x="225" y="75" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-accent)">MK</text>
      <circle cx="240" cy="55" r="6" fill="var(--theme-success)" stroke="var(--theme-background)" strokeWidth="2" />
      <text x="225" y="48" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">EDITOR</text>

      {/* User 3 - Bottom Left (Writer) */}
      <circle cx="75" cy="140" r="20" fill="var(--theme-background)" stroke="var(--theme-warning)" strokeWidth="2" />
      <text x="75" y="145" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-warning)">AL</text>
      <circle cx="90" cy="125" r="6" fill="var(--theme-warning)" stroke="var(--theme-background)" strokeWidth="2" />
      <text x="75" y="165" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">WRITER</text>

      {/* User 4 - Bottom Right (Director) */}
      <circle cx="225" cy="140" r="20" fill="var(--theme-background)" stroke="var(--theme-success)" strokeWidth="2" />
      <text x="225" y="145" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-success)">RH</text>
      <circle cx="240" cy="125" r="6" fill="var(--theme-success)" stroke="var(--theme-background)" strokeWidth="2" />
      {/* Typing indicator */}
      <g style={{ animation: 'typing-indicator 1s ease-in-out infinite 0.5s' }}>
        <circle cx="210" cy="160" r="2" fill="var(--theme-success)" opacity="0.7" />
        <circle cx="218" cy="160" r="2" fill="var(--theme-success)" opacity="0.7" />
        <circle cx="226" cy="160" r="2" fill="var(--theme-success)" opacity="0.7" />
      </g>
      <text x="225" y="165" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.6">DIRECTOR</text>

      {/* Central document/project icon */}
      <rect x="130" y="76" width="40" height="40" fill="var(--theme-background)" stroke="var(--theme-text)" strokeWidth="2" rx="4" />
      <line x1="138" y1="88" x2="162" y2="88" stroke="var(--theme-secondary)" strokeWidth="2" />
      <line x1="138" y1="96" x2="158" y2="96" stroke="var(--theme-secondary)" strokeWidth="2" opacity="0.7" />
      <line x1="138" y1="104" x2="155" y2="104" stroke="var(--theme-secondary)" strokeWidth="2" opacity="0.5" />

      {/* Moving cursor 1 */}
      <g style={{ animation: 'cursor-move 4s ease-in-out infinite' }}>
        <path d="M 145 85 L 145 95 L 150 92 Z" fill="var(--theme-primary)" />
      </g>

      {/* Moving cursor 2 */}
      <g style={{ animation: 'cursor-move 4s ease-in-out infinite 2s' }}>
        <path d="M 155 90 L 155 100 L 160 97 Z" fill="var(--theme-accent)" />
      </g>

      {/* Activity feed */}
      <text x="110" y="140" fontSize="6" fontFamily="monospace" fill="var(--theme-secondary)" opacity="0.5">LIVE ACTIVITY</text>
      <rect x="110" y="145" width="80" height="35" fill="var(--theme-muted)" opacity="0.2" rx="2" />
      <text x="115" y="156" fontSize="6" fontFamily="monospace" fill="var(--theme-success)">● JD updated script</text>
      <text x="115" y="166" fontSize="6" fontFamily="monospace" fill="var(--theme-accent)">● MK added comment</text>
      <text x="115" y="176" fontSize="6" fontFamily="monospace" fill="var(--theme-primary)">● RH approved cut</text>

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          g[style*="typing-indicator"],
          g[style*="cursor-move"] {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * MotionTrackingAnimation - Motion tracking visualization with crosshairs and trail
 */
export function MotionTrackingAnimation({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 96 64"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Grid background */}
      <defs>
        <pattern id="track-grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="var(--theme-secondary)" strokeWidth="0.3" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="96" height="64" fill="url(#track-grid)" />

      {/* Motion path (bezier curve) */}
      <path
        d="M 20 45 Q 35 20 48 32 Q 61 44 76 25"
        fill="none"
        stroke="var(--theme-accent)"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity="0.5"
      />

      {/* Trail dots */}
      <circle cx="28" cy="35" r="2" fill="var(--theme-primary)" opacity="0.2" />
      <circle cx="38" cy="26" r="2" fill="var(--theme-primary)" opacity="0.3" />
      <circle cx="48" cy="32" r="2" fill="var(--theme-primary)" opacity="0.4" />
      <circle cx="58" cy="36" r="2" fill="var(--theme-primary)" opacity="0.5" />
      <circle cx="68" cy="28" r="2" fill="var(--theme-primary)" opacity="0.6" />

      {/* Animated tracking point with crosshair */}
      <g className="tracking-point" style={{ animation: 'track-point 4s ease-in-out infinite' }}>
        {/* Crosshair */}
        <line x1="20" y1="40" x2="20" y2="50" stroke="var(--theme-primary)" strokeWidth="1.5" />
        <line x1="15" y1="45" x2="25" y2="45" stroke="var(--theme-primary)" strokeWidth="1.5" />
        {/* Outer ring */}
        <circle
          cx="20"
          cy="45"
          r="6"
          fill="none"
          stroke="var(--theme-primary)"
          strokeWidth="1.5"
          style={{ animation: 'crosshair-pulse 1.5s ease-in-out infinite' }}
        />
        {/* Center dot */}
        <circle cx="20" cy="45" r="2" fill="var(--theme-primary)" />
      </g>

      {/* Corner tracking markers */}
      <g opacity="0.4">
        <path d="M 8 8 L 8 14 M 8 8 L 14 8" stroke="var(--theme-secondary)" strokeWidth="1" />
        <path d="M 88 8 L 88 14 M 88 8 L 82 8" stroke="var(--theme-secondary)" strokeWidth="1" />
        <path d="M 8 56 L 8 50 M 8 56 L 14 56" stroke="var(--theme-secondary)" strokeWidth="1" />
        <path d="M 88 56 L 88 50 M 88 56 L 82 56" stroke="var(--theme-secondary)" strokeWidth="1" />
      </g>

      {/* Data readout */}
      <text x="72" y="58" fontSize="5" fontFamily="monospace" fill="var(--theme-secondary)" opacity="0.6">
        TRACKING
      </text>

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .tracking-point,
          circle[style*="crosshair-pulse"] {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * WebGLExperimentsAnimation - 3D wireframe cube with floating particles
 */
export function WebGLExperimentsAnimation({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 96 64"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Depth grid */}
      <defs>
        <linearGradient id="depth-fade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--theme-secondary)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--theme-secondary)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="96" height="64" fill="url(#depth-fade)" />

      {/* Wireframe cube - isometric view with rotation */}
      <g style={{ transformOrigin: '48px 32px', animation: 'wireframe-rotate 8s linear infinite' }}>
        {/* Back face */}
        <path
          d="M 33 22 L 53 22 L 53 42 L 33 42 Z"
          fill="none"
          stroke="var(--theme-accent)"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Front face */}
        <path
          d="M 43 27 L 63 27 L 63 47 L 43 47 Z"
          fill="none"
          stroke="var(--theme-primary)"
          strokeWidth="1.5"
        />
        {/* Connecting edges */}
        <line x1="33" y1="22" x2="43" y2="27" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.6" />
        <line x1="53" y1="22" x2="63" y2="27" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.6" />
        <line x1="33" y1="42" x2="43" y2="47" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.6" />
        <line x1="53" y1="42" x2="63" y2="47" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.6" />
        {/* Vertices */}
        <circle cx="43" cy="27" r="2" fill="var(--theme-primary)" />
        <circle cx="63" cy="27" r="2" fill="var(--theme-primary)" />
        <circle cx="43" cy="47" r="2" fill="var(--theme-primary)" />
        <circle cx="63" cy="47" r="2" fill="var(--theme-primary)" />
      </g>

      {/* Floating particles */}
      <circle cx="18" cy="20" r="1.5" fill="var(--theme-accent)" style={{ animation: 'particle-float 3s ease-in-out infinite' }} />
      <circle cx="78" cy="45" r="1" fill="var(--theme-accent)" style={{ animation: 'particle-float 3s ease-in-out infinite 0.5s' }} />
      <circle cx="25" cy="50" r="1.2" fill="var(--theme-primary)" style={{ animation: 'particle-float 3s ease-in-out infinite 1s' }} />
      <circle cx="75" cy="18" r="1.5" fill="var(--theme-primary)" style={{ animation: 'particle-float 3s ease-in-out infinite 1.5s' }} />
      <circle cx="12" cy="38" r="1" fill="var(--theme-secondary)" style={{ animation: 'particle-float 3s ease-in-out infinite 2s' }} />
      <circle cx="85" cy="32" r="1.2" fill="var(--theme-secondary)" style={{ animation: 'particle-float 3s ease-in-out infinite 2.5s' }} />

      {/* Axis indicators */}
      <g opacity="0.5">
        <line x1="8" y1="56" x2="20" y2="56" stroke="var(--theme-primary)" strokeWidth="1" />
        <line x1="8" y1="56" x2="8" y2="44" stroke="var(--theme-success)" strokeWidth="1" />
        <line x1="8" y1="56" x2="14" y2="50" stroke="var(--theme-accent)" strokeWidth="1" />
        <text x="22" y="58" fontSize="4" fontFamily="monospace" fill="var(--theme-primary)">X</text>
        <text x="5" y="42" fontSize="4" fontFamily="monospace" fill="var(--theme-success)">Y</text>
        <text x="15" y="49" fontSize="4" fontFamily="monospace" fill="var(--theme-accent)">Z</text>
      </g>

      {/* Label */}
      <text x="72" y="58" fontSize="5" fontFamily="monospace" fill="var(--theme-secondary)" opacity="0.6">
        WEBGL
      </text>

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          g[style*="wireframe-rotate"],
          circle[style*="particle-float"] {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * CreativeContextStory - Visual narrative of the studio's evolution
 * From traditional production → technological transformation → systematic content creation
 */
export function CreativeContextStory({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 800 200"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background grid */}
      <defs>
        <pattern id="story-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--theme-secondary)" strokeWidth="0.5" opacity="0.15" />
        </pattern>
        <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--theme-secondary)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="var(--theme-primary)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--theme-primary)" />
          <stop offset="100%" stopColor="var(--theme-accent)" />
        </linearGradient>
      </defs>
      <rect width="800" height="200" fill="url(#story-grid)" />

      {/* Main timeline */}
      <line x1="50" y1="100" x2="750" y2="100" stroke="url(#timeline-gradient)" strokeWidth="2" />

      {/* Timeline flow animation */}
      <line x1="50" y1="100" x2="750" y2="100" stroke="var(--theme-primary)" strokeWidth="2"
            strokeDasharray="10 5" style={{ animation: 'story-flow 8s linear infinite' }} />

      {/* ===== ERA 1: TRADITIONAL PRODUCTION (2005-2020) ===== */}
      <g className="era-traditional">
        {/* Era label */}
        <text x="150" y="30" fontSize="10" fontFamily="monospace" textAnchor="middle"
              fill="var(--theme-secondary)" opacity="0.7">2005-2020</text>
        <text x="150" y="45" fontSize="8" fontFamily="monospace" textAnchor="middle"
              fill="var(--theme-secondary)" opacity="0.5">TRADITIONAL PRODUCTION</text>

        {/* Camera icon */}
        <g transform="translate(100, 60)">
          <rect x="0" y="10" width="30" height="20" fill="none" stroke="var(--theme-text)" strokeWidth="1.5" rx="2"
                style={{ animation: 'era-pulse 3s ease-in-out infinite' }} />
          <rect x="25" y="15" width="12" height="10" fill="none" stroke="var(--theme-text)" strokeWidth="1.5" rx="1" />
          <circle cx="12" cy="20" r="6" fill="none" stroke="var(--theme-text)" strokeWidth="1.5" />
          <circle cx="12" cy="20" r="2" fill="var(--theme-text)" />
        </g>

        {/* Globe icon (global production) */}
        <g transform="translate(160, 60)">
          <circle cx="15" cy="20" r="14" fill="none" stroke="var(--theme-text)" strokeWidth="1.5"
                  style={{ animation: 'era-pulse 3s ease-in-out infinite 0.5s' }} />
          <ellipse cx="15" cy="20" rx="14" ry="6" fill="none" stroke="var(--theme-text)" strokeWidth="1" opacity="0.6" />
          <line x1="15" y1="6" x2="15" y2="34" stroke="var(--theme-text)" strokeWidth="1" opacity="0.6" />
          <line x1="1" y1="20" x2="29" y2="20" stroke="var(--theme-text)" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Stats */}
        <text x="150" y="130" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="var(--theme-text)" opacity="0.6">All the Shows. So Many Brands.</text>
        <text x="150" y="145" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">6 CONTINENTS</text>
        <text x="150" y="158" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">100+ PERSON TEAMS</text>
      </g>

      {/* Timeline node 1 */}
      <circle cx="150" cy="100" r="6" fill="var(--theme-background)" stroke="var(--theme-text)" strokeWidth="2" />
      <circle cx="150" cy="100" r="3" fill="var(--theme-text)" />

      {/* ===== ERA 2: TRANSFORMATION (2020-2022) ===== */}
      <g className="era-transform">
        {/* Era label */}
        <text x="325" y="30" fontSize="10" fontFamily="monospace" textAnchor="middle"
              fill="var(--theme-primary)" opacity="0.8">2020-2022</text>
        <text x="325" y="45" fontSize="8" fontFamily="monospace" textAnchor="middle"
              fill="var(--theme-primary)" opacity="0.6">TRANSFORMATION</text>

        {/* Converging arrows - transformation symbol */}
        <g transform="translate(290, 55)">
          {/* Left arrow */}
          <path d="M 0 25 L 25 25 L 20 20 M 25 25 L 20 30" fill="none"
                stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round"
                style={{ animation: 'era-pulse 2s ease-in-out infinite' }} />
          {/* Right arrow */}
          <path d="M 70 25 L 45 25 L 50 20 M 45 25 L 50 30" fill="none"
                stroke="var(--theme-primary)" strokeWidth="1.5" strokeLinecap="round"
                style={{ animation: 'era-pulse 2s ease-in-out infinite 0.3s' }} />
          {/* Center spark */}
          <circle cx="35" cy="25" r="8" fill="none" stroke="var(--theme-primary)" strokeWidth="2"
                  style={{ animation: 'crosshair-pulse 1.5s ease-in-out infinite' }} />
          <circle cx="35" cy="25" r="3" fill="var(--theme-primary)" />
        </g>

        {/* Tech integration icons */}
        <text x="325" y="130" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="var(--theme-primary)" opacity="0.7">TECH + PRODUCTION</text>
        <text x="325" y="145" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">AI • WEB • SYSTEMS</text>
      </g>

      {/* Timeline node 2 - transformation point (larger, highlighted) */}
      <circle cx="325" cy="100" r="10" fill="var(--theme-primary)" opacity="0.2"
              style={{ animation: 'node-pulse 2s ease-in-out infinite' }} />
      <circle cx="325" cy="100" r="6" fill="var(--theme-background)" stroke="var(--theme-primary)" strokeWidth="2" />
      <circle cx="325" cy="100" r="3" fill="var(--theme-primary)" />

      {/* ===== ERA 3: CREATIVE SYSTEMS (2022-PRESENT) ===== */}
      <g className="era-systems">
        {/* Era label */}
        <text x="500" y="30" fontSize="10" fontFamily="monospace" textAnchor="middle"
              fill="var(--theme-accent)" opacity="0.8">2022-PRESENT</text>
        <text x="500" y="45" fontSize="8" fontFamily="monospace" textAnchor="middle"
              fill="var(--theme-accent)" opacity="0.6">CREATIVE SYSTEMS</text>

        {/* Code brackets with AI node */}
        <g transform="translate(460, 55)">
          {/* Left bracket */}
          <path d="M 15 5 L 5 5 L 5 45 L 15 45" fill="none" stroke="var(--theme-accent)" strokeWidth="2" strokeLinecap="round" />
          {/* Right bracket */}
          <path d="M 65 5 L 75 5 L 75 45 L 65 45" fill="none" stroke="var(--theme-accent)" strokeWidth="2" strokeLinecap="round" />
          {/* AI node in center */}
          <circle cx="40" cy="25" r="12" fill="var(--theme-accent)" opacity="0.2"
                  style={{ animation: 'ai-glow 2s ease-in-out infinite' }} />
          <circle cx="40" cy="25" r="8" fill="var(--theme-background)" stroke="var(--theme-accent)" strokeWidth="1.5" />
          <text x="40" y="29" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="var(--theme-accent)">AI</text>
        </g>

        {/* Stats */}
        <text x="500" y="130" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="var(--theme-accent)" opacity="0.7">FULL-STACK</text>
        <text x="500" y="145" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">AUTOMATION</text>
        <text x="500" y="158" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">SCALABLE SYSTEMS</text>
      </g>

      {/* Timeline node 3 */}
      <circle cx="500" cy="100" r="6" fill="var(--theme-background)" stroke="var(--theme-accent)" strokeWidth="2" />
      <circle cx="500" cy="100" r="3" fill="var(--theme-accent)" />

      {/* ===== ERA 4: THE CONTENT ENGINE (OUTPUT) ===== */}
      <g className="era-engine">
        {/* Era label */}
        <text x="675" y="30" fontSize="10" fontFamily="monospace" textAnchor="middle"
              fill="var(--theme-success)" opacity="0.8">OUTPUT</text>
        <text x="675" y="45" fontSize="8" fontFamily="monospace" textAnchor="middle"
              fill="var(--theme-success)" opacity="0.6">CONTENT ENGINE</text>

        {/* Engine/gear symbol */}
        <g transform="translate(650, 55)" style={{ transformOrigin: '25px 25px', animation: 'engine-rotate 10s linear infinite' }}>
          <circle cx="25" cy="25" r="18" fill="none" stroke="var(--theme-success)" strokeWidth="2" />
          <circle cx="25" cy="25" r="8" fill="var(--theme-success)" opacity="0.3" />
          {/* Gear teeth */}
          <rect x="22" y="2" width="6" height="8" fill="var(--theme-success)" />
          <rect x="22" y="40" width="6" height="8" fill="var(--theme-success)" />
          <rect x="2" y="22" width="8" height="6" fill="var(--theme-success)" />
          <rect x="40" y="22" width="8" height="6" fill="var(--theme-success)" />
        </g>

        {/* Output arrows - content flowing out */}
        <g>
          <rect x="710" y="70" width="12" height="8" fill="var(--theme-success)" rx="1"
                style={{ animation: 'content-output 2s ease-out infinite' }} />
          <rect x="710" y="85" width="12" height="8" fill="var(--theme-success)" rx="1" opacity="0.7"
                style={{ animation: 'content-output 2s ease-out infinite 0.4s' }} />
          <rect x="710" y="100" width="12" height="8" fill="var(--theme-success)" rx="1" opacity="0.5"
                style={{ animation: 'content-output 2s ease-out infinite 0.8s' }} />
          <rect x="710" y="115" width="12" height="8" fill="var(--theme-success)" rx="1" opacity="0.7"
                style={{ animation: 'content-output 2s ease-out infinite 1.2s' }} />
          <rect x="710" y="130" width="12" height="8" fill="var(--theme-success)" rx="1"
                style={{ animation: 'content-output 2s ease-out infinite 1.6s' }} />
        </g>

        {/* Stats */}
        <text x="675" y="145" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">CONSISTENT</text>
        <text x="675" y="158" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">REPEATABLE</text>
      </g>

      {/* Timeline node 4 - current/output */}
      <circle cx="675" cy="100" r="8" fill="var(--theme-success)" opacity="0.2"
              style={{ animation: 'node-pulse 2s ease-in-out infinite 0.5s' }} />
      <circle cx="675" cy="100" r="6" fill="var(--theme-background)" stroke="var(--theme-success)" strokeWidth="2" />
      <circle cx="675" cy="100" r="3" fill="var(--theme-success)" />

      {/* Flow particles along timeline */}
      <circle r="3" fill="var(--theme-primary)">
        <animateMotion dur="6s" repeatCount="indefinite" path="M 150 100 L 325 100 L 500 100 L 675 100" />
        <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="var(--theme-accent)">
        <animateMotion dur="6s" repeatCount="indefinite" path="M 150 100 L 325 100 L 500 100 L 675 100" begin="2s" />
        <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" begin="2s" />
      </circle>
      <circle r="3" fill="var(--theme-success)">
        <animateMotion dur="6s" repeatCount="indefinite" path="M 150 100 L 325 100 L 500 100 L 675 100" begin="4s" />
        <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" begin="4s" />
      </circle>

      {/* Bottom tagline */}
      <text x="400" y="185" fontSize="9" fontFamily="monospace" textAnchor="middle" fill="var(--theme-secondary)" opacity="0.5">
        BUILDING SYSTEMS THAT HELP CREATORS SHIP CONTENT CONSISTENTLY
      </text>

      {/* Corner markers */}
      <g opacity="0.3">
        <path d="M 10 10 L 10 25 M 10 10 L 25 10" stroke="var(--theme-secondary)" strokeWidth="1" />
        <path d="M 790 10 L 790 25 M 790 10 L 775 10" stroke="var(--theme-secondary)" strokeWidth="1" />
        <path d="M 10 190 L 10 175 M 10 190 L 25 190" stroke="var(--theme-secondary)" strokeWidth="1" />
        <path d="M 790 190 L 790 175 M 790 190 L 775 190" stroke="var(--theme-secondary)" strokeWidth="1" />
      </g>

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          line[style*="story-flow"],
          g[style*="engine-rotate"],
          rect[style*="content-output"],
          circle[style*="node-pulse"],
          circle[style*="crosshair-pulse"],
          circle[style*="ai-glow"],
          circle[style*="era-pulse"],
          rect[style*="era-pulse"],
          circle animateMotion,
          circle animate {
            animation: none !important;
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </svg>
  );
}

/**
 * ContentManagementAnimation - Neural network with connected nodes and data flow
 */
export function ContentManagementAnimation({ className = '' }: AnimationProps) {
  return (
    <svg
      viewBox="0 0 96 64"
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Connection lines with data flow animation */}
      <line
        x1="48"
        y1="32"
        x2="20"
        y2="16"
        stroke="var(--theme-primary)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        style={{
          animation: 'data-flow 1s linear infinite',
        }}
      />
      <line
        x1="48"
        y1="32"
        x2="76"
        y2="16"
        stroke="var(--theme-primary)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        style={{
          animation: 'data-flow 1s linear infinite 0.25s',
        }}
      />
      <line
        x1="48"
        y1="32"
        x2="20"
        y2="48"
        stroke="var(--theme-primary)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        style={{
          animation: 'data-flow 1s linear infinite 0.5s',
        }}
      />
      <line
        x1="48"
        y1="32"
        x2="76"
        y2="48"
        stroke="var(--theme-primary)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        style={{
          animation: 'data-flow 1s linear infinite 0.75s',
        }}
      />

      {/* Secondary connections */}
      <line
        x1="20"
        y1="16"
        x2="20"
        y2="48"
        stroke="var(--theme-secondary)"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
        style={{
          animation: 'data-flow 1.5s linear infinite',
        }}
      />
      <line
        x1="76"
        y1="16"
        x2="76"
        y2="48"
        stroke="var(--theme-secondary)"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
        style={{
          animation: 'data-flow 1.5s linear infinite 0.5s',
        }}
      />

      {/* Outer nodes with staggered pulse */}
      <circle
        cx="20"
        cy="16"
        r="6"
        fill="var(--theme-background)"
        stroke="var(--theme-primary)"
        strokeWidth="2"
        style={{
          animation: 'node-pulse 2s ease-in-out infinite',
        }}
      />
      <circle
        cx="76"
        cy="16"
        r="6"
        fill="var(--theme-background)"
        stroke="var(--theme-primary)"
        strokeWidth="2"
        style={{
          animation: 'node-pulse 2s ease-in-out infinite 0.5s',
        }}
      />
      <circle
        cx="20"
        cy="48"
        r="6"
        fill="var(--theme-background)"
        stroke="var(--theme-primary)"
        strokeWidth="2"
        style={{
          animation: 'node-pulse 2s ease-in-out infinite 1s',
        }}
      />
      <circle
        cx="76"
        cy="48"
        r="6"
        fill="var(--theme-background)"
        stroke="var(--theme-primary)"
        strokeWidth="2"
        style={{
          animation: 'node-pulse 2s ease-in-out infinite 1.5s',
        }}
      />

      {/* Inner node dots */}
      <circle cx="20" cy="16" r="2" fill="var(--theme-primary)" />
      <circle cx="76" cy="16" r="2" fill="var(--theme-primary)" />
      <circle cx="20" cy="48" r="2" fill="var(--theme-primary)" />
      <circle cx="76" cy="48" r="2" fill="var(--theme-primary)" />

      {/* Central AI node with glow */}
      <circle
        cx="48"
        cy="32"
        r="10"
        fill="var(--theme-accent)"
        style={{
          animation: 'ai-glow 2s ease-in-out infinite',
        }}
      />
      <circle
        cx="48"
        cy="32"
        r="10"
        fill="none"
        stroke="var(--theme-primary)"
        strokeWidth="2"
      />

      {/* AI "brain" symbol in center */}
      <text
        x="48"
        y="36"
        textAnchor="middle"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
        fill="var(--theme-background)"
      >
        AI
      </text>

      {/* Reduced motion styles */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          line[style*="data-flow"],
          circle[style*="node-pulse"],
          circle[style*="ai-glow"] {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}
