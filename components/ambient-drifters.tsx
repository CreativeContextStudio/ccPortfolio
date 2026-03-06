"use client";

export function SatelliteDrifter() {
  return (
    <div className="ambient-satellite-wrap" aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        {/* solar panel left */}
        <rect x="1" y="14" width="11" height="12" rx="1" stroke="var(--ltx-sky)" strokeWidth="1.5" fill="none" />
        <line x1="4.5" y1="16" x2="4.5" y2="24" stroke="var(--ltx-sky)" strokeWidth="0.8" />
        <line x1="8" y1="16" x2="8" y2="24" stroke="var(--ltx-sky)" strokeWidth="0.8" />
        {/* body */}
        <rect x="13" y="12" width="14" height="16" rx="2" stroke="var(--ltx-muted)" strokeWidth="1.5" fill="none" />
        {/* solar panel right */}
        <rect x="28" y="14" width="11" height="12" rx="1" stroke="var(--ltx-sky)" strokeWidth="1.5" fill="none" />
        <line x1="31.5" y1="16" x2="31.5" y2="24" stroke="var(--ltx-sky)" strokeWidth="0.8" />
        <line x1="35" y1="16" x2="35" y2="24" stroke="var(--ltx-sky)" strokeWidth="0.8" />
        {/* antenna */}
        <line x1="20" y1="12" x2="20" y2="4" stroke="var(--ltx-muted)" strokeWidth="1.2" />
        <circle cx="20" cy="3" r="2" className="satellite-blink" />
      </svg>
    </div>
  );
}

export function BirdDrifter() {
  return (
    <div className="ambient-bird-wrap" aria-hidden="true">
      <svg className="ambient-bird" width="36" height="18" viewBox="0 0 36 18" fill="none">
        <path d="M0 16 Q9 0 18 10 Q27 0 36 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export function ShootingStarDrifter() {
  return (
    <div className="ambient-star-wrap" aria-hidden="true">
      <svg width="60" height="10" viewBox="0 0 60 10" fill="none">
        <defs>
          <linearGradient id="star-trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--ltx-pink)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--ltx-pink)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--ltx-violet)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <line x1="0" y1="5" x2="50" y2="5" stroke="url(#star-trail)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="54" cy="5" r="4" fill="white" opacity="0.95" />
        <circle cx="54" cy="5" r="2" fill="var(--ltx-pink)" opacity="0.8" />
      </svg>
    </div>
  );
}
