'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAMES, COOKIE_CONFIG } from '@/lib/cookies/constants';

export async function setUserLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.LOCALE, locale, {
    path: COOKIE_CONFIG.PATH,
    maxAge: 60 * 60 * 24 * 365, 
    sameSite: COOKIE_CONFIG.SAME_SITE,
  });
}
