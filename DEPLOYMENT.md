# Deployment Guide

This guide covers deploying the Creative Context portfolio to Vercel and configuring the production environment.

## Prerequisites

- GitHub account with the repository
- Vercel account (free tier is sufficient)
- Domain name (optional, for custom domain)

## Step 1: Connect GitHub Repository to Vercel

1. **Log in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Authorize Vercel to access your repository if prompted

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `portfolio` (if your project is in a subdirectory)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Select Branch**
   - Choose the branch you want to deploy (typically `main` or `master`)
   - Vercel will automatically deploy on every push to this branch

## Step 2: Configure Environment Variables

1. **Navigate to Project Settings**
   - In your Vercel project dashboard, go to "Settings" → "Environment Variables"

2. **Add Required Variables**
   Add the following environment variables:

   **Required:**
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

   **For Agent Query Interface:**
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   **For Contact Form:**
   ```
   EMAIL_SERVICE_API_KEY=your_email_service_api_key_here
   EMAIL_FROM=noreply@your-domain.com
   EMAIL_TO=contact@your-domain.com
   ```

   **Optional (for spam protection):**
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
   ```

3. **Set Environment Scope**
   - For each variable, select which environments it applies to:
     - Production
     - Preview
     - Development
   - Most variables should be set for all environments

4. **Save Variables**
   - Click "Save" after adding each variable
   - Redeploy the project for changes to take effect

## Step 3: Configure Build Settings

The `vercel.json` file already contains optimized build settings:

- **Framework**: Next.js
- **Regions**: `iad1` (US East)
- **Security Headers**: Configured
- **Caching**: Optimized for static assets and API routes

No additional configuration needed unless you want to:
- Change deployment region
- Add custom redirects or rewrites
- Modify caching strategies

## Step 4: Set Up Analytics and Monitoring

### Vercel Analytics

1. **Enable Analytics**
   - In Vercel dashboard, go to "Analytics"
   - Click "Enable Analytics"
   - Analytics are automatically enabled for all deployments

2. **View Analytics**
   - Real-time visitor data
   - Page views
   - Top pages
   - Geographic data

### Vercel Speed Insights

1. **Enable Speed Insights**
   - In Vercel dashboard, go to "Speed Insights"
   - Click "Enable Speed Insights"
   - Core Web Vitals data will be collected automatically

### Error Tracking (Optional - Sentry)

1. **Create Sentry Account**
   - Go to [sentry.io](https://sentry.io)
   - Create a new project

2. **Install Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

3. **Configure Sentry**
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
   SENTRY_AUTH_TOKEN=your_sentry_auth_token_here
   ```

## Step 5: Configure Custom Domain (Optional)

1. **Add Domain**
   - In Vercel dashboard, go to "Settings" → "Domains"
   - Enter your domain name
   - Click "Add"

2. **Configure DNS**
   - Follow Vercel's DNS configuration instructions
   - Add the required DNS records to your domain provider
   - Wait for DNS propagation (can take up to 48 hours)

3. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - HTTPS will be enabled automatically

## Step 6: Deploy

1. **Automatic Deployment**
   - Pushing to your main branch triggers automatic deployment
   - Preview deployments are created for pull requests

2. **Manual Deployment**
   - In Vercel dashboard, go to "Deployments"
   - Click "Redeploy" if needed

3. **Verify Deployment**
   - Check deployment status in Vercel dashboard
   - Visit your deployment URL
   - Verify all features work correctly

## Step 7: Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test contact form
- [ ] Test agent query interface (if enabled)
- [ ] Verify environment variables are accessible
- [ ] Check analytics are tracking
- [ ] Verify SSL certificate is active
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Verify SEO metadata is correct
- [ ] Test all interactive features

## Environment-Specific Configuration

### Development
- Uses `.env.local` file
- Hot reload enabled
- Development API endpoints

### Preview
- Uses environment variables from Vercel
- Production-like environment
- Preview URLs for each branch/PR

### Production
- Uses production environment variables
- Optimized builds
- CDN caching enabled
- Analytics and monitoring active

## Troubleshooting

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure Node.js version is compatible (check `package.json` engines)

### Environment Variables Not Working
- Verify variables are set in correct environment (Production/Preview/Development)
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

### Domain Issues
- Verify DNS records are correct
- Wait for DNS propagation
- Check SSL certificate status

### Performance Issues
- Enable Speed Insights
- Check Core Web Vitals in analytics
- Review bundle size
- Optimize images

## Continuous Deployment

Vercel automatically deploys on:
- Push to main/master branch → Production
- Pull requests → Preview deployment
- Manual redeploy from dashboard

## Monitoring

Monitor your deployment:
- **Analytics**: Real-time visitor data
- **Speed Insights**: Core Web Vitals
- **Deployment Logs**: Build and runtime logs
- **Function Logs**: API route logs (if applicable)

## Support

For issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review deployment logs
- Check [Next.js Documentation](https://nextjs.org/docs)

## Security Checklist

- [ ] Security headers configured (vercel.json)
- [ ] Environment variables secured
- [ ] API routes protected (if applicable)
- [ ] CORS configured correctly
- [ ] Rate limiting implemented (if needed)
- [ ] SSL certificate active
- [ ] Dependencies up to date

