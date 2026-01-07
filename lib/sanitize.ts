/**
 * Input sanitization utilities
 * Provides basic sanitization for user inputs to prevent XSS and injection attacks
 */

/**
 * Sanitize string input by removing potentially dangerous characters
 * For HTML content, consider using DOMPurify instead
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');

  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  return sanitizeString(email).toLowerCase();
}

/**
 * Validate and sanitize message content
 * Removes HTML tags and dangerous patterns
 */
export function sanitizeMessage(message: string, maxLength: number = 5000): string {
  let sanitized = sanitizeString(message);

  // Remove HTML tags (basic protection)
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Remove script tags and event handlers
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate string length
 */
export function isValidLength(
  input: string,
  minLength: number = 1,
  maxLength: number = 10000
): boolean {
  return input.length >= minLength && input.length <= maxLength;
}
