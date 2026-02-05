# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Creative Context Portfolio - A Next.js 16 portfolio website with a Cold War aerospace/technical documentation aesthetic. Built with TypeScript, Tailwind CSS 4, and React 19.

## Commands

```bash
npm run dev       # Development server at http://localhost:3000
npm run build     # Production build
npm start         # Start production server
npm run lint      # Run ESLint
```

## Architecture

### Directory Structure

- `app/` - Next.js App Router pages and components
  - `api/contact/` - Contact form endpoint (rate-limited, sanitized, stores to Postgres)
  - `api/chat/` - AI chat interface (OpenAI integration)
  - `components/` - React components (ui/ for base components)
  - `contexts/ThemeContext.tsx` - Multi-theme system (4 themes: hiya, dieter-rams, miami-vibes, lofi-wave)
  - `hooks/` - Custom hooks including useKonamiCode easter egg
  - `data/` - Static data (projects.ts, resume.ts, about.ts)
- `lib/` - Utilities: env validation, rate limiting, sanitization, email (Resend), database ops

### Key Patterns

**Theme System**: Uses `data-theme` and `data-mode` attributes with CSS variables. Supports light/dark/system modes.

**API Security**: All user inputs sanitized via `lib/sanitize.ts`. Rate limiting via `lib/rateLimit.ts` (in-memory, stateless).

**Environment Validation**: `lib/env.ts` validates config on server startup.

**Path Alias**: `@/*` maps to project root.

## Environment Setup

Copy `env.example.txt` to `.env.local`. Required:
- `NEXT_PUBLIC_SITE_URL` - Site URL

Optional for features:
- `OPENAI_API_KEY` - Chat interface
- `RESEND_API_KEY` - Contact form emails
- `POSTGRES_URL` - Contact form storage (auto-provided by Vercel Postgres)

## Adding Content

**New project**: Add to `app/data/projects.ts` following the `Project` interface.

**New page**: Create `app/[pagename]/page.tsx` (App Router convention).

**New API route**: Create `app/api/[endpoint]/route.ts` with HTTP method handlers.
