# Creative Context Studio — Portfolio

A high-performance portfolio site for Creative Context Studio, built with Next.js 16, React 19, Tailwind CSS 4, and shadcn/ui. Features an AI chatbot, multi-theme design system, procedural animations, hidden easter eggs, and a full contact pipeline backed by Vercel Postgres and Resend.

**Live:** Deployed on Vercel

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16.1.6 (App Router, Turbopack) |
| **UI** | React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Radix UI |
| **Animation** | Motion (Framer Motion v12) |
| **AI** | OpenAI SDK — context-aware portfolio chatbot |
| **Email** | Resend API |
| **Database** | Vercel Postgres |
| **Forms** | react-hook-form + Zod |
| **Fonts** | DM Sans, Plus Jakarta Sans, JetBrains Mono (Google Fonts) |

---

## Features

### Multi-Theme Design System
Four distinct themes — **Hiya** (default), **Dieter Rams**, **Miami Vibes**, **Lo-Fi Wave** — each with light, dark, and system modes. Persisted via `localStorage` and driven by CSS custom properties.

### AI Chatbot
Floating widget powered by OpenAI. Responds to questions about Creative Context Studio using a curated context document. Supports conversation history (session-stored), suggested prompts, rate limiting (10 req/min), and input sanitization.

### Contact Form
Zod-validated form with server-side sanitization, spam detection, IP-based rate limiting, Vercel Postgres persistence, and Resend email notifications.

### Animations & Visual Effects
- **Hero:** Staggered entrance with blur, cycling role titles, and a typing command sequence
- **Tilt cards:** 3D mouse-tracked perspective on project cards
- **Section tears:** Procedurally generated SVG dividers with seeded randomness
- **Ambient drifters:** Floating particles and shooting stars
- **Film grain:** SVG turbulence overlay
- **Scroll progress:** Gradient bar at page top
- **Text scramble:** Character-level decode animation on headings

All animations respect `prefers-reduced-motion`.

### Easter Eggs
- **Konami Code** (↑↑↓↓←→←→BA) — activates "Chaos Mode" for 8 seconds
- **Hidden Terminal** (backtick key) — retro command-line interface with `help`, `about`, `skills`, `secret`, `themes`
- **Visit Milestone** — celebration toast at 10th page visit

### Security Headers
CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control — all configured in `next.config.ts`.

### Performance
- Next.js Image optimization (AVIF/WebP)
- Dynamic imports for chatbot and easter egg components (no SSR)
- Code-split by route
- Google Font optimization via `next/font`

### Accessibility
Skip-to-content link, semantic HTML, ARIA labels, keyboard navigation, motion reduction support.

### SEO
Open Graph & Twitter Card meta, dynamic sitemap, robots.txt, PWA manifest with favicons.

---

## Project Structure

```
app/
├── about/page.tsx              # Bio — tabs for overview, skills, timeline, resume
├── api/
│   ├── chat/route.ts           # AI chatbot endpoint
│   └── contact/route.ts        # Contact form endpoint
├── contexts/ThemeContext.tsx    # Theme & dark mode context
├── data/
│   ├── about.ts                # Skills, timeline, highlights
│   ├── portfolio-context.ts    # AI chatbot knowledge base
│   ├── projects.ts             # 30+ portfolio projects across 4 pillars
│   └── resume.ts               # Structured resume data
├── hooks/                      # useKonamiCode, useHiddenHover, useVisitCounter
├── globals.css                 # Tailwind base + theme variables
├── layout.tsx                  # Root layout (fonts, providers, env validation)
├── page.tsx                    # Home — hero, pillars, contact, footer
├── robots.ts                   # Dynamic robots.txt
└── sitemap.ts                  # Dynamic sitemap

components/
├── ui/                         # shadcn/ui primitives (badge, card, separator)
├── hero.tsx                    # Animated hero with role cycling
├── hero-animations.tsx         # SVG animation container
├── header.tsx                  # Scroll-aware navbar with section detection
├── footer.tsx                  # Social links & navigation
├── pillar-section.tsx          # Reusable portfolio category section
├── project-modal.tsx           # Full-screen project detail modal
├── contact-section.tsx         # Validated contact form
├── chatbot.tsx                 # AI chat widget
├── easter-egg-manager.tsx      # Konami code, terminal, visit milestones
├── theme-selector.tsx          # Theme/mode switcher
├── tilt-card.tsx               # 3D perspective card
├── section-tear.tsx            # Procedural SVG dividers
├── reel-showcase.tsx           # Production reel with YouTube embed
├── ambient-drifters.tsx        # Floating particles
├── film-grain.tsx              # SVG grain overlay
├── scroll-progress.tsx         # Scroll progress bar
├── console-signature.tsx       # DevTools console branding
└── ...                         # Section wrappers, illustrations, decorations

hooks/
└── use-text-scramble.ts        # Character scramble animation hook

lib/
├── animations.ts               # Framer Motion variant presets
├── apiResponse.ts              # Typed API response helpers
├── db/contact.ts               # Vercel Postgres queries
├── email.ts                    # Resend email integration
├── env.ts                      # Startup env validation with warnings
├── logger.ts                   # Dev-only logging
├── rateLimit.ts                # In-memory IP rate limiter
├── sanitize.ts                 # Input sanitization & validation
└── utils.ts                    # cn() — Tailwind class merging
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install

```bash
git clone <repo-url>
cd ccsPortfolio
npm install
```

### Environment Variables

Copy the example file and fill in the values you need:

```bash
cp .env.local.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Site URL for OG tags and canonical links |
| `OPENAI_API_KEY` | No | Enables the AI chatbot |
| `OPENAI_MODEL` | No | Model to use (default: `gpt-3.5-turbo`) |
| `OPENAI_TEMPERATURE` | No | Response creativity (default: `0.3`) |
| `OPENAI_MAX_TOKENS` | No | Max response length (default: `300`) |
| `RESEND_API_KEY` | No | Enables contact form email delivery |
| `CONTACT_EMAIL` | No | Email to receive contact submissions |
| `EMAIL_FROM` | No | Sender address for notifications |
| `POSTGRES_URL` | No | Vercel Postgres connection string (auto-provided on Vercel) |
| `ALLOWED_ORIGINS` | No | Comma-separated allowed CORS origins |

Missing optional keys produce clear console warnings at startup — the site runs fine without them, with those features gracefully disabled.

### Run

```bash
npm run dev       # Development (http://localhost:3000)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint
```

---

## Deployment

Built for **Vercel**. Push to your connected branch and Vercel handles the rest.

- Set environment variables in Vercel Dashboard → Settings → Environment Variables
- Vercel Postgres is provisioned through the Vercel dashboard (auto-injects `POSTGRES_URL`)
- Security headers are applied via `next.config.ts` — no additional Vercel config needed

---

## Portfolio Structure

Content is organized into four pillars in `app/data/projects.ts`:

1. **Creative Producing** — Brand campaigns, healthcare narratives, documentary
2. **Storytelling & Narrative** — Feature films, interactive experiences
3. **Agentic Creative & AI** — AI-native workflows, generative tools
4. **Line Producing & Production** — Production management, budgeting, logistics

Each project includes metadata for title, description, thumbnail, YouTube embed, tech stack, tags, date range, and status.

---

## License

All rights reserved. This is a proprietary portfolio site for Creative Context Studio.
