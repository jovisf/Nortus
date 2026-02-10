import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nortus',
  description:
    'Sistema de gestão de tickets e atendimento ao cliente da Nortus',
  keywords: ['nortus', 'gestão', 'tickets', 'atendimento'],
  icons: {
    icon: '/logo.svg',
  },
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Check } from 'lucide-react';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QueryProvider>
            {children}
            <Toaster
              position="bottom-center"
              closeButton
              icons={{
                success: (
                  <div className="text-primary flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <Check size={18} strokeWidth={3} />
                  </div>
                ),
              }}
              toastOptions={{
                className: 'sonner-toast-custom',
                classNames: {
                  toast: 'sonner-toast-custom',
                  title: 'sonner-toast-title',
                  description: 'sonner-toast-description',
                  closeButton: 'sonner-toast-close',
                },
              }}
            />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
