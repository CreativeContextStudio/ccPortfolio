import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';
import { sanitizeMessage } from '@/lib/sanitize';
import OpenAI from 'openai';

const CONFIG = {
  MAX_REQUESTS_PER_MINUTE: 10,
  MAX_MESSAGE_LENGTH: 500,
  MAX_HISTORY_LENGTH: 6,
  MAX_CONTEXT_LENGTH: 50000,
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  OPENAI_TEMPERATURE: parseFloat(process.env.OPENAI_TEMPERATURE || '0.3'),
  OPENAI_MAX_TOKENS: parseInt(process.env.OPENAI_MAX_TOKENS || '300', 10),
};

const SYSTEM_PROMPT = `You are a helpful AI assistant representing Creative Context Studio's portfolio website. Your role is to answer questions about Creative Context Studio's services, capabilities, projects, experience, and expertise based ONLY on the provided context.

IMPORTANT GUIDELINES:
1. Always refer to Creative Context Studio (or "we", "our", "us") - never refer to individuals by name
2. Present all work, experience, and achievements as Creative Context Studio's accomplishments
3. James McKay is the CEO and President of Creative Context Studio - you may mention this when relevant, but always frame it as Creative Context Studio's leadership
4. Only answer questions related to Creative Context Studio's professional services, capabilities, projects, and experience
5. If asked about unrelated topics (weather, news, general knowledge, etc.), politely decline and redirect to Creative Context Studio topics
6. Be conversational but professional in tone
7. Keep responses VERY BRIEF - aim for 2-3 sentences maximum (under 100 words). Get straight to the point without unnecessary elaboration
8. If you don't have specific information in the context, say so honestly
9. Encourage visitors to reach out directly to Creative Context Studio for more detailed discussions

SAMPLE RESPONSES FOR OFF-TOPIC QUESTIONS:
- "I'm here to help you learn about Creative Context Studio's services and capabilities. What would you like to know about our work or projects?"
- "I can only discuss topics related to Creative Context Studio. Is there something specific about our services or experience you'd like to know?"

Remember: Always present information as Creative Context Studio's work and capabilities. Stay focused on professional topics and encourage meaningful business-related conversations.`;

function validateInput(body: Record<string, unknown>) {
  const { message, context, history } = body;
  if (!message || typeof message !== 'string') return { error: 'Message is required' };
  if ((message as string).length > CONFIG.MAX_MESSAGE_LENGTH) return { error: `Message too long. Maximum ${CONFIG.MAX_MESSAGE_LENGTH} characters.` };
  if (!context || typeof context !== 'string') return { error: 'Context is required' };
  if ((context as string).length > CONFIG.MAX_CONTEXT_LENGTH) return { error: 'Context too large' };

  const sanitizedMessage = sanitizeMessage(message as string, CONFIG.MAX_MESSAGE_LENGTH).trim();
  if (!sanitizedMessage) return { error: 'Message cannot be empty' };

  let sanitizedHistory: Array<{ content: string; isUser: boolean }> = [];
  if (history && Array.isArray(history)) {
    sanitizedHistory = (history as Array<Record<string, unknown>>)
      .slice(-CONFIG.MAX_HISTORY_LENGTH)
      .filter((msg) => msg && typeof msg.content === 'string')
      .map((msg) => ({
        content: sanitizeMessage(msg.content as string, CONFIG.MAX_MESSAGE_LENGTH).trim(),
        isUser: msg.isUser !== undefined ? Boolean(msg.isUser) : msg.role === 'user'
      }));
  }

  return { message: sanitizedMessage, context: (context as string).trim(), history: sanitizedHistory };
}

function buildConversationMessages(message: string, context: string, history: Array<{ content: string; isUser: boolean }>) {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nCONTEXT:\n${context}` }
  ];
  history.forEach(msg => {
    messages.push({ role: msg.isUser ? 'user' : 'assistant', content: msg.content });
  });
  messages.push({ role: 'user', content: message });
  return messages;
}

async function callOpenAI(messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: CONFIG.OPENAI_MODEL,
      messages,
      temperature: CONFIG.OPENAI_TEMPERATURE,
      max_tokens: CONFIG.OPENAI_MAX_TOKENS,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    return response.choices[0].message.content?.trim() || '';
  } catch (error: unknown) {
    logger.error('OpenAI API error:', error);

    const status = (error as { status?: number }).status;
    if (status === 429) {
      throw new Error('AI service temporarily unavailable due to high demand. Please try again in a moment.');
    } else if (status === 401) {
      throw new Error('AI service configuration error.');
    } else {
      throw new Error('AI service temporarily unavailable. Please try again later.');
    }
  }
}

export async function POST(req: NextRequest) {
  const headers = new Headers();

  const allowedOrigins = (
    process.env.ALLOWED_ORIGINS?.split(',') || [process.env.NEXT_PUBLIC_SITE_URL || '']
  ).map(s => s.trim()).filter(Boolean);

  const origin = req.headers.get('origin');
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : null;

  if (allowedOrigin) {
    headers.set('Access-Control-Allow-Origin', allowedOrigin);
    headers.set('Access-Control-Allow-Credentials', 'true');
  }

  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers });
  }

  try {
    const clientId = getClientIdentifier(req);
    const rateLimitResult = checkRateLimit(clientId);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        {
          status: 429,
          headers: {
            ...Object.fromEntries(headers.entries()),
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await req.json();
    const validation = validateInput(body);
    if ('error' in validation) return NextResponse.json({ error: validation.error }, { status: 400, headers });

    const { message, context, history } = validation;
    const messages = buildConversationMessages(message, context, history);
    const aiResponse = await callOpenAI(messages);

    return NextResponse.json(
      { response: aiResponse, timestamp: new Date().toISOString() },
      {
        status: 200,
        headers: {
          ...Object.fromEntries(headers.entries()),
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    );
  } catch (error: unknown) {
    logger.error('Chat API error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error. Please try again later.';
    return NextResponse.json({ error: message }, { status: 500, headers });
  }
}
