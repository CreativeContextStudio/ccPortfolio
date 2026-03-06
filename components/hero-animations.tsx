"use client";

import { motion, AnimatePresence } from "motion/react";

/* ==============================================
   Hero Animation Container
   12 SVG animations synced with the typing cycle.
   Each uses viewBox="0 0 400 300" (matches aspect-[4/3]).
   Colors via CSS variables. Stateless, decorative only.
   ============================================== */

const enterTransition = {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

/* Helper: ensures CSS scale/rotate transforms apply from element center */
const sc: React.CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };

const ANIMATIONS = [
  BrandCampaigns,
  NarrativeFilm,
  NeuralConstellation,
  WorldMap,
  BroadcastMonitor,
  SlideDeckStack,
  PostTimeline,
  WireframeCube,
  TypeSpecimen,
  PipelineFlow,
  OrgChart,
  CircuitBoard,
];

export function HeroAnimationContainer({ index }: { index: number }) {
  const Anim = ANIMATIONS[index] || ANIMATIONS[0];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
        transition={enterTransition}
      >
        <Anim />
      </motion.div>
    </AnimatePresence>
  );
}

/* -----------------------------------------------
   1. Fortune 500 Brand Campaigns — Logo Grid Mosaic
   ----------------------------------------------- */
function BrandCampaigns() {
  const tiles = Array.from({ length: 12 }, (_, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    return { x: 60 + col * 75, y: 50 + row * 72, delay: (row + col) * 0.15 };
  });

  /* 12 unique icon shapes so no two tiles repeat */
  const icons: ((x: number, y: number) => React.ReactNode)[] = [
    (x, y) => <circle cx={x + 30} cy={y + 28} r="14" fill="none" stroke="var(--ltx-pink)" strokeWidth="1.2" opacity="0.7" />,
    (x, y) => <rect x={x + 16} y={y + 14} width="28" height="28" rx="4" fill="none" stroke="var(--ltx-pink)" strokeWidth="1" opacity="0.55" />,
    (x, y) => <polygon points={`${x + 30},${y + 12} ${x + 46},${y + 44} ${x + 14},${y + 44}`} fill="none" stroke="var(--ltx-pink)" strokeWidth="1" opacity="0.55" />,
    (x, y) => (
      <g opacity="0.55">
        <line x1={x + 16} y1={y + 20} x2={x + 44} y2={y + 20} stroke="var(--ltx-pink)" strokeWidth="1.5" />
        <line x1={x + 16} y1={y + 28} x2={x + 36} y2={y + 28} stroke="var(--ltx-pink)" strokeWidth="1" />
        <line x1={x + 16} y1={y + 36} x2={x + 42} y2={y + 36} stroke="var(--ltx-pink)" strokeWidth="1" />
      </g>
    ),
    (x, y) => (
      <g opacity="0.55">
        <circle cx={x + 22} cy={y + 24} r="8" fill="none" stroke="var(--ltx-pink)" strokeWidth="1" />
        <circle cx={x + 38} cy={y + 32} r="6" fill="none" stroke="var(--ltx-pink)" strokeWidth="1" />
      </g>
    ),
    (x, y) => <path d={`M${x + 14},${y + 28} L${x + 30},${y + 14} L${x + 46},${y + 28} L${x + 30},${y + 42} Z`} fill="none" stroke="var(--ltx-pink)" strokeWidth="1" opacity="0.7" />,
    (x, y) => (
      <g opacity="0.55">
        <rect x={x + 14} y={y + 14} width="14" height="14" rx="2" fill="var(--ltx-pink)" opacity="0.55" />
        <rect x={x + 32} y={y + 14} width="14" height="14" rx="2" fill="var(--ltx-pink)" opacity="0.4" />
        <rect x={x + 14} y={y + 32} width="14" height="14" rx="2" fill="var(--ltx-pink)" opacity="0.4" />
        <rect x={x + 32} y={y + 32} width="14" height="14" rx="2" fill="var(--ltx-pink)" opacity="0.55" />
      </g>
    ),
    (x, y) => <path d={`M${x + 16},${y + 36} Q${x + 30},${y + 10} ${x + 44},${y + 36}`} fill="none" stroke="var(--ltx-pink)" strokeWidth="1.2" opacity="0.55" />,
    (x, y) => (
      <g opacity="0.55">
        <circle cx={x + 30} cy={y + 28} r="16" fill="none" stroke="var(--ltx-pink)" strokeWidth="0.8" />
        <circle cx={x + 30} cy={y + 28} r="8" fill="none" stroke="var(--ltx-pink)" strokeWidth="0.8" />
        <circle cx={x + 30} cy={y + 28} r="2" fill="var(--ltx-pink)" />
      </g>
    ),
    (x, y) => (
      <g opacity="0.55">
        <polygon points={`${x + 22},${y + 16} ${x + 38},${y + 16} ${x + 42},${y + 28} ${x + 30},${y + 40} ${x + 18},${y + 28}`} fill="none" stroke="var(--ltx-pink)" strokeWidth="1" />
      </g>
    ),
    (x, y) => (
      <g opacity="0.55">
        <line x1={x + 18} y1={y + 40} x2={x + 30} y2={y + 16} stroke="var(--ltx-pink)" strokeWidth="1.2" />
        <line x1={x + 30} y1={y + 16} x2={x + 42} y2={y + 40} stroke="var(--ltx-pink)" strokeWidth="1.2" />
        <line x1={x + 18} y1={y + 30} x2={x + 42} y2={y + 30} stroke="var(--ltx-pink)" strokeWidth="1" />
      </g>
    ),
    (x, y) => (
      <g opacity="0.55">
        <rect x={x + 18} y={y + 16} width="24" height="24" rx="12" fill="none" stroke="var(--ltx-pink)" strokeWidth="1" />
        <line x1={x + 24} y1={y + 24} x2={x + 36} y2={y + 24} stroke="var(--ltx-pink)" strokeWidth="1" />
        <line x1={x + 24} y1={y + 32} x2={x + 36} y2={y + 32} stroke="var(--ltx-pink)" strokeWidth="1" />
      </g>
    ),
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <text x="200" y="30" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">BRAND PORTFOLIO</text>
      {tiles.map((t, i) => (
        <g key={`ha1-tile-${i}`}>
          <rect
            x={t.x} y={t.y} width="60" height="56" rx="6"
            fill="var(--ltx-pink)" opacity="0.3"
            stroke="var(--ltx-pink)" strokeWidth="0.5"
            style={{ ...sc, animation: `ha-tile-pulse 2.4s ease-in-out ${t.delay}s infinite` }}
          />
          {icons[i](t.x, t.y)}
        </g>
      ))}
      <text x="200" y="280" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">12 CAMPAIGNS</text>
    </svg>
  );
}

/* -----------------------------------------------
   2. Narrative Film & Documentary — Film Strip
   ----------------------------------------------- */
function NarrativeFilm() {
  /* 6 frames: first 3 unique, last 3 repeat content for seamless scroll */
  const frames = [0, 1, 2, 3, 4, 5];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <defs>
        <clipPath id="ha2-clip">
          <rect x="20" y="60" width="360" height="180" />
        </clipPath>
      </defs>

      {/* Clapperboard */}
      <g transform="translate(160, 8)">
        {/* Board body */}
        <rect x="0" y="14" width="80" height="34" rx="2" fill="var(--ltx-bg-alt)" stroke="var(--ltx-muted)" strokeWidth="1" opacity="0.8" />
        {/* Clapper arm — alternating diagonal stripes */}
        <rect x="0" y="4" width="80" height="12" rx="2" fill="var(--ltx-muted)" opacity="0.3" />
        {[0, 1, 2, 3, 4, 5].map((s) => (
          <rect key={`ha2-stripe-${s}`} x={2 + s * 13} y="4" width="7" height="12" rx="1" fill="var(--ltx-muted)" opacity={s % 2 === 0 ? "0.55" : "0"} />
        ))}
        <text x="40" y="36" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.65">SCENE 1</text>
      </g>

      {/* Filmstrip body */}
      <rect x="20" y="60" width="360" height="180" rx="4" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="1" />

      {/* Sprocket holes top */}
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={`ha2-st-${i}`} x={28 + i * 20} y="64" width="8" height="6" rx="1.5" fill="var(--ltx-border)" opacity="0.6" />
      ))}

      {/* Sprocket holes bottom */}
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={`ha2-sb-${i}`} x={28 + i * 20} y="230" width="8" height="6" rx="1.5" fill="var(--ltx-border)" opacity="0.6" />
      ))}

      {/* Scrolling frames — content repeats every 3 for seamless loop */}
      <g clipPath="url(#ha2-clip)" style={{ animation: "ha-filmstrip-scroll 12s linear infinite" }}>
        {frames.map((f) => {
          const x = 30 + f * 120;
          const variant = f % 3;
          return (
            <g key={`ha2-f-${f}`}>
              <rect x={x} y="78" width="100" height="144" rx="2" fill="var(--ltx-muted)" opacity="0.15" stroke="var(--ltx-border)" strokeWidth="0.5" />
              {variant === 0 && (
                <g opacity="0.55">
                  <rect x={x + 15} y="100" width="70" height="45" rx="3" fill="var(--ltx-muted)" />
                  <circle cx={x + 50} cy="170" r="18" fill="none" stroke="var(--ltx-muted)" strokeWidth="1.5" />
                  <line x1={x + 20} y1="200" x2={x + 80} y2="200" stroke="var(--ltx-muted)" strokeWidth="0.8" />
                </g>
              )}
              {variant === 1 && (
                <g opacity="0.55">
                  <circle cx={x + 50} cy="130" r="28" fill="none" stroke="var(--ltx-muted)" strokeWidth="1.5" />
                  <circle cx={x + 50} cy="130" r="10" fill="var(--ltx-muted)" opacity="0.7" />
                  <line x1={x + 20} y1="180" x2={x + 80} y2="180" stroke="var(--ltx-muted)" strokeWidth="0.8" />
                  <line x1={x + 25} y1="192" x2={x + 75} y2="192" stroke="var(--ltx-muted)" strokeWidth="0.5" />
                </g>
              )}
              {variant === 2 && (
                <g opacity="0.55">
                  <polygon points={`${x + 50},95 ${x + 80},155 ${x + 20},155`} fill="none" stroke="var(--ltx-muted)" strokeWidth="1.5" />
                  <rect x={x + 25} y="170" width="50" height="25" rx="3" fill="var(--ltx-muted)" />
                </g>
              )}
              <text x={x + 50} y="218" textAnchor="middle" fill="var(--ltx-muted)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.6">
                {`${(f % 3) + 1}A`}
              </text>
            </g>
          );
        })}
      </g>

      <text x="200" y="260" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">NARRATIVE</text>
    </svg>
  );
}

/* -----------------------------------------------
   3. AI-native Workflows — Neural Constellation
   ----------------------------------------------- */
function NeuralConstellation() {
  const cx = 200, cy = 145;
  /* Pentagon arrangement around center for visual balance */
  const nodes = [
    { label: "LLM", x: 200, y: 55 },
    { label: "TOOLS", x: 305, y: 95 },
    { label: "MEM", x: 275, y: 210 },
    { label: "EVAL", x: 125, y: 210 },
    { label: "CTX", x: 95, y: 95 },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="ha3-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Connection lines + flowing particles */}
      {nodes.map((node, i) => (
        <g key={`ha3-conn-${i}`}>
          <line
            x1={cx} y1={cy} x2={node.x} y2={node.y}
            stroke="var(--ltx-studio)" strokeWidth="1" opacity="0.45"
            strokeDasharray="4 4"
            style={{ animation: `ha-data-flow 1.5s linear ${i * 0.3}s infinite` }}
          />
          <circle r="2.5" fill="var(--ltx-studio)" opacity="0.8">
            <animateMotion
              dur={`${2.5 + i * 0.4}s`}
              repeatCount="indefinite"
              path={`M${cx},${cy} L${node.x},${node.y}`}
            />
          </circle>
        </g>
      ))}

      {/* Central hex */}
      <polygon
        points="200,120 218,131 218,159 200,170 182,159 182,131"
        fill="var(--ltx-bg-alt)" stroke="var(--ltx-studio)" strokeWidth="2"
        filter="url(#ha3-glow)"
        style={{ animation: "ha-hex-glow 4s ease-in-out infinite" }}
      />
      <text x="200" y="149" textAnchor="middle" fill="var(--ltx-studio)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">AGENT</text>

      {/* Satellite nodes */}
      {nodes.map((node, i) => (
        <g key={`ha3-node-${i}`} style={{ ...sc, animation: `ha-node-float 3s ease-in-out ${i * 0.5}s infinite` }}>
          <circle cx={node.x} cy={node.y} r="18" fill="var(--ltx-bg-alt)" stroke="var(--ltx-studio)" strokeWidth="1.5" opacity="0.9" />
          <text x={node.x} y={node.y + 3} textAnchor="middle" fill="var(--ltx-studio)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="500">{node.label}</text>
        </g>
      ))}

      <text x="200" y="280" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">AGENTIC SYSTEM</text>
    </svg>
  );
}

/* -----------------------------------------------
   4. Production Across 6 Continents — World Map
   ----------------------------------------------- */
function WorldMap() {
  const locations = [
    { x: 110, y: 100, label: "NA" },
    { x: 150, y: 170, label: "SA" },
    { x: 215, y: 95, label: "EU" },
    { x: 225, y: 155, label: "AF" },
    { x: 300, y: 100, label: "AS" },
    { x: 315, y: 195, label: "OC" },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <text x="200" y="30" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">GLOBAL PRODUCTION</text>

      {/* Simplified continent silhouettes */}
      <g opacity="0.2" fill="var(--ltx-pink)">
        {/* North America */}
        <path d="M65,65 Q80,55 105,58 Q125,55 140,65 Q148,78 145,95 Q140,108 125,115 Q110,118 95,115 Q78,112 68,100 Q62,85 65,65 Z" />
        {/* South America */}
        <path d="M130,135 Q145,128 160,140 Q168,158 165,180 Q158,200 148,212 Q138,210 132,195 Q128,175 130,155 Z" />
        {/* Europe */}
        <path d="M195,68 Q212,62 228,68 Q238,78 236,92 Q228,102 215,100 Q205,94 198,82 Z" />
        {/* Africa */}
        <path d="M205,110 Q222,105 238,112 Q248,130 246,158 Q240,182 228,192 Q218,188 212,170 Q206,145 205,125 Z" />
        {/* Asia */}
        <path d="M252,58 Q280,50 310,55 Q335,65 340,85 Q335,108 318,118 Q295,122 272,115 Q258,105 252,88 Z" />
        {/* Oceania */}
        <path d="M295,168 Q315,162 335,170 Q345,182 338,198 Q325,208 310,202 Q298,192 295,178 Z" />
      </g>

      {/* Latitude/longitude grid */}
      <g stroke="var(--ltx-border)" strokeWidth="0.3" opacity="0.45">
        <line x1="40" y1="80" x2="360" y2="80" />
        <line x1="40" y1="140" x2="360" y2="140" />
        <line x1="40" y1="200" x2="360" y2="200" />
        <line x1="120" y1="50" x2="120" y2="220" />
        <line x1="200" y1="50" x2="200" y2="220" />
        <line x1="280" y1="50" x2="280" y2="220" />
      </g>

      {/* Location pins with radiating rings */}
      {locations.map((loc, i) => (
        <g key={`ha4-loc-${i}`}>
          <circle cx={loc.x} cy={loc.y} r="12" fill="none" stroke="var(--ltx-pink)" strokeWidth="0.5" opacity="0.55"
            style={{ ...sc, animation: `ha-ring-expand 3s ease-out ${i * 0.5}s infinite` }}
          />
          <circle cx={loc.x} cy={loc.y} r="4" fill="var(--ltx-pink)" opacity="0.85"
            style={{ ...sc, animation: `ha-location-ping 2s ease-in-out ${i * 0.3}s infinite` }}
          />
          <text x={loc.x} y={loc.y + 16} textAnchor="middle" fill="var(--ltx-muted)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.6">{loc.label}</text>
        </g>
      ))}

      {/* Flight path arcs */}
      <g stroke="var(--ltx-pink)" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="3 3">
        <path d={`M${locations[0].x},${locations[0].y} Q170,55 ${locations[2].x},${locations[2].y}`} />
        <path d={`M${locations[2].x},${locations[2].y} Q260,70 ${locations[4].x},${locations[4].y}`} />
        <path d={`M${locations[4].x},${locations[4].y} Q340,150 ${locations[5].x},${locations[5].y}`} />
        <path d={`M${locations[0].x},${locations[0].y} Q120,140 ${locations[1].x},${locations[1].y}`} />
        <path d={`M${locations[2].x},${locations[2].y} Q215,130 ${locations[3].x},${locations[3].y}`} />
      </g>

      <text x="200" y="248" textAnchor="middle" fill="var(--ltx-pink)" fontSize="22" fontFamily="var(--font-mono)" fontWeight="700" opacity="0.25">6</text>
      <text x="200" y="268" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">CONTINENTS</text>
    </svg>
  );
}

/* -----------------------------------------------
   5. Live Event Direction — Broadcast Monitor
   ----------------------------------------------- */
function BroadcastMonitor() {
  const bars = ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ffffff"];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <defs>
        <clipPath id="ha5-monitor-clip">
          <rect x="55" y="55" width="290" height="145" rx="2" />
        </clipPath>
      </defs>

      {/* Monitor frame */}
      <rect x="50" y="30" width="300" height="175" rx="8" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="2" />
      <rect x="50" y="30" width="300" height="20" rx="8" fill="var(--ltx-border)" opacity="0.4" />

      {/* Window dots */}
      <circle cx="66" cy="40" r="3" fill="var(--ltx-pink)" opacity="0.6" />
      <circle cx="78" cy="40" r="3" fill="var(--ltx-sky)" opacity="0.55" />
      <circle cx="90" cy="40" r="3" fill="var(--ltx-green)" opacity="0.55" />

      {/* Color bars */}
      <g clipPath="url(#ha5-monitor-clip)" style={{ animation: "ha-color-bars 8s ease-in-out infinite" }}>
        {bars.map((color, i) => (
          <rect key={`ha5-bar-${i}`} x={55 + i * 42} y="55" width="42" height="105" fill={color} opacity="0.2" />
        ))}
      </g>

      {/* Signal waveform line */}
      <path
        d="M60,170 Q80,158 100,170 Q120,182 140,170 Q160,158 180,170 Q200,182 220,170 Q240,158 260,170 Q280,182 300,170 Q320,158 340,170"
        fill="none" stroke="var(--ltx-sky)" strokeWidth="1.5" opacity="0.5"
      />

      {/* LIVE indicator */}
      <g style={{ animation: "ha-live-blink 1.5s steps(1) infinite" }}>
        <rect x="290" y="60" width="48" height="18" rx="3" fill="var(--ltx-pink)" opacity="0.9" />
        <text x="314" y="73" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">LIVE</text>
      </g>

      {/* Monitor stand */}
      <rect x="175" y="207" width="50" height="8" rx="2" fill="var(--ltx-border)" opacity="0.55" />
      <rect x="160" y="215" width="80" height="4" rx="2" fill="var(--ltx-border)" opacity="0.4" />

      {/* Signal pulse circles — under the monitor */}
      {[0, 1, 2].map((i) => (
        <circle key={`ha5-pulse-${i}`} cx="200" cy="245" r={6 + i * 10} fill="none" stroke="var(--ltx-sky)" strokeWidth="0.8" opacity="0.45"
          style={{ ...sc, animation: `ha-signal-pulse 2.5s ease-out ${i * 0.4}s infinite` }}
        />
      ))}

      <text x="200" y="280" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">BROADCAST</text>
    </svg>
  );
}

/* -----------------------------------------------
   6. Creative Strategy — Slide Deck Stack
   ----------------------------------------------- */
function SlideDeckStack() {
  const cards = [
    { label: "STRATEGY", content: "pie" },
    { label: "CREATIVE", content: "bars" },
    { label: "DELIVERY", content: "arrow" },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <text x="200" y="25" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">PITCH DECK</text>

      {/* Three overlapping slide cards — back to front */}
      {cards.map((card, i) => {
        const x = 75 + i * 12;
        const y = 42 + i * 10;
        const w = 250 - i * 10;
        const h = 175 - i * 5;
        return (
          <g key={`ha6-card-${i}`} style={{ ...sc, animation: `ha-slide-shuffle 6s ease-in-out ${i * 0.3}s infinite` }}>
            <rect x={x} y={y} width={w} height={h} rx="6"
              fill="var(--ltx-bg-alt)" stroke="var(--ltx-violet)"
              strokeWidth={i === 2 ? "1.5" : "0.5"}
              opacity={0.4 + i * 0.25}
            />
            <text x={x + 16} y={y + 20} fill="var(--ltx-violet)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.65">{card.label}</text>
            {card.content === "pie" && (
              <g opacity="0.45">
                <circle cx={x + w / 2} cy={y + h / 2 + 5} r={28} fill="none" stroke="var(--ltx-violet)" strokeWidth="1" />
                <path d={`M${x + w / 2},${y + h / 2 + 5} L${x + w / 2},${y + h / 2 - 23} A28,28 0 0,1 ${x + w / 2 + 24},${y + h / 2 + 19} Z`} fill="var(--ltx-violet)" opacity="0.55" />
              </g>
            )}
            {card.content === "bars" && (
              <g opacity="0.45">
                {[0, 1, 2, 3].map((b) => (
                  <rect key={`bar-${b}`} x={x + 30 + b * 42} y={y + h - 28 - b * 16} width="26" height={18 + b * 16} rx="2" fill="var(--ltx-violet)" opacity="0.6" />
                ))}
              </g>
            )}
            {card.content === "arrow" && (
              <g opacity="0.45">
                <path d={`M${x + 40},${y + h / 2 + 5} L${x + w - 45},${y + h / 2 + 5}`} stroke="var(--ltx-violet)" strokeWidth="2" fill="none" />
                <polygon points={`${x + w - 55},${y + h / 2 - 3} ${x + w - 40},${y + h / 2 + 5} ${x + w - 55},${y + h / 2 + 13}`} fill="var(--ltx-violet)" opacity="0.7" />
              </g>
            )}
          </g>
        );
      })}

      {/* Slide counter — centered */}
      <g transform="translate(176, 240)">
        {[0, 1, 2].map((d) => (
          <circle key={`ha6-dot-${d}`} cx={d * 16} cy="0" r="3" fill={d === 2 ? "var(--ltx-violet)" : "var(--ltx-border)"} opacity={d === 2 ? "0.8" : "0.55"} />
        ))}
      </g>

      <text x="200" y="268" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">3 SECTIONS</text>
    </svg>
  );
}

/* -----------------------------------------------
   7. Post-production & VFX — Timeline
   ----------------------------------------------- */
function PostTimeline() {
  const tracks = [
    { label: "V1", y: 80, color: "var(--ltx-green)", clips: [{ x: 60, w: 100 }, { x: 180, w: 80 }, { x: 280, w: 60 }] },
    { label: "A1", y: 130, color: "var(--ltx-sky)", clips: [{ x: 50, w: 140 }, { x: 210, w: 120 }] },
    { label: "A2", y: 180, color: "var(--ltx-violet)", clips: [{ x: 80, w: 80 }, { x: 200, w: 60 }, { x: 280, w: 70 }] },
  ];

  const keyframes = [
    { x: 100, y: 68 }, { x: 160, y: 68 }, { x: 220, y: 68 }, { x: 300, y: 68 },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      {/* Timecode ruler */}
      <rect x="30" y="40" width="340" height="20" rx="2" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="0.5" />
      {Array.from({ length: 17 }, (_, i) => (
        <g key={`ha7-tc-${i}`}>
          <line x1={50 + i * 20} y1="46" x2={50 + i * 20} y2={i % 2 === 0 ? "56" : "52"} stroke="var(--ltx-border)" strokeWidth="0.5" />
          {i % 4 === 0 && (
            <text x={50 + i * 20} y="44" textAnchor="middle" fill="var(--ltx-muted)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">
              {`${String(Math.floor(i / 4)).padStart(2, "0")}:00`}
            </text>
          )}
        </g>
      ))}

      {/* Keyframe diamonds — rotation handled purely via CSS with transform-box */}
      {keyframes.map((kf, i) => (
        <rect key={`ha7-kf-${i}`}
          x={kf.x - 4} y={kf.y - 4} width="8" height="8" rx="1"
          fill="var(--ltx-green)" opacity="0.8"
          style={{
            ...sc,
            animation: `ha-keyframe-pulse 2s ease-in-out ${i * 0.5}s infinite`,
          }}
        />
      ))}

      {/* Tracks */}
      {tracks.map((track, ti) => (
        <g key={`ha7-track-${ti}`}>
          <text x="36" y={track.y + 14} fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.65">{track.label}</text>
          <line x1="50" y1={track.y} x2="370" y2={track.y} stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.55" />
          <line x1="50" y1={track.y + 30} x2="370" y2={track.y + 30} stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.55" />
          {track.clips.map((clip, ci) => (
            <rect key={`ha7-clip-${ti}-${ci}`}
              x={clip.x} y={track.y + 4} width={clip.w} height="22" rx="3"
              fill={track.color} opacity="0.4"
              stroke={track.color} strokeWidth="0.5"
            />
          ))}
        </g>
      ))}

      {/* Playhead */}
      <g style={{ animation: "ha-playhead-sweep 6s linear infinite" }}>
        <line x1="60" y1="40" x2="60" y2="215" stroke="var(--ltx-green)" strokeWidth="1.5" opacity="0.85" />
        <polygon points="54,38 60,44 66,38" fill="var(--ltx-green)" opacity="0.85" />
      </g>

      {/* Transport controls */}
      <g transform="translate(150, 235)">
        <rect x="0" y="0" width="100" height="24" rx="4" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="0.5" />
        <polygon points="22,6 22,18 14,12" fill="var(--ltx-muted)" opacity="0.6" />
        <rect x="32" y="6" width="8" height="12" rx="1" fill="var(--ltx-muted)" opacity="0.6" />
        <polygon points="55,6 55,18 67,12" fill="var(--ltx-green)" opacity="0.7" />
        <polygon points="76,6 76,18 84,12" fill="var(--ltx-muted)" opacity="0.6" />
      </g>

      <text x="200" y="280" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">POST-PRODUCTION</text>
    </svg>
  );
}

/* -----------------------------------------------
   8. Experiential & Immersive — Wireframe Cube
   ----------------------------------------------- */
function WireframeCube() {
  /* Scaled-down isometric cubes that fit comfortably in viewBox */
  const cube1 = {
    front: "M130,130 L270,130 L270,220 L130,220 Z",
    top: "M130,130 L180,85 L320,85 L270,130 Z",
    side: "M270,130 L320,85 L320,175 L270,220 Z",
  };
  const cube2 = {
    front: "M140,125 L280,125 L280,215 L140,215 Z",
    top: "M140,125 L190,80 L330,80 L280,125 Z",
    side: "M280,125 L330,80 L330,170 L280,215 Z",
  };

  const vertices1 = [
    [130, 130], [270, 130], [270, 220], [130, 220],
    [180, 85], [320, 85], [320, 175],
  ];
  const vertices2 = [
    [140, 125], [280, 125], [280, 215], [140, 215],
    [190, 80], [330, 80], [330, 170],
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <text x="200" y="28" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">IMMERSIVE</text>

      {/* Cube projection A */}
      <g style={{ animation: "ha-cube-a 6s ease-in-out infinite" }}>
        <path d={cube1.front} fill="var(--ltx-violet)" opacity="0.15" stroke="var(--ltx-violet)" strokeWidth="1.5" />
        <path d={cube1.top} fill="var(--ltx-violet)" opacity="0.1" stroke="var(--ltx-violet)" strokeWidth="1.5" />
        <path d={cube1.side} fill="var(--ltx-violet)" opacity="0.2" stroke="var(--ltx-violet)" strokeWidth="1.5" />
        {vertices1.map(([vx, vy], i) => (
          <circle key={`ha8-va-${i}`} cx={vx} cy={vy} r="3.5" fill="var(--ltx-violet)" opacity="0.8"
            style={{ ...sc, animation: `ha-vertex-glow 2s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
      </g>

      {/* Cube projection B — complementary crossfade */}
      <g style={{ animation: "ha-cube-b 6s ease-in-out infinite" }}>
        <path d={cube2.front} fill="var(--ltx-violet)" opacity="0.15" stroke="var(--ltx-violet)" strokeWidth="1.5" />
        <path d={cube2.top} fill="var(--ltx-violet)" opacity="0.1" stroke="var(--ltx-violet)" strokeWidth="1.5" />
        <path d={cube2.side} fill="var(--ltx-violet)" opacity="0.2" stroke="var(--ltx-violet)" strokeWidth="1.5" />
        {vertices2.map(([vx, vy], i) => (
          <circle key={`ha8-vb-${i}`} cx={vx} cy={vy} r="3.5" fill="var(--ltx-violet)" opacity="0.8"
            style={{ ...sc, animation: `ha-vertex-glow 2s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
      </g>

      {/* Perspective grid floor */}
      <g stroke="var(--ltx-violet)" strokeWidth="0.4" opacity="0.35">
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`ha8-fg-${i}`} x1={80 + i * 52} y1="255" x2={110 + i * 52} y2="240" />
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <line key={`ha8-fh-${i}`} x1="80" y1={242 + i * 7} x2="340" y2={242 + i * 7} />
        ))}
      </g>

      <text x="200" y="278" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">EXPERIENTIAL</text>
    </svg>
  );
}

/* -----------------------------------------------
   9. Brand Identity — Type Specimen + Swatches
   ----------------------------------------------- */
function TypeSpecimen() {
  const swatches = [
    "var(--ltx-pink)", "var(--ltx-violet)", "var(--ltx-sky)",
    "var(--ltx-studio)", "var(--ltx-green)",
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <text x="200" y="25" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">VISUAL IDENTITY</text>

      {/* Large "Aa" type specimen */}
      <text x="60" y="145" fill="var(--ltx-pink)" fontSize="85" fontFamily="var(--font-display, sans-serif)" fontWeight="700" opacity="0.4"
        style={{ animation: "ha-type-reveal 4s ease-out infinite" }}
      >
        Aa
      </text>

      {/* Text specimen lines */}
      <g style={{ animation: "ha-type-reveal 4s ease-out 0.3s infinite" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`ha9-line-${i}`}
            x="230" y={65 + i * 22}
            width={130 - i * 18} height="8" rx="2"
            fill="var(--ltx-pink)" opacity={0.2 + i * 0.05}
          />
        ))}
      </g>

      {/* Divider */}
      <line x1="50" y1="185" x2="350" y2="185" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.55" />

      {/* Color swatches */}
      <g transform="translate(55, 200)">
        {swatches.map((color, i) => (
          <g key={`ha9-sw-${i}`} style={{ ...sc, animation: `ha-swatch-pulse 3s ease-in-out ${i * 0.4}s infinite` }}>
            <rect x={i * 60} y="0" width="50" height="34" rx="6" fill={color} opacity="0.45" stroke={color} strokeWidth="0.5" />
            <rect x={i * 60 + 4} y="40" width="42" height="3" rx="1.5" fill="var(--ltx-border)" opacity="0.4" />
          </g>
        ))}
      </g>

      <text x="200" y="275" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">BRAND SYSTEM</text>
    </svg>
  );
}

/* -----------------------------------------------
   10. Cross-platform Content Pipelines — Pipeline Flow
   ----------------------------------------------- */
function PipelineFlow() {
  const stages = [
    { label: "INGEST", x: 40 },
    { label: "EDIT", x: 130 },
    { label: "REVIEW", x: 220 },
    { label: "DIST", x: 310 },
  ];

  const platforms = [
    { label: "WEB", x: 65 },
    { label: "MOBILE", x: 145 },
    { label: "SOCIAL", x: 235 },
    { label: "BROADCAST", x: 310 },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <text x="200" y="30" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">CONTENT PIPELINE</text>

      {/* Connection lines with flow particles */}
      {[0, 1, 2].map((i) => {
        const x1 = stages[i].x + 55;
        const x2 = stages[i + 1].x;
        return (
          <g key={`ha10-conn-${i}`}>
            <line x1={x1} y1="120" x2={x2} y2="120" stroke="var(--ltx-studio)" strokeWidth="1" opacity="0.4" strokeDasharray="4 4"
              style={{ animation: `ha-pipeline-flow 2s linear ${i * 0.3}s infinite` }}
            />
            <circle r="3" fill="var(--ltx-studio)" opacity="0.7">
              <animateMotion dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" path={`M${x1},120 L${x2},120`} />
            </circle>
            <polygon points={`${x2 - 2},116 ${x2 + 4},120 ${x2 - 2},124`} fill="var(--ltx-studio)" opacity="0.55" />
          </g>
        );
      })}

      {/* Stage boxes */}
      {stages.map((stage, i) => (
        <g key={`ha10-stage-${i}`}>
          <rect x={stage.x} y="90" width="55" height="60" rx="6" fill="var(--ltx-bg-alt)" stroke="var(--ltx-studio)" strokeWidth="1.5" opacity="0.9" />
          <rect x={stage.x} y="90" width="55" height="60" rx="6" fill="var(--ltx-studio)" opacity="0.05"
            style={{ animation: `ha-stage-active 4s ease-in-out ${i * 1}s infinite` }}
          />
          <text x={stage.x + 27.5} y="125" textAnchor="middle" fill="var(--ltx-studio)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600">{stage.label}</text>
          <circle cx={stage.x + 27.5} cy="98" r="6" fill="var(--ltx-studio)" opacity="0.3" />
          <text x={stage.x + 27.5} y="101" textAnchor="middle" fill="var(--ltx-studio)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.65">{i + 1}</text>
        </g>
      ))}

      {/* Output fan lines from DIST to platforms */}
      <g stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2">
        {platforms.map((p, i) => (
          <line key={`ha10-out-${i}`} x1="337" y1="150" x2={p.x + 20} y2="195" />
        ))}
      </g>

      {/* Platform output labels */}
      <g opacity="0.5">
        {platforms.map((p, i) => (
          <g key={`ha10-plat-${i}`}>
            <rect x={p.x} y="198" width={i === 3 ? 60 : 44} height="14" rx="2" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="0.5" />
            <text x={p.x + (i === 3 ? 30 : 22)} y="209" textAnchor="middle" fill="var(--ltx-muted)" fontSize="6" fontFamily="var(--font-mono)">{p.label}</text>
          </g>
        ))}
      </g>

      <text x="200" y="240" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">4 PLATFORMS</text>
    </svg>
  );
}

/* -----------------------------------------------
   11. Talent & Crew Management — Org Chart
   ----------------------------------------------- */

/* Person icon — extracted outside OrgChart to avoid re-creation on render */
function OrgPerson({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g style={{ animation: `ha-org-pulse 3s ease-in-out ${delay}s infinite` }}>
      <circle cx={x} cy={y - 6} r="6" fill="var(--ltx-green)" opacity="0.5" stroke="var(--ltx-green)" strokeWidth="1.2" />
      <path d={`M${x - 8},${y + 10} Q${x - 8},${y + 2} ${x},${y + 2} Q${x + 8},${y + 2} ${x + 8},${y + 10}`} fill="var(--ltx-green)" opacity="0.55" stroke="var(--ltx-green)" strokeWidth="1.2" />
    </g>
  );
}

function OrgChart() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <text x="200" y="25" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">ORG CHART</text>

      {/* Tier 1: 1 person (top) */}
      <OrgPerson x={200} y={60} delay={0} />

      {/* Connection lines tier 1 → 2 */}
      <line x1="200" y1="75" x2="120" y2="118" stroke="var(--ltx-green)" strokeWidth="1.2" opacity="0.7" />
      <line x1="200" y1="75" x2="200" y2="118" stroke="var(--ltx-green)" strokeWidth="1.2" opacity="0.7" />
      <line x1="200" y1="75" x2="280" y2="118" stroke="var(--ltx-green)" strokeWidth="1.2" opacity="0.7" />

      {/* Tier 2: 3 people */}
      <OrgPerson x={120} y={130} delay={0.3} />
      <OrgPerson x={200} y={130} delay={0.5} />
      <OrgPerson x={280} y={130} delay={0.7} />

      {/* Connection lines tier 2 → 3 — reach into tier 3 heads */}
      {[120, 200, 280].map((px, i) => (
        <g key={`ha11-conn-${i}`}>
          <line x1={px} y1="145" x2={px - 30} y2="188" stroke="var(--ltx-green)" strokeWidth="1" opacity="0.6" />
          <line x1={px} y1="145" x2={px + 30} y2="188" stroke="var(--ltx-green)" strokeWidth="1" opacity="0.6" />
        </g>
      ))}

      {/* Tier 3: 6 people */}
      {[90, 150, 170, 230, 250, 310].map((px, i) => (
        <OrgPerson key={`ha11-t3-${i}`} x={px} y={200} delay={0.9 + i * 0.15} />
      ))}

      {/* Stats bar */}
      <g transform="translate(100, 240)">
        <rect x="0" y="0" width="200" height="24" rx="4" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="0.5" />
        <text x="20" y="16" fill="var(--ltx-green)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700" opacity="0.65">247</text>
        <text x="55" y="16" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">crew across</text>
        <text x="140" y="16" fill="var(--ltx-green)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700" opacity="0.65">12</text>
        <text x="158" y="16" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">depts</text>
      </g>

      <text x="200" y="285" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">TALENT MGMT</text>
    </svg>
  );
}

/* -----------------------------------------------
   12. Emerging Tech R&D — Circuit Board
   ----------------------------------------------- */
function CircuitBoard() {
  const junctions = [
    { x: 80, y: 80 }, { x: 160, y: 60 }, { x: 260, y: 80 }, { x: 330, y: 100 },
    { x: 100, y: 180 }, { x: 200, y: 200 }, { x: 290, y: 170 }, { x: 340, y: 210 },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <text x="200" y="28" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">R&D LAB</text>

      {/* PCB traces */}
      <g stroke="var(--ltx-sky)" strokeWidth="1.5" opacity="0.6" fill="none">
        {/* Top row traces */}
        <path d="M80,80 L140,80" />
        <path d="M200,60 L260,60 L260,80" />
        <path d="M260,80 L330,80 L330,100" />
        {/* Bottom row traces */}
        <path d="M100,180 L140,180" />
        <path d="M200,200 L290,200 L290,170" />
        <path d="M290,170 L340,170 L340,210" />
        {/* Vertical connections to chips */}
        <path d="M80,80 L80,180 L100,180" />
        <path d="M160,60 L160,104" />
        <path d="M184,104 L200,104 L200,150 L200,200" />
        <path d="M260,80 L260,114" />
        <path d="M310,150 L310,170 L340,170" />
        <path d="M330,100 L330,120" />
        {/* Ground trace */}
        <path d="M200,200 L200,235" />
      </g>

      {/* MCU chip */}
      <g>
        <rect x="140" y="110" width="60" height="40" rx="3" fill="var(--ltx-bg-alt)" stroke="var(--ltx-sky)" strokeWidth="1.5" opacity="0.85"
          style={{ animation: "ha-chip-glow 4s ease-in-out infinite" }}
        />
        <text x="170" y="135" textAnchor="middle" fill="var(--ltx-sky)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.7">MCU</text>
        {/* Evenly spaced pins — top */}
        {[0, 1, 2, 3].map((p) => (
          <line key={`ha12-p1-${p}`} x1={150 + p * 14} y1="110" x2={150 + p * 14} y2="104" stroke="var(--ltx-sky)" strokeWidth="1" opacity="0.7" />
        ))}
        {/* Bottom pins */}
        {[0, 1, 2, 3].map((p) => (
          <line key={`ha12-p2-${p}`} x1={150 + p * 14} y1="150" x2={150 + p * 14} y2="156" stroke="var(--ltx-sky)" strokeWidth="1" opacity="0.7" />
        ))}
      </g>

      {/* GPU chip */}
      <g>
        <rect x="260" y="120" width="50" height="30" rx="3" fill="var(--ltx-bg-alt)" stroke="var(--ltx-sky)" strokeWidth="1.5" opacity="0.85"
          style={{ animation: "ha-chip-glow 4s ease-in-out 2s infinite" }}
        />
        <text x="285" y="140" textAnchor="middle" fill="var(--ltx-sky)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.7">GPU</text>
        {/* Evenly spaced pins — top */}
        {[0, 1, 2].map((p) => (
          <line key={`ha12-p3-${p}`} x1={272 + p * 13} y1="120" x2={272 + p * 13} y2="114" stroke="var(--ltx-sky)" strokeWidth="1" opacity="0.7" />
        ))}
        {/* Bottom pins */}
        {[0, 1, 2].map((p) => (
          <line key={`ha12-p4-${p}`} x1={272 + p * 13} y1="150" x2={272 + p * 13} y2="156" stroke="var(--ltx-sky)" strokeWidth="1" opacity="0.7" />
        ))}
      </g>

      {/* Junction nodes */}
      {junctions.map((j, i) => (
        <circle key={`ha12-jn-${i}`} cx={j.x} cy={j.y} r="4.5" fill="var(--ltx-sky)" opacity="0.85"
          style={{ animation: `ha-node-blink 2s steps(3) ${i * 0.25}s infinite` }}
        />
      ))}

      {/* Ground symbol — connected to trace */}
      <g transform="translate(200, 235)" opacity="0.7">
        <line x1="0" y1="0" x2="0" y2="8" stroke="var(--ltx-sky)" strokeWidth="1" />
        <line x1="-10" y1="8" x2="10" y2="8" stroke="var(--ltx-sky)" strokeWidth="1" />
        <line x1="-6" y1="12" x2="6" y2="12" stroke="var(--ltx-sky)" strokeWidth="1" />
        <line x1="-2" y1="16" x2="2" y2="16" stroke="var(--ltx-sky)" strokeWidth="1" />
      </g>

      <text x="200" y="278" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.5">EMERGING TECH</text>
    </svg>
  );
}
