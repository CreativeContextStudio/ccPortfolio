/**
 * Database utility functions for contact form submissions
 * Uses Vercel Postgres with parameterized queries for security
 */

import { sql } from '@vercel/postgres';
import { logger } from '../logger';

export interface ContactSubmissionData {
  name: string;
  email: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Save a contact form submission to the database
 * Uses parameterized queries to prevent SQL injection
 */
export async function saveContactSubmission(
  data: ContactSubmissionData
): Promise<{ success: true; id: string }> {
  try {
    // Use parameterized query to prevent SQL injection
    const result = await sql`
      INSERT INTO contact_submissions (name, email, message, ip_address, user_agent)
      VALUES (${data.name}, ${data.email}, ${data.message}, ${data.ipAddress || null}, ${data.userAgent || null})
      RETURNING id
    `;

    const id = result.rows[0]?.id;

    if (!id) {
      throw new Error('Failed to retrieve submission ID');
    }

    logger.log('Contact submission saved successfully', {
      id,
      timestamp: new Date().toISOString(),
    });

    return { success: true, id };
  } catch (error) {
    // Log error but don't expose database details to client
    logger.error('Database error saving contact submission:', error);

    // Re-throw with generic message to prevent information leakage
    throw new Error('Failed to save submission');
  }
}

/**
 * Get contact submissions (for admin use - not exposed in API)
 * This function is available for future admin panel implementation
 */
export async function getContactSubmissions(limit: number = 50) {
  try {
    const result = await sql`
      SELECT id, name, email, message, created_at, ip_address
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    return result.rows;
  } catch (error) {
    logger.error('Database error fetching contact submissions:', error);
    throw new Error('Failed to fetch submissions');
  }
}
