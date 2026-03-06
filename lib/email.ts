import { Resend } from 'resend';
import { logger } from './logger';

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  ipAddress?: string;
}

export async function sendContactNotification(data: ContactEmailData): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient();
  if (!resend) {
    logger.warn('RESEND_API_KEY not configured, skipping email notification');
    return { success: false, error: 'Email service not configured' };
  }

  const recipientEmail = process.env.CONTACT_EMAIL || 'creativecontextstudio00@gmail.com';
  const fromEmail = process.env.EMAIL_FROM || 'noreply@creativecontext.studio';

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
          ${data.ipAddress ? `<p style="font-size: 12px; color: #777;">IP: ${escapeHtml(data.ipAddress)}</p>` : ''}
        </div>
      `,
      text: `New Contact: ${data.name} (${data.email})\n\n${data.message}`,
    });

    if (error) {
      logger.error('Resend API error:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    logger.error('Failed to send contact notification email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
