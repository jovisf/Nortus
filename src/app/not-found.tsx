import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/lib/cookies/constants';

export default async function NotFound() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAMES.AUTH_TOKEN);

  if (token && token.value) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
