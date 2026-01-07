/**
 * Environment variable validation
 * Validates required environment variables at startup
 */

interface EnvConfig {
  // Public variables (safe to expose to client)
  NEXT_PUBLIC_SITE_URL: string;
  
  // Server-only variables
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  EMAIL_SERVICE_API_KEY?: string;
  EMAIL_FROM?: string;
  EMAIL_TO?: string;
  RECAPTCHA_SECRET_KEY?: string;
}

const requiredEnvVars: (keyof EnvConfig)[] = [
  'NEXT_PUBLIC_SITE_URL',
];

const optionalEnvVars: (keyof EnvConfig)[] = [
  'OPENAI_API_KEY',
  'OPENAI_MODEL',
  'EMAIL_SERVICE_API_KEY',
  'EMAIL_FROM',
  'EMAIL_TO',
  'RECAPTCHA_SECRET_KEY',
];

export function validateEnv(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required variables
  for (const key of requiredEnvVars) {
    const value = process.env[key];
    if (!value || value.trim() === '' || value.includes('your-') || value.includes('example.com')) {
      errors.push(`Missing or invalid required environment variable: ${key}`);
    }
  }

  // Warn about placeholder values in optional variables
  if (process.env.NODE_ENV === 'production') {
    for (const key of optionalEnvVars) {
      const value = process.env[key];
      if (value && (value.includes('your-') || value.includes('example.com'))) {
        errors.push(`Placeholder value detected in ${key}. Update before production deployment.`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Validate on module load (server-side only)
if (typeof window === 'undefined') {
  const validation = validateEnv();
  if (!validation.valid && process.env.NODE_ENV === 'production') {
    console.error('Environment validation failed:', validation.errors);
    // In production, we might want to throw or log to monitoring service
  } else if (!validation.valid) {
    console.warn('Environment validation warnings:', validation.errors);
  }
}
