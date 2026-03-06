"use client";

/* ==============================================
   Section Pillar Illustrations
   Four CSS-animated SVG illustrations, one per pillar.
   Each is a single 16:9 SVG composing all elements.
   All colors via CSS variables. Stateless, decorative only.
   ============================================== */

const reducedMotionStyle = `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }`;

/* -----------------------------------------------
   1. Creative Producing — "The Viewfinder"
   Viewfinder + storyboard strip + color grade
   ----------------------------------------------- */
export function CreativeProducingIllustration() {
  return (
    <svg viewBox="0 0 960 540" className="section-illustration w-full h-auto" aria-hidden="true" style={{ pointerEvents: "none" }}>
      <style>{reducedMotionStyle}</style>

      {/* === Viewfinder (left) === */}
      <g transform="translate(30, 10) scale(1.3)">
        <defs>
          <clipPath id="cp-viewfinder-clip">
            <rect x="40" y="60" width="280" height="210" rx="4" />
          </clipPath>
        </defs>

        <rect x="30" y="50" width="300" height="230" rx="8" fill="none" stroke="var(--ltx-border)" strokeWidth="2" />
        <rect x="40" y="60" width="280" height="210" rx="4" fill="var(--ltx-bg-alt)" />

        <g stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.8">
          <line x1="133" y1="60" x2="133" y2="270" />
          <line x1="227" y1="60" x2="227" y2="270" />
          <line x1="40" y1="130" x2="320" y2="130" />
          <line x1="40" y1="200" x2="320" y2="200" />
        </g>

        <g clipPath="url(#cp-viewfinder-clip)" style={{ animation: "cp-scene-a 9s ease-in-out infinite" }}>
          <rect x="60" y="180" width="20" height="80" fill="var(--ltx-pink)" opacity="0.55" />
          <rect x="90" y="150" width="25" height="110" fill="var(--ltx-pink)" opacity="0.45" />
          <rect x="125" y="170" width="18" height="90" fill="var(--ltx-pink)" opacity="0.5" />
          <rect x="155" y="130" width="30" height="130" fill="var(--ltx-pink)" opacity="0.4" />
          <rect x="195" y="155" width="22" height="105" fill="var(--ltx-pink)" opacity="0.55" />
          <rect x="230" y="140" width="28" height="120" fill="var(--ltx-pink)" opacity="0.45" />
          <rect x="270" y="165" width="20" height="95" fill="var(--ltx-pink)" opacity="0.55" />
        </g>

        <g clipPath="url(#cp-viewfinder-clip)" style={{ animation: "cp-scene-b 9s ease-in-out infinite" }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            const h = [30, 50, 70, 45, 80, 60, 35, 55, 75, 40, 65, 50][i];
            return (
              <rect key={`wave-${i}`} x={60 + i * 22} y={165 - h / 2} width="14" height={h} rx="2" fill="var(--ltx-pink)" opacity="0.55" />
            );
          })}
        </g>

        <g clipPath="url(#cp-viewfinder-clip)" style={{ animation: "cp-scene-c 9s ease-in-out infinite" }}>
          <circle cx="180" cy="165" r="40" fill="none" stroke="var(--ltx-pink)" strokeWidth="2" opacity="0.55" />
          <polygon points="180,130 210,180 150,180" fill="none" stroke="var(--ltx-pink)" strokeWidth="2" opacity="0.45" />
          <rect x="165" y="150" width="30" height="30" fill="none" stroke="var(--ltx-pink)" strokeWidth="1.5" opacity="0.4" />
        </g>

        <g stroke="var(--ltx-pink)" strokeWidth="1.5" opacity="0.8" style={{ animation: "cp-registration-breathe 6s ease-in-out infinite" }}>
          <path d="M50,75 L50,65 L60,65" fill="none" />
          <path d="M310,75 L310,65 L300,65" fill="none" />
          <path d="M50,255 L50,265 L60,265" fill="none" />
          <path d="M310,255 L310,265 L300,265" fill="none" />
        </g>

        <circle cx="60" cy="300" r="5" fill="var(--ltx-pink)" style={{ animation: "cp-rec-pulse 2s ease-in-out infinite" }} />
        <text x="72" y="304" fill="var(--ltx-pink)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">REC</text>

        <rect x="120" y="290" width="200" height="20" rx="3" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="1" />
        <text x="130" y="304" fill="var(--ltx-muted)" fontSize="10" fontFamily="var(--font-mono)" style={{ animation: "cp-timecode-tick 1s steps(1) infinite" }}>
          01:23:45:12
        </text>
      </g>

      {/* === Storyboard Strip (right, upper) === */}
      <g transform="translate(490, 40) scale(1.2)">
        <text x="30" y="18" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">STORYBOARD</text>
        <g fill="var(--ltx-border)" opacity="0.6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <rect key={`ft-${i}`} x={30 + i * 32} y="26" width="10" height="6" rx="1" />
          ))}
        </g>
        {[0, 1, 2, 3].map((i) => (
          <g key={`sb-${i}`} style={{ animation: `cp-storyboard-wipe 8s ease-in-out ${i * 2}s infinite` }}>
            <rect x={30 + i * 80} y="38" width="72" height="48" rx="3" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="1" />
            {i === 0 && (
              <g opacity="0.55">
                <circle cx={66} cy="55" r="8" fill="none" stroke="var(--ltx-pink)" strokeWidth="1" />
                <line x1={50} y1="72" x2={82} y2="72" stroke="var(--ltx-pink)" strokeWidth="0.5" />
              </g>
            )}
            {i === 1 && (
              <g opacity="0.55">
                <rect x={130} y="48" width="32" height="20" rx="2" fill="none" stroke="var(--ltx-pink)" strokeWidth="1" />
              </g>
            )}
            {i === 2 && (
              <g opacity="0.55">
                <polygon points="226,48 238,68 214,68" fill="none" stroke="var(--ltx-pink)" strokeWidth="1" />
              </g>
            )}
            {i === 3 && (
              <g opacity="0.55">
                <path d="M290,62 Q306,44 322,62" fill="none" stroke="var(--ltx-pink)" strokeWidth="1" />
              </g>
            )}
            <text x={66 + i * 80} y="98" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">
              {`${i + 1}A`}
            </text>
          </g>
        ))}
        <g fill="var(--ltx-border)" opacity="0.6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <rect key={`fb-${i}`} x={30 + i * 32} y="104" width="10" height="6" rx="1" />
          ))}
        </g>
        <line x1="30" y1="116" x2="330" y2="116" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.55" />
        <rect x="30" y="114" width="60" height="4" rx="2" fill="var(--ltx-pink)" opacity="0.55" style={{ animation: "cp-storyboard-progress 8s linear infinite" }} />
      </g>

      {/* === Color Palette (right, lower) === */}
      <g transform="translate(490, 310) scale(1.2)">
        <text x="30" y="18" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">COLOR GRADE</text>
        {[
          { color: "var(--ltx-pink)", label: "PRIMARY" },
          { color: "var(--ltx-violet)", label: "ACCENT" },
          { color: "var(--ltx-sky)", label: "COOL" },
          { color: "var(--ltx-lavender)", label: "FILL" },
          { color: "var(--ltx-muted)", label: "NEUTRAL" },
        ].map((swatch, i) => (
          <g key={`sw-${i}`} style={{ animation: `cp-swatch-pulse 5s ease-in-out ${i * 1}s infinite` }}>
            <rect x={30 + i * 62} y="28" width="52" height="28" rx="4" fill={swatch.color} opacity="0.45" stroke={swatch.color} strokeWidth="0.5" />
            <text x={56 + i * 62} y="68" textAnchor="middle" fill="var(--ltx-muted)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.6">
              {swatch.label}
            </text>
          </g>
        ))}
      </g>

      {/* Connecting line between viewfinder and storyboard */}
      <line x1="470" y1="200" x2="490" y2="120" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 4" />
      <line x1="470" y1="300" x2="490" y2="380" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.4" strokeDasharray="4 4" />
    </svg>
  );
}

/* -----------------------------------------------
   2. Agentic Creative & AI — "The Neural Constellation"
   Central brain node + terminal + eval gauge
   ----------------------------------------------- */
export function AgenticCreativeAiIllustration() {
  const nodes = [
    { label: "LLM", x: 180, y: 80 },
    { label: "TOOLS", x: 290, y: 140 },
    { label: "MEMORY", x: 290, y: 260 },
    { label: "EVAL", x: 180, y: 320 },
    { label: "CONTEXT", x: 70, y: 260 },
    { label: "OUTPUT", x: 70, y: 140 },
  ];
  const cx = 180, cy = 200;

  return (
    <svg viewBox="0 0 960 540" className="section-illustration w-full h-auto" aria-hidden="true" style={{ pointerEvents: "none" }}>
      <style>{reducedMotionStyle}</style>

      {/* === Neural Constellation (left) === */}
      <g transform="translate(20, 20) scale(1.25)">
        <defs>
          <filter id="ac-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodes.map((node, i) => (
          <g key={`conn-${i}`}>
            <line
              x1={cx} y1={cy}
              x2={node.x} y2={node.y}
              stroke="var(--ltx-studio)"
              strokeWidth="1"
              opacity="0.55"
              strokeDasharray="4 4"
              style={{ animation: `ac-data-flow 1.2s linear ${i * 0.2}s infinite` }}
            />
            <circle r="3" fill="var(--ltx-studio)" opacity="0.85">
              <animateMotion
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
                path={`M${cx},${cy} L${node.x},${node.y}`}
              />
            </circle>
          </g>
        ))}

        <polygon
          points="180,170 205,185 205,215 180,230 155,215 155,185"
          fill="var(--ltx-bg-alt)"
          stroke="var(--ltx-studio)"
          strokeWidth="2"
          filter="url(#ac-glow)"
          style={{ animation: "ac-hex-glow 4s ease-in-out infinite" }}
        />
        <text x="180" y="205" textAnchor="middle" fill="var(--ltx-studio)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600">
          AGENT
        </text>

        {nodes.map((node, i) => (
          <g key={`node-${i}`} style={{ animation: `ac-node-pulse 3s ease-in-out ${i * 0.5}s infinite` }}>
            <circle cx={node.x} cy={node.y} r="22" fill="var(--ltx-bg-alt)" stroke="var(--ltx-studio)" strokeWidth="1.5" opacity="0.9" />
            <text x={node.x} y={node.y + 4} textAnchor="middle" fill="var(--ltx-studio)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="500">
              {node.label}
            </text>
          </g>
        ))}

        <g opacity="0" style={{ animation: "ac-output-reveal-1 12s ease-in-out infinite" }}>
          <rect x="140" y="30" width="16" height="20" rx="2" fill="none" stroke="var(--ltx-studio)" strokeWidth="1" opacity="0.7" />
          <line x1="144" y1="38" x2="152" y2="38" stroke="var(--ltx-studio)" strokeWidth="0.5" opacity="0.7" />
          <line x1="144" y1="42" x2="150" y2="42" stroke="var(--ltx-studio)" strokeWidth="0.5" opacity="0.7" />
        </g>
        <path d="M180,35 Q190,25 200,35 Q210,45 195,42" fill="none" stroke="var(--ltx-studio)" strokeWidth="1.5" opacity="0" strokeLinecap="round" style={{ animation: "ac-output-reveal-2 12s ease-in-out 4s infinite" }} />
        <g opacity="0" style={{ animation: "ac-output-reveal-3 12s ease-in-out 8s infinite" }}>
          <text x="225" y="42" fill="var(--ltx-studio)" fontSize="16" fontFamily="var(--font-mono)" opacity="0.7">{`{/}`}</text>
        </g>
      </g>

      {/* === Prompt Terminal (right, upper) === */}
      <g transform="translate(490, 30) scale(1.25)">
        <rect x="30" y="8" width="300" height="95" rx="6" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="1" />
        <rect x="30" y="8" width="300" height="18" rx="6" fill="var(--ltx-border)" opacity="0.55" />
        <circle cx="46" cy="17" r="3" fill="var(--ltx-pink)" opacity="0.7" />
        <circle cx="58" cy="17" r="3" fill="var(--ltx-sky)" opacity="0.55" />
        <circle cx="70" cy="17" r="3" fill="var(--ltx-green)" opacity="0.55" />
        <text x="180" y="21" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">agent-cli</text>
        <text x="42" y="42" fill="var(--ltx-studio)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.7">$</text>
        <text x="54" y="42" fill="var(--ltx-muted)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.8" style={{ animation: "ac-prompt-type 4s steps(20) infinite" }}>
          think &rarr; plan &rarr; execute
        </text>
        <rect x="210" y="33" width="7" height="12" rx="1" fill="var(--ltx-studio)" opacity="0.8" style={{ animation: "ac-cursor-blink 1s steps(1) infinite" }} />
        <text x="42" y="60" fill="var(--ltx-green)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.6" style={{ animation: "ac-output-line 4s ease-in-out 2s infinite" }}>
          [ok] context loaded, tools ready
        </text>
        <text x="42" y="76" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.55" style={{ animation: "ac-token-scroll 6s linear infinite" }}>
          generating response...
        </text>
        <rect x="30" y="88" width="300" height="15" rx="0" fill="var(--ltx-border)" opacity="0.3" />
        <text x="42" y="99" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55">tokens: 2,847</text>
        <text x="270" y="99" fill="var(--ltx-studio)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.55" textAnchor="end">latency: 340ms</text>
      </g>

      {/* === Eval Gauge (right, lower) === */}
      <g transform="translate(490, 280) scale(1.25)">
        <text x="30" y="14" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">EVAL SCORE</text>
        <path d="M100,80 A60,60 0 0,1 260,80" fill="none" stroke="var(--ltx-border)" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
        <path d="M100,80 A60,60 0 0,1 260,80" fill="none" stroke="var(--ltx-studio)" strokeWidth="8" strokeLinecap="round" opacity="0.6" strokeDasharray="251" strokeDashoffset="50" style={{ animation: "ac-gauge-sweep 5s ease-in-out infinite" }} />
        <line x1="180" y1="80" x2="180" y2="35" stroke="var(--ltx-studio)" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" style={{ animation: "ac-needle-swing 5s ease-in-out infinite" }} />
        <circle cx="180" cy="80" r="4" fill="var(--ltx-studio)" opacity="0.6" />
        <text x="180" y="95" textAnchor="middle" fill="var(--ltx-studio)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700" opacity="0.8" style={{ animation: "ac-node-pulse 5s ease-in-out infinite" }}>
          92 / 100
        </text>
        <text x="95" y="90" textAnchor="middle" fill="var(--ltx-muted)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.55">0</text>
        <text x="265" y="90" textAnchor="middle" fill="var(--ltx-muted)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.55">100</text>
      </g>

      {/* Connecting lines */}
      <line x1="460" y1="200" x2="500" y2="100" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
      <line x1="460" y1="320" x2="500" y2="370" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
    </svg>
  );
}

/* -----------------------------------------------
   4. Line Producing & Production — "The Gantt Board"
   Gantt chart + budget/crew dashboard + call sheet
   ----------------------------------------------- */
export function LineProducingProductionIllustration() {
  const tracks = [
    { label: "PRE-PROD", width: 120, x: 110, color: "var(--ltx-green)" },
    { label: "PRINCIPAL", width: 140, x: 140, color: "var(--ltx-green)" },
    { label: "VFX", width: 100, x: 180, color: "var(--ltx-green)" },
    { label: "EDITORIAL", width: 130, x: 160, color: "var(--ltx-green)" },
    { label: "DELIVERY", width: 60, x: 250, color: "var(--ltx-green)" },
  ];

  return (
    <svg viewBox="0 0 960 540" className="section-illustration w-full h-auto" aria-hidden="true" style={{ pointerEvents: "none" }}>
      <style>{reducedMotionStyle}</style>

      {/* === Gantt Chart (left) === */}
      <g transform="translate(20, 20) scale(1.4)">
        <text x="30" y="25" fill="var(--ltx-muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.85">TIMELINE</text>
        <line x1="30" y1="32" x2="330" y2="32" stroke="var(--ltx-border)" strokeWidth="1" />

        {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map((w, i) => (
          <text key={w} x={110 + i * 30} y="25" textAnchor="middle" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.65">
            {w}
          </text>
        ))}

        {tracks.map((track, i) => {
          const y = 48 + i * 36;
          return (
            <g key={track.label}>
              <text x="30" y={y + 14} fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="500">
                {track.label}
              </text>
              <rect x={track.x} y={y} width={track.width} height="20" rx="3" fill={track.color} opacity="0.3" stroke={track.color} strokeWidth="0.5" />
              <rect
                x={track.x}
                y={y}
                width={track.width * 0.6}
                height="20"
                rx="3"
                fill={track.color}
                opacity="0.55"
                style={{ animation: `lp-progress-fill 8s ease-in-out ${i * 0.5}s infinite` }}
              />
              {i < tracks.length - 1 && (
                <path
                  d={`M${track.x + track.width},${y + 10} L${track.x + track.width + 8},${y + 10} L${track.x + track.width + 8},${y + 36 + 10}`}
                  fill="none"
                  stroke="var(--ltx-border)"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  opacity="0.6"
                  style={{ animation: "lp-dependency-flow 2s linear infinite" }}
                />
              )}
            </g>
          );
        })}

        <rect x="110" y="38" width="220" height="182" rx="2" fill="var(--ltx-green)" opacity="0.06" style={{ animation: "lp-gantt-shimmer 6s ease-in-out infinite" }} />

        <line x1="200" y1="32" x2="200" y2="230" stroke="var(--ltx-green)" strokeWidth="1.5" opacity="0.7" strokeDasharray="4 2" style={{ animation: "lp-today-sweep 12s ease-in-out infinite" }} />
        <text x="200" y="245" textAnchor="middle" fill="var(--ltx-green)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.8" style={{ animation: "lp-today-sweep 12s ease-in-out infinite" }}>
          TODAY
        </text>
      </g>

      {/* === Budget + Crew Dashboard (right, upper) === */}
      <g transform="translate(510, 30) scale(1.25)">
        <g transform="translate(90, 50)">
          <text x="0" y="-35" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.65">BUDGET</text>
          <circle cx="0" cy="0" r="28" fill="none" stroke="var(--ltx-border)" strokeWidth="6" opacity="0.55" />
          <circle
            cx="0" cy="0" r="28"
            fill="none"
            stroke="var(--ltx-green)"
            strokeWidth="6"
            strokeDasharray="153 23"
            strokeLinecap="round"
            transform="rotate(-90 0 0)"
            style={{ animation: "lp-budget-rotate 8s ease-in-out infinite" }}
          />
          <text x="0" y="5" textAnchor="middle" fill="var(--ltx-green)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="700">87%</text>
        </g>
        <g transform="translate(270, 50)">
          <text x="0" y="-35" textAnchor="middle" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.65">CREW</text>
          <rect x="-35" y="-18" width="70" height="36" rx="5" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="1" />
          <text x="0" y="7" textAnchor="middle" fill="var(--ltx-green)" fontSize="18" fontFamily="var(--font-mono)" fontWeight="700" style={{ animation: "lp-crew-tick 4s steps(1) infinite" }}>
            247
          </text>
        </g>
        <line x1="180" y1="15" x2="180" y2="85" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.55" />
      </g>

      {/* === Call Sheet (right, lower) === */}
      <g transform="translate(510, 230) scale(1.2)">
        <text x="30" y="14" fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="1" opacity="0.65">CALL SHEET</text>
        <rect x="30" y="22" width="300" height="100" rx="4" fill="var(--ltx-bg-alt)" stroke="var(--ltx-border)" strokeWidth="1" />
        <rect x="30" y="22" width="300" height="16" rx="4" fill="var(--ltx-green)" opacity="0.15" />
        <text x="42" y="33" fill="var(--ltx-green)" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600" opacity="0.65">DAY 23 OF 45</text>
        <text x="318" y="33" textAnchor="end" fill="var(--ltx-muted)" fontSize="7" fontFamily="var(--font-mono)" opacity="0.6">CALL: 06:00</text>
        {[
          { text: "Location scout approved", delay: 0 },
          { text: "Talent confirmed (5/5)", delay: 1.5 },
          { text: "Equipment manifest signed", delay: 3 },
          { text: "Catering ordered", delay: 4.5 },
          { text: "Transport scheduled", delay: 6 },
        ].map((item, i) => (
          <g key={`check-${i}`}>
            <rect x="42" y={44 + i * 14} width="10" height="10" rx="2" fill="none" stroke="var(--ltx-border)" strokeWidth="1" />
            <path
              d={`M44,${49 + i * 14} L46,${52 + i * 14} L50,${46 + i * 14}`}
              fill="none"
              stroke="var(--ltx-green)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0"
              style={{ animation: `lp-check-appear 8s ease-in-out ${item.delay}s infinite` }}
            />
            <text x="58" y={52 + i * 14} fill="var(--ltx-muted)" fontSize="8" fontFamily="var(--font-mono)" opacity="0.65">
              {item.text}
            </text>
          </g>
        ))}
      </g>

      {/* Connecting lines */}
      <line x1="485" y1="200" x2="520" y2="120" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
      <line x1="485" y1="300" x2="520" y2="320" stroke="var(--ltx-border)" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
    </svg>
  );
}
