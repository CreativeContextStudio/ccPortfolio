# Creative Context Portfolio

A professional portfolio website built with Next.js, presented as a mid-century American Cold War industrial/aerospace technical documentation system. Features a unique design aesthetic combining modern web technologies with retro-futuristic styling.

## Features

- **Multi-Theme System**: Dark/light theme support with smooth transitions
- **Responsive Design**: Optimized for all device sizes
- **Project Showcase**: Filterable project gallery with detailed views
- **Contact Form**: Secure contact form with rate limiting and input validation
- **AI Chat Interface**: Interactive agent query interface (optional, requires OpenAI API key)
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized images, lazy loading, and code splitting
- **Security**: Comprehensive security headers, input sanitization, and rate limiting

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp env.example.txt .env.local
   ```

4. Configure environment variables in `.env.local` (see `env.example.txt` for reference)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Environment Variables

See `env.example.txt` for all available environment variables. Required variables:

- `NEXT_PUBLIC_SITE_URL`: Your site URL (required)

Optional variables for enhanced features:

- `OPENAI_API_KEY`: For AI chat interface
- `EMAIL_SERVICE_API_KEY`: For contact form email delivery
- `RECAPTCHA_SECRET_KEY`: For spam protection

## Security Features

- Content Security Policy (CSP) headers
- Rate limiting on API routes
- Input sanitization and validation
- Secure HTTP headers (HSTS, X-Frame-Options, etc.)
- Environment variable validation
- Error boundary protection

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

The project is optimized for deployment on Vercel, but can be deployed to any platform that supports Next.js.

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── data/              # Static data files
│   └── hooks/             # Custom React hooks
├── lib/                   # Utility functions
│   ├── rateLimit.ts      # Rate limiting
│   ├── sanitize.ts        # Input sanitization
│   ├── logger.ts          # Development logging
│   └── env.ts             # Environment validation
└── public/                # Static assets
```

## License

Private project - All rights reserved

## Support

For issues or questions, please use the contact form on the website.
