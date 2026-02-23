export const COOKIE_NAMES = {
  AUTH_TOKEN: 'auth-token',
  LOCALE: 'NEXT_LOCALE',
} as const;

export const COOKIE_CONFIG = {
  MAX_AGE: 7 * 24 * 60 * 60,
  PATH: '/',
  SAME_SITE: 'lax' as const,
} as const;
