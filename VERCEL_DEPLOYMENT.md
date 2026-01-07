# Vercel Deployment Quick Start

This guide provides a quick checklist for deploying the portfolio to Vercel.

## Pre-Deployment Checklist

### 1. Repository Structure
- ✅ Project is in `portfolio/` subdirectory
- ✅ `vercel.json` is configured with `rootDirectory: "portfolio"`
- ✅ `package.json` has build scripts
- ✅ All dependencies are listed in `package.json`

### 2. Vercel Dashboard Configuration

When importing the project in Vercel:

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `portfolio` ⚠️ **IMPORTANT** - Set this in Vercel dashboard
3. **Build Command**: `npm run build` (auto-detected)
4. **Output Directory**: `.next` (auto-detected)
5. **Install Command**: `npm install` (auto-detected)

### 3. Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

#### Required (Production will fail without these):
```
NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
```

#### Optional (for full functionality):
```
# AI Chat Interface
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo

# Contact Form Email
EMAIL_SERVICE_API_KEY=...
EMAIL_FROM=noreply@your-domain.com
EMAIL_TO=contact@your-domain.com

# Rate Limiting (optional - has defaults)
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
CONTACT_RATE_LIMIT_MAX=5
CONTACT_RATE_LIMIT_WINDOW_MS=60000

# Spam Protection (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
```

**Important**: 
- Set environment scope: Production, Preview, and Development as needed
- Replace placeholder values (like `your-domain.com`) with actual values
- Redeploy after adding environment variables

### 4. Node.js Version

The project requires Node.js 18+. Vercel will auto-detect from `package.json` engines field.

### 5. Build Settings Verification

Verify in Vercel dashboard that:
- ✅ Framework: Next.js
- ✅ Root Directory: `portfolio`
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`

## Deployment Steps

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Project**
   - Set Root Directory to `portfolio`
   - Verify build settings (should auto-detect)

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add `NEXT_PUBLIC_SITE_URL` (required)
   - Add other variables as needed

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit the deployment URL

## Post-Deployment

- [ ] Verify site loads at deployment URL
- [ ] Test contact form (if email service configured)
- [ ] Test AI chat interface (if OpenAI key configured)
- [ ] Check that environment variables are accessible
- [ ] Verify security headers are present (check Network tab)
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit

## Troubleshooting

### Build Fails: "Cannot find module"
- Ensure Root Directory is set to `portfolio` in Vercel dashboard
- Verify all dependencies are in `package.json`

### Environment Variables Not Working
- Check variable names match exactly (case-sensitive)
- Ensure variables are set for the correct environment (Production/Preview)
- Redeploy after adding variables

### 404 Errors
- Verify `vercel.json` rootDirectory matches Vercel dashboard setting
- Check that `next.config.ts` is in the portfolio directory

## Additional Resources

- Full deployment guide: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- Environment variables: See [env.example.txt](./env.example.txt)
- Vercel Documentation: https://vercel.com/docs
