# SVG Animation Style Guide - Cold War Aerospace Aesthetic

A comprehensive prompt for creating consistent, theme-aware SVG animations across the portfolio.

---

## Style Brief

**Era:** 1950s-1970s aerospace and defense industry
**Mood:** Technical precision, controlled confidence, institutional authority
**References:** NASA mission control displays, military radar screens, flight instrument panels, technical documentation from Bell Labs, IBM mainframe interfaces, oscilloscope readouts

### Visual Language
These animations evoke the aesthetic of Cold War-era technical systems—the kind of displays you'd find in a missile tracking station, a nuclear submarine's control room, or an early space program mission control center. The style communicates *competence through restraint*: every element serves a purpose, nothing is decorative for decoration's sake.

### Key Characteristics
- **Grid-based precision:** Everything aligns to an invisible grid, suggesting engineering rigor
- **Monospace typography:** Recalls teletype machines, punch cards, and early computer terminals
- **Muted motion:** Animations are smooth and purposeful, never frantic—like instrument needles or radar sweeps
- **Status indicators:** Pulsing dots, data streams, and stage markers communicate system state
- **Dashed lines:** Suggest data transmission, trajectories, or connections between systems
- **Corner brackets:** Viewfinder-style markers frame content like a targeting system
- **Layered opacity:** Creates depth without perspective, like overlaid transparencies on a light table

### What to Avoid
- Playful or whimsical motion (no bouncing, squashing, or cartoon physics)
- Bright, saturated colors competing for attention
- Decorative elements that don't convey information
- Fast, attention-grabbing animations
- Rounded, organic shapes (prefer rectangles, circles, straight lines)
- Drop shadows or glossy effects (flat, technical rendering only)

### The Feeling
When someone sees these animations, they should feel like they're looking at something *important and precise*—a system designed by serious engineers to display critical information. The aesthetic says: "This was built by people who know what they're doing."

---

## Quick Reference

**File:** `app/components/StudioLabAnimations.tsx`
**Keyframes:** `app/globals.css` (under `/* Studio Lab Project Animations */`)
**Sizes:** Card = `viewBox="0 0 96 64"` | Detail = `viewBox="0 0 300 192"`

---

## Core Component Template

```tsx
export function AnimationName({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 64"  // or "0 0 300 192" for larger
      className={className}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Defs: patterns, gradients, clipPaths */}
      <defs>
        <pattern id="unique-grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="var(--theme-secondary)" strokeWidth="0.3" opacity="0.3" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="96" height="64" fill="url(#unique-grid)" />

      {/* Main content here */}

      {/* Reduced motion styles - REQUIRED */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animated-element {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}
```

---

## Visual Style: Cold War Aerospace Aesthetic

### Background Patterns
- **Grid patterns** using `<pattern>` with L-shaped paths
- Grid cell sizes: 8px (card), 20px (detail modal)
- Stroke: `var(--theme-secondary)`, width 0.3-0.5, opacity 0.2-0.3

### Technical Labels
- Font: `fontFamily="monospace"`
- Size: 5-10px depending on container
- Style: UPPERCASE with separators (`▸`, `→`, `●`)
- Color: `var(--theme-secondary)` at opacity 0.5-0.7
- Examples: `TRACKING`, `THEME LIBRARY ▸ 25+ PRESETS`, `0:00`

### Corner Markers (Viewfinder Style)
```svg
<g opacity="0.4">
  <path d="M 8 8 L 8 14 M 8 8 L 14 8" stroke="var(--theme-secondary)" strokeWidth="1" />
  <path d="M 88 8 L 88 14 M 88 8 L 82 8" stroke="var(--theme-secondary)" strokeWidth="1" />
  <path d="M 8 56 L 8 50 M 8 56 L 14 56" stroke="var(--theme-secondary)" strokeWidth="1" />
  <path d="M 88 56 L 88 50 M 88 56 L 82 56" stroke="var(--theme-secondary)" strokeWidth="1" />
</g>
```

### Depth & Dimension
- Opacity layering: 0.3 (far), 0.5, 0.7, 0.9 (near)
- Linear gradients for depth fades
- Dashed lines suggest distance: `strokeDasharray="3 2"` or `"4 2"`

---

## Color System - Theme Variables Only

```
var(--theme-primary)    → Main accent, highlights, active states
var(--theme-accent)     → Secondary highlight, complementary
var(--theme-secondary)  → UI chrome, labels, borders
var(--theme-background) → Fills, negative space
var(--theme-text)       → Text, strong borders
var(--theme-success)    → Status: good, online, complete
var(--theme-warning)    → Status: pending, caution
var(--theme-muted)      → Subtle backgrounds, disabled states
```

**Semantic Usage:**
- Primary elements: `--theme-primary`
- Highlights/data: `--theme-accent`
- Labels/UI: `--theme-secondary` at 0.5-0.7 opacity
- Active indicators: `--theme-success` (green dot = online)

---

## Animation Patterns

### 1. Pulse Effect
```css
@keyframes pulse-name {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 1; }
}
```
Use: Status indicators, keyframes, node highlights

### 2. Data Flow (Dashed Lines)
```css
@keyframes data-flow {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
```
Use: Connection lines, network flows

### 3. Continuous Slide
```css
@keyframes slide-name {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
Use: Carousels (duplicate content for seamless loop)

### 4. Path Following
```css
@keyframes path-follow {
  0% { transform: translate(0, 0); }
  25% { transform: translate(30px, -15px); }
  50% { transform: translate(50px, 10px); }
  75% { transform: translate(20px, 25px); }
  100% { transform: translate(0, 0); }
}
```
Use: Tracking points, cursors

### 5. 3D Rotation
```css
@keyframes wireframe-rotate {
  0% { transform: rotateY(0deg) rotateX(15deg); }
  100% { transform: rotateY(360deg) rotateX(15deg); }
}
```
Use: 3D shapes (set `transformOrigin` on the element)

### 6. Float/Drift
```css
@keyframes particle-float {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-10px); opacity: 1; }
}
```
Use: Ambient particles, background elements

### Animation Timing
- Duration: 1.5s - 4s (slower = more ambient)
- Easing: `ease-in-out` for pulses, `linear` for continuous motion
- Stagger delays: 0.25s, 0.5s, 0.75s increments

---

## Common Visual Elements

### Nodes with Pulsing Rings
```svg
<circle cx="48" cy="32" r="6" fill="var(--theme-background)"
        stroke="var(--theme-primary)" strokeWidth="2"
        style={{ animation: 'node-pulse 2s ease-in-out infinite' }} />
<circle cx="48" cy="32" r="2" fill="var(--theme-primary)" />
```

### Dashed Connection Lines
```svg
<line x1="20" y1="20" x2="80" y2="50"
      stroke="var(--theme-secondary)" strokeWidth="1.5"
      strokeDasharray="4 2"
      style={{ animation: 'data-flow 1s linear infinite' }} />
```

### User Avatar
```svg
<circle cx="75" cy="70" r="20" fill="var(--theme-background)"
        stroke="var(--theme-primary)" strokeWidth="2" />
<text x="75" y="75" fontSize="12" fontFamily="monospace" fontWeight="bold"
      textAnchor="middle" fill="var(--theme-primary)">JD</text>
<circle cx="90" cy="55" r="6" fill="var(--theme-success)"
        stroke="var(--theme-background)" strokeWidth="2" /> <!-- Online indicator -->
```

### Typing Indicator
```svg
<g style={{ animation: 'typing-indicator 1s ease-in-out infinite' }}>
  <circle cx="60" cy="90" r="2" fill="var(--theme-primary)" opacity="0.7" />
  <circle cx="68" cy="90" r="2" fill="var(--theme-primary)" opacity="0.7" />
  <circle cx="76" cy="90" r="2" fill="var(--theme-primary)" opacity="0.7" />
</g>
```

### Crosshair/Tracking Point
```svg
<g className="tracking-point" style={{ animation: 'track-point 4s ease-in-out infinite' }}>
  <line x1="20" y1="40" x2="20" y2="50" stroke="var(--theme-primary)" strokeWidth="1.5" />
  <line x1="15" y1="45" x2="25" y2="45" stroke="var(--theme-primary)" strokeWidth="1.5" />
  <circle cx="20" cy="45" r="6" fill="none" stroke="var(--theme-primary)" strokeWidth="1.5"
          style={{ animation: 'crosshair-pulse 1.5s ease-in-out infinite' }} />
  <circle cx="20" cy="45" r="2" fill="var(--theme-primary)" />
</g>
```

### Progress/Stage Bars
```svg
<rect x="20" y="158" width="260" height="8" fill="var(--theme-muted)" opacity="0.3" rx="2" />
<rect x="20" y="158" width="65" height="8" fill="var(--theme-primary)" opacity="0.8" rx="2" />
<rect x="85" y="158" width="85" height="8" fill="var(--theme-accent)" opacity="0.8" rx="2" />
```

### 3D Wireframe Cube
```svg
<g style={{ transformOrigin: '48px 32px', animation: 'wireframe-rotate 8s linear infinite' }}>
  <path d="M 33 22 L 53 22 L 53 42 L 33 42 Z" fill="none"
        stroke="var(--theme-accent)" strokeWidth="1" opacity="0.4" />
  <path d="M 43 27 L 63 27 L 63 47 L 43 47 Z" fill="none"
        stroke="var(--theme-primary)" strokeWidth="1.5" />
  <line x1="33" y1="22" x2="43" y2="27" stroke="var(--theme-secondary)" strokeWidth="1" opacity="0.6" />
  <!-- ... more edges and vertices -->
</g>
```

---

## Accessibility Requirements

**Always include reduced motion styles:**
```svg
<style>{`
  @media (prefers-reduced-motion: reduce) {
    .animated-class,
    element[style*="animation-name"] {
      animation: none !important;
    }
  }
`}</style>
```

**Target selectors by:**
- Class: `.carousel-cards`
- Attribute: `g[style*="wireframe-rotate"]`
- Element + attribute: `circle[style*="particle-float"]`

---

## File Organization

### Adding New Keyframes
Add to `app/globals.css` under the `/* Studio Lab Project Animations */` section:
```css
@keyframes new-animation-name {
  0% { /* start state */ }
  100% { /* end state */ }
}
```

### Adding New Components
Add to `app/components/StudioLabAnimations.tsx`:
1. Create function following the template above
2. Export the function
3. Import where needed

---

## Animation Concept Ideas by Theme

| Concept | Elements | Motion |
|---------|----------|--------|
| Data Pipeline | Stage boxes, flow particles | Left-to-right flow, stage pulses |
| Network/Graph | Nodes, connection lines | Node pulses, data-flow on lines |
| Timeline | Tracks, keyframe dots, playhead | Playhead sweep, dot pulses |
| Carousel | Cards, clip mask | Continuous slide, edge fades |
| Tracking | Crosshair, path, trail dots | Path-follow, crosshair pulse |
| 3D Scene | Wireframe shape, particles | Rotation, particle float |
| Collaboration | Avatars, cursors, typing | Cursor move, typing indicator |
| Waveform | Bezier path, amplitude dots | Wave motion, dot pulses |

---

## Performance Rules

1. **Only animate GPU-accelerated properties:** `transform`, `opacity`
2. **Avoid:** `width`, `height`, `top`, `left`, `fill` transitions
3. **Keep particle counts low:** 4-8 ambient particles max
4. **Use `will-change` sparingly** (not needed for SVG usually)
5. **Test on mobile** for battery/performance impact
