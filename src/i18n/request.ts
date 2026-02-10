import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // We can get the locale from a cookie or session if not using [locale] routing
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'pt-BR';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
