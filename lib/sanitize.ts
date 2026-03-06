export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  let sanitized = input.replace(/\0/g, '');
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  sanitized = sanitized.trim();
  return sanitized;
}

export function sanitizeEmail(email: string): string {
  return sanitizeString(email).toLowerCase();
}

export function sanitizeMessage(message: string, maxLength: number = 5000): string {
  let sanitized = sanitizeString(message);
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidLength(input: string, minLength: number = 1, maxLength: number = 10000): boolean {
  return input.length >= minLength && input.length <= maxLength;
}
