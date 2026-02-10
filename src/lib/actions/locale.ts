'use server';

import { cookies } from 'next/headers';

/**
 * Sets the NEXT_LOCALE cookie to persist the user's language choice.
 */
export async function setUserLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });
}
