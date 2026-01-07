import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { aboutData } from '@/app/data/about';
import { logger } from '@/lib/logger';
import { sanitizeString, sanitizeMessage, isValidLength } from '@/lib/sanitize';

// Build system prompt with portfolio information
function buildSystemPrompt(): string {
  const skillsList = aboutData.skills.map((s) => `- ${s.name} (${s.category})`).join('\n');
  const techStack = aboutData.techStackCategories
    .map((cat) => `${cat.category}: ${cat.technologies.join(', ')}`)
    .join('\n');

  return `You are an AI assistant for the Creative Context portfolio website. 
You have knowledge about the portfolio owner's experience, skills, and projects.
Respond in a professional, direct manner. Be concise and helpful.

PORTFOLIO OWNER INFORMATION:
- ID: ${aboutData.agentId}
- Specialization: ${aboutData.specialization.join(', ')}
- Location: ${aboutData.location}

OVERVIEW: ${aboutData.missionStatement}

BACKGROUND: ${aboutData.backgroundBriefing}

KEY SKILLS:
${skillsList}

TECHNOLOGY STACK:
${techStack}

EXPERIENCE:
${aboutData.fieldExperience.map((exp) => `- ${exp}`).join('\n')}

Keep responses concise and professional. Answer questions about the portfolio owner's skills, experience, and projects.
If asked about something not in the provided information, acknowledge the query but indicate that specific information is not available.
Use clear, direct language without unnecessary jargon.`;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Rate limit exceeded. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      ) as NextResponse;
    }

    const body = await req.json();
    let { message, history } = body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'INVALID_QUERY', message: 'Message content is required' },
        { status: 400 }
      ) as NextResponse;
    }

    // Sanitize message
    message = sanitizeMessage(message, 1000);

    // Validate length
    if (!isValidLength(message, 1, 1000)) {
      return NextResponse.json(
        { error: 'QUERY_TOO_LONG', message: 'Message exceeds maximum length (1000 characters)' },
        { status: 400 }
      ) as NextResponse;
    }

    // Sanitize history if provided
    if (Array.isArray(history)) {
      history = history.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: typeof msg.content === 'string' ? sanitizeMessage(msg.content, 1000) : '',
      }));
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      logger.error('OpenAI API key not configured');
      return NextResponse.json(
        {
          error: 'CONFIGURATION_ERROR',
          message: 'AI system unavailable. Please configure API credentials.',
        },
        { status: 503 }
      ) as NextResponse;
    }

    // Prepare messages for OpenAI
    const systemPrompt = buildSystemPrompt();
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history (limit to last 10 messages to avoid token limits)
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      recentHistory.forEach((msg: { role: string; content: string }) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          });
        }
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message.trim() });

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      logger.error('OpenAI API error:', errorData);
      
      return NextResponse.json(
        {
          error: 'AI_SYSTEM_ERROR',
          message: 'AI system unavailable. Please try again later.',
        },
        { status: 502 }
      ) as NextResponse;
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'Error: No response from AI system';

    return NextResponse.json(
      {
        message: assistantMessage,
        role: 'assistant',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    );
  } catch (error) {
    logger.error('Chat API error:', error);
    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: 'An internal error occurred. Please try again later.',
      },
      { status: 500 }
    ) as NextResponse;
  }
}

