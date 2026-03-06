interface EnvConfig {
  NEXT_PUBLIC_SITE_URL: string;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  CONTACT_EMAIL?: string;
}

const requiredEnvVars: (keyof EnvConfig)[] = ['NEXT_PUBLIC_SITE_URL'];

const optionalFeatureKeys: { key: keyof EnvConfig; feature: string }[] = [
  { key: 'OPENAI_API_KEY', feature: 'AI chatbot' },
  { key: 'RESEND_API_KEY', feature: 'Contact form email delivery' },
];

export function validateEnv(): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const key of requiredEnvVars) {
    const value = process.env[key];
    if (!value || value.trim() === '' || value.includes('your-') || value.includes('example.com')) {
      errors.push(`Missing or invalid required environment variable: ${key}`);
    }
  }

  for (const { key, feature } of optionalFeatureKeys) {
    if (!process.env[key]) {
      warnings.push(`${key} is not set — ${feature} will be disabled`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

if (typeof window === 'undefined') {
  const { valid, errors, warnings } = validateEnv();

  if (!valid && process.env.NODE_ENV === 'production') {
    console.error('Environment validation failed:', errors);
  } else if (!valid) {
    console.warn('Environment validation warnings:', errors);
  }

  if (warnings.length > 0) {
    console.warn('Optional env vars missing:', warnings);
  }
}
