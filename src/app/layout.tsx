import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nortus',
  description:
    'Sistema de gestão de tickets e atendimento ao cliente da Nortus',
  keywords: ['nortus', 'gestão', 'tickets', 'atendimento'],
};

import { Check } from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          {children}
          <Toaster
            position="bottom-center"
            closeButton
            icons={{
              success: (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-primary">
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
              }
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
