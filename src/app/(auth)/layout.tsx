'use client';

import Image from 'next/image';
import { Headset } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Common');

  return (
    <main className="selection:bg-primary/30 relative flex min-h-screen overflow-hidden bg-[var(--app-bg)] font-sans text-[#E3E3E3]">
      {/* Action Buttons Top Right with Notch Effect */}
      <div className="absolute top-0 right-0 z-20 flex items-center gap-4 rounded-bl-[40px] bg-[var(--app-bg)] px-10 py-6 shadow-sm">
        <button className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/5 bg-white/5 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white/10">
          <Headset
            size={18}
            className="text-white transition-transform group-hover:scale-110"
          />
          <span className="text-sm font-medium">{t('help')}</span>
        </button>
        <LanguageSwitcher />
      </div>

      <div className="flex w-full">
        {/* Left Side - Content Container */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 sm:px-16 lg:w-[45%] lg:px-24 xl:px-32">
          <div className="mb-16">
            <div className="relative h-12 w-40">
              <Image
                src="/logo.svg"
                alt="Nortus Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          <div className="w-full max-w-[420px]">{children}</div>
        </div>

        {/* Right Side - Image Wrapper */}
        <div className="hidden w-[55%] items-center p-8 lg:flex">
          <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-[#0A142F]">
            <Image
              src="/login.svg"
              alt="Background Illustration"
              fill
              className="object-cover"
              priority
              quality={100}
            />
            <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />
          </div>
        </div>
      </div>
    </main>
  );
}
