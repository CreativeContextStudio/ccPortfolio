# Database Setup Guide

This guide explains how to set up Vercel Postgres for the contact form storage.

## Overview

The contact form uses **Vercel Postgres** to securely store form submissions. This is the simplest database solution that integrates natively with Vercel.

## Prerequisites

- Vercel account
- Project deployed to Vercel (or ready to deploy)

## Step 1: Provision Vercel Postgres

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Click on the **Storage** tab
   - Click **Create Database**

2. **Select Postgres**
   - Choose **Postgres** from the database options
   - Select your preferred region (closest to your users)
   - Choose a plan:
     - **Hobby** (Free tier) - Perfect for development and low traffic
     - **Pro** - For production with higher traffic

3. **Create Database**
   - Vercel will automatically:
     - Create the database
     - Add `POSTGRES_URL` environment variable to your project
     - Configure connection pooling

## Step 2: Run Database Schema

1. **Open Vercel SQL Editor**
   - In your project dashboard, go to **Storage** → Your Postgres database
   - Click on **SQL Editor** tab

2. **Run Schema Migration**
   - Copy the contents of `portfolio/lib/db/schema.sql`
   - Paste into the SQL editor
   - Click **Run** to execute

   The schema creates:
   - `contact_submissions` table
   - Indexes for performance

3. **Verify Table Creation**
   - Run: `SELECT * FROM contact_submissions LIMIT 1;`
   - Should return empty result (no error = success)

## Step 3: Local Development Setup

For local development, you need to pull environment variables:

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Link Your Project** (if not already linked)
   ```bash
   cd portfolio
   vercel link
   ```

4. **Pull Environment Variables**
   ```bash
   vercel env pull .env.local
   ```

   This creates `.env.local` with `POSTGRES_URL` from your Vercel project.

5. **Verify Environment Variable**
   Check that `.env.local` contains:
   ```
   POSTGRES_URL=postgres://...
   ```

## Step 4: Test Database Connection

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Submit Contact Form**
   - Navigate to `/contact` page
   - Fill out and submit the form
   - Check for success message

3. **Verify Data in Database**
   - Go to Vercel Dashboard → Storage → Your Postgres database
   - Click **Table Editor** or use SQL Editor:
     ```sql
     SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10;
     ```
   - You should see your test submission

## Environment Variables

The following environment variable is automatically set by Vercel:

- `POSTGRES_URL` - Connection string for the database

**Important:** Never commit `.env.local` to git. It's already in `.gitignore`.

## Security Notes

- ✅ Database connection uses SSL by default
- ✅ Connection string is stored securely in Vercel environment variables
- ✅ Parameterized queries prevent SQL injection
- ✅ IP addresses are logged for abuse tracking
- ✅ All existing security measures (rate limiting, sanitization) remain active

## Troubleshooting

### "Failed to save submission" Error

1. **Check Environment Variable**
   - Verify `POSTGRES_URL` is set in Vercel dashboard
   - For local: Ensure `.env.local` exists and has `POSTGRES_URL`

2. **Check Database Schema**
   - Verify table exists: `SELECT * FROM contact_submissions LIMIT 1;`
   - If table doesn't exist, run schema migration again

3. **Check Database Status**
   - In Vercel dashboard, verify database is active
   - Check for any database errors in Vercel logs

### Local Development Issues

1. **Environment Variables Not Loading**
   - Ensure `.env.local` exists in `portfolio/` directory
   - Restart dev server after pulling env vars
   - Check that `POSTGRES_URL` starts with `postgres://`

2. **Connection Timeout**
   - Vercel Postgres may have IP restrictions
   - Check if your IP needs to be whitelisted
   - For development, consider using Vercel's preview deployments

## Next Steps

Once database is set up:

1. ✅ Contact form submissions are stored securely
2. ✅ You can query submissions via Vercel SQL Editor
3. ✅ Future: Build admin panel to view submissions
4. ✅ Future: Add email notifications (Resend, SendGrid, etc.)

## Querying Submissions

### View Recent Submissions
```sql
SELECT id, name, email, created_at 
FROM contact_submissions 
ORDER BY created_at DESC 
LIMIT 20;
```

### Count Total Submissions
```sql
SELECT COUNT(*) as total FROM contact_submissions;
```

### Find Submissions by Email
```sql
SELECT * FROM contact_submissions 
WHERE email = 'user@example.com' 
ORDER BY created_at DESC;
```

## Support

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Storage Overview](https://vercel.com/docs/storage)
- [@vercel/postgres Package](https://www.npmjs.com/package/@vercel/postgres)
