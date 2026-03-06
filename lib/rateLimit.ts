interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) rateLimitStore.delete(key);
  }
  lastCleanup = now;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const defaultConfig: RateLimitConfig = {
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10),
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
};

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = defaultConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  cleanupExpiredEntries();
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (entry && entry.resetTime < now) rateLimitStore.delete(identifier);

  const currentEntry = rateLimitStore.get(identifier);

  if (!currentEntry) {
    const newEntry: RateLimitEntry = { count: 1, resetTime: now + config.windowMs };
    rateLimitStore.set(identifier, newEntry);
    return { allowed: true, remaining: config.maxRequests - 1, resetTime: newEntry.resetTime };
  }

  if (currentEntry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: currentEntry.resetTime };
  }

  currentEntry.count++;
  rateLimitStore.set(identifier, currentEntry);
  return { allowed: true, remaining: config.maxRequests - currentEntry.count, resetTime: currentEntry.resetTime };
}

export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIp || 'unknown';
}
