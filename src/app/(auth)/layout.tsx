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
        <main className="flex min-h-screen bg-[var(--app-bg)] text-[#E3E3E3] font-sans selection:bg-primary/30 relative overflow-hidden">
            {/* Action Buttons Top Right with Notch Effect */}
            <div className="absolute top-0 right-0 flex items-center gap-4 z-20 bg-[var(--app-bg)] py-6 px-10 rounded-bl-[40px] shadow-sm">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/5 backdrop-blur-sm group cursor-pointer">
                    <Headset size={18} className="text-white group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{t('help')}</span>
                </button>
                <LanguageSwitcher />
            </div>

            <div className="flex w-full">
                {/* Left Side - Content Container */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative z-10">
                    <div className="mb-16">
                        <h1 className="text-[40px] font-bold text-primary tracking-tight">Nortus</h1>
                    </div>

                    <div className="max-w-[420px] w-full">
                        {children}
                    </div>
                </div>

                {/* Right Side - Image Wrapper */}
                <div className="hidden lg:flex w-[55%] p-8 items-center">
                    <div className="w-full h-full relative rounded-[40px] overflow-hidden bg-[#0A142F]">
                        <Image
                            src="/login.svg"
                            alt="Background Illustration"
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </main>
    );
}
