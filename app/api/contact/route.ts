import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { sanitizeString, sanitizeEmail, sanitizeMessage, isValidEmail, isValidLength } from '@/lib/sanitize';
import { saveContactSubmission } from '@/lib/db/contact';
import { sendContactNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, {
      maxRequests: parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '5', 10),
      windowMs: parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || '60000', 10),
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString() } }
      );
    }

    const body = await req.json();
    let { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'MISSING_REQUIRED_FIELDS', message: 'All fields are required' }, { status: 400 });
    }

    name = sanitizeString(name);
    email = sanitizeEmail(email);
    message = sanitizeMessage(message, 5000);

    if (!isValidLength(name, 1, 100)) return NextResponse.json({ error: 'INVALID_INPUT', message: 'Name must be 1-100 characters' }, { status: 400 });
    if (!isValidLength(message, 10, 5000)) return NextResponse.json({ error: 'INVALID_INPUT', message: 'Message must be 10-5000 characters' }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: 'INVALID_EMAIL', message: 'Invalid email format' }, { status: 400 });

    const spamPatterns = [/http[s]?:\/\//i, /www\./i, /\[url\]/i, /<a\s+href/i];
    if (spamPatterns.some(p => p.test(message))) {
      return NextResponse.json({ error: 'MESSAGE CONTAINS PROHIBITED CONTENT' }, { status: 400 });
    }

    const ipAddress = getClientIdentifier(req);
    const userAgent = req.headers.get('user-agent') || undefined;

    try {
      await saveContactSubmission({ name, email, message, ipAddress, userAgent });
    } catch (dbError) {
      logger.error('Failed to save contact submission:', dbError);
      return NextResponse.json({ error: 'INTERNAL_ERROR', message: 'Please try again later.' }, { status: 500 });
    }

    try {
      await sendContactNotification({ name, email, message, ipAddress });
    } catch (emailError) {
      logger.error('Email notification error:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    logger.error('Contact form error:', error);
    return NextResponse.json({ error: 'INTERNAL_ERROR', message: 'Please try again later.' }, { status: 500 });
  }
}
