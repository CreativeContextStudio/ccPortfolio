"use client";

import { useMemo } from "react";

interface SectionTearProps {
  seed: string;
  colorAbove?: string;
  colorBelow?: string;
  bleedColor?: string;
  character?: "gentle" | "sharp" | "calm";
}

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1);
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
  };
}

function generateTornPath(seed: string, character: "gentle" | "sharp" | "calm") {
  const rng = seededRandom(seed);
  const points = 25;
  const width = 1200;
  const baseY = 30;

  const amplitudes: Record<string, { min: number; max: number }> = {
    gentle: { min: 8, max: 16 },
    sharp: { min: 10, max: 20 },
    calm: { min: 6, max: 12 },
  };

  const amp = amplitudes[character];
  const coords: [number, number][] = [];

  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    const displacement = amp.min + rng() * (amp.max - amp.min);
    const direction = rng() > 0.5 ? 1 : -1;
    coords.push([x, baseY + displacement * direction]);
  }

  let d = `M0,0 L0,${coords[0][1]}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const cpx1 = prev[0] + (curr[0] - prev[0]) * (0.3 + rng() * 0.2);
    const cpy1 = prev[1] + (rng() - 0.5) * (character === "sharp" ? 12 : 6);
    const cpx2 = prev[0] + (curr[0] - prev[0]) * (0.6 + rng() * 0.2);
    const cpy2 = curr[1] + (rng() - 0.5) * (character === "sharp" ? 12 : 6);
    d += ` C${cpx1},${cpy1} ${cpx2},${cpy2} ${curr[0]},${curr[1]}`;
  }
  d += ` L${width},0 Z`;

  let d2 = `M0,60 L0,${coords[0][1]}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const cpx1 = prev[0] + (curr[0] - prev[0]) * (0.3 + rng() * 0.2);
    const cpy1 = prev[1] + (rng() - 0.5) * 4;
    const cpx2 = prev[0] + (curr[0] - prev[0]) * (0.6 + rng() * 0.2);
    const cpy2 = curr[1] + (rng() - 0.5) * 4;
    d2 += ` C${cpx1},${cpy1} ${cpx2},${cpy2} ${curr[0]},${curr[1]}`;
  }
  d2 += ` L${width},60 Z`;

  return { topPath: d, bottomPath: d2 };
}

export function SectionTear({
  seed,
  colorAbove = "var(--ltx-bg-alt)",
  colorBelow = "var(--background)",
  bleedColor,
  character = "gentle",
}: SectionTearProps) {
  const { topPath, bottomPath } = useMemo(
    () => generateTornPath(seed, character),
    [seed, character]
  );

  return (
    <div className="relative w-full h-0" aria-hidden="true" style={{ marginTop: "-1px" }}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: "40px" }}
      >
        <path d={topPath} style={{ fill: colorAbove }} />
        <path d={bottomPath} style={{ fill: colorBelow }} />
      </svg>
      {bleedColor && (
        <div
          className="absolute left-0 right-0 h-10 pointer-events-none"
          style={{
            top: "100%",
            background: `linear-gradient(to bottom, ${bleedColor}0d, transparent)`,
          }}
        />
      )}
    </div>
  );
}
