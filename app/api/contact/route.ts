import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import {
  sanitizeString,
  sanitizeEmail,
  sanitizeMessage,
  isValidEmail,
  isValidLength,
} from '@/lib/sanitize';
import { createErrorResponse, createSuccessResponse } from '@/lib/apiResponse';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId, {
      maxRequests: parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '5', 10),
      windowMs: parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || '60000', 10),
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': process.env.CONTACT_RATE_LIMIT_MAX || '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await req.json();
    let { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'MISSING_REQUIRED_FIELDS', message: 'All fields are required' },
        { status: 400 }
      ) as NextResponse;
    }

    // Sanitize inputs
    name = sanitizeString(name);
    email = sanitizeEmail(email);
    message = sanitizeMessage(message, 5000);

    // Validate lengths
    if (!isValidLength(name, 1, 100)) {
      return NextResponse.json(
        { error: 'INVALID_INPUT', message: 'Name must be between 1 and 100 characters' },
        { status: 400 }
      ) as NextResponse;
    }

    if (!isValidLength(message, 10, 5000)) {
      return NextResponse.json(
        { error: 'INVALID_INPUT', message: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      ) as NextResponse;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'INVALID_EMAIL', message: 'Invalid email format' },
        { status: 400 }
      ) as NextResponse;
    }

    // Basic spam protection - check for common spam patterns
    const spamPatterns = [
      /http[s]?:\/\//i,
      /www\./i,
      /\[url\]/i,
      /<a\s+href/i,
    ];

    const hasSpam = spamPatterns.some((pattern) => pattern.test(message));
    if (hasSpam) {
      return NextResponse.json(
        { error: 'MESSAGE CONTAINS PROHIBITED CONTENT' },
        { status: 400 }
      );
    }

    // In a real application, you would send an email here using a service like:
    // - Resend (https://resend.com)
    // - SendGrid (https://sendgrid.com)
    // - AWS SES
    // - Nodemailer with SMTP

    // Log submission in development only (never logs user data in production)
    logger.log('Contact form submission received', {
      timestamp: new Date().toISOString(),
    });

    // For production, uncomment and configure email service:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    */

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': process.env.CONTACT_RATE_LIMIT_MAX || '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    ) as NextResponse;
  } catch (error) {
    logger.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: 'An internal error occurred. Please try again later.',
      },
      { status: 500 }
    ) as NextResponse;
  }
}

