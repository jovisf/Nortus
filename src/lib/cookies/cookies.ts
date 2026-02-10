import { COOKIE_CONFIG } from './constants';

export interface CookieOptions {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof document === 'undefined') return;

  const {
    maxAge = COOKIE_CONFIG.MAX_AGE,
    path = COOKIE_CONFIG.PATH,
    secure = process.env.NODE_ENV === 'production',
    sameSite = COOKIE_CONFIG.SAME_SITE,
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  cookieString += `; max-age=${maxAge}`;
  cookieString += `; path=${path}`;
  if (secure) cookieString += '; secure';
  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
    if (decodeURIComponent(cookieName) === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { maxAge: 0 });
}
