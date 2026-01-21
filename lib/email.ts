/**
 * Email utility for sending contact form notifications
 * Uses Resend for reliable email delivery
 */

import { Resend } from 'resend';
import { logger } from './logger';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  ipAddress?: string;
}

/**
 * Send email notification for new contact form submission
 */
export async function sendContactNotification(
  data: ContactEmailData
): Promise<{ success: boolean; error?: string }> {
  // Skip if Resend API key is not configured
  if (!process.env.RESEND_API_KEY) {
    logger.warn('RESEND_API_KEY not configured, skipping email notification');
    return { success: false, error: 'Email service not configured' };
  }

  const recipientEmail = process.env.CONTACT_EMAIL || 'creativecontextstudio00@gmail.com';
  const fromEmail = process.env.EMAIL_FROM || 'noreply@creativecontext.studio';

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: data.email, // Allow replying directly to the submitter
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
              .content { background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #555; }
              .value { margin-top: 5px; padding: 10px; background-color: #f9f9f9; border-radius: 3px; }
              .message { white-space: pre-wrap; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
                <p>You have received a new message through your portfolio contact form.</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${escapeHtml(data.name)}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${escapeHtml(data.email)}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value message">${escapeHtml(data.message)}</div>
                </div>
                ${data.ipAddress ? `
                <div class="field">
                  <div class="label">IP Address:</div>
                  <div class="value" style="font-size: 12px; color: #777;">${escapeHtml(data.ipAddress)}</div>
                </div>
                ` : ''}
              </div>
              <div class="footer">
                <p>This email was sent from your portfolio contact form.</p>
                <p>You can reply directly to this email to respond to ${escapeHtml(data.name)}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

You have received a new message through your portfolio contact form.

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

${data.ipAddress ? `IP Address: ${data.ipAddress}` : ''}

---
You can reply directly to this email to respond to ${data.name}.
      `.trim(),
    });

    if (error) {
      logger.error('Resend API error:', error);
      return { success: false, error: error.message };
    }

    logger.log('Contact notification email sent successfully', {
      emailId: emailData?.id,
      recipient: recipientEmail,
    });

    return { success: true };
  } catch (error) {
    logger.error('Failed to send contact notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Escape HTML to prevent XSS in email content
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
