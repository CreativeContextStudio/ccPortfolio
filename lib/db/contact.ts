import { sql } from '@vercel/postgres';
import { logger } from '../logger';

export interface ContactSubmissionData {
  name: string;
  email: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function saveContactSubmission(data: ContactSubmissionData): Promise<{ success: true; id: string }> {
  try {
    const result = await sql`
      INSERT INTO contact_submissions (name, email, message, ip_address, user_agent)
      VALUES (${data.name}, ${data.email}, ${data.message}, ${data.ipAddress || null}, ${data.userAgent || null})
      RETURNING id
    `;
    const id = result.rows[0]?.id;
    if (!id) throw new Error('Failed to retrieve submission ID');
    logger.log('Contact submission saved successfully', { id, timestamp: new Date().toISOString() });
    return { success: true, id };
  } catch (error) {
    logger.error('Database error saving contact submission:', error);
    throw new Error('Failed to save submission');
  }
}
