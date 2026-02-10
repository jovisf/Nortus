'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { setUserLocale } from '@/lib/actions/locale';
import { useRouter } from 'next/navigation';

const languages = [
    {
        code: 'pt-BR',
        label: 'PT-br',
        flag: 'https://flagcdn.com/br.svg',
    },
    {
        code: 'en-US',
        label: 'EN-us',
        flag: 'https://flagcdn.com/us.svg',
    },
];

interface LanguageSwitcherProps {
    direction?: 'up' | 'down';
}

export function LanguageSwitcher({ direction = 'down' }: LanguageSwitcherProps) {
    const locale = useLocale();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    const handleLanguageChange = async (langCode: string) => {
        if (langCode === locale) {
            setIsOpen(false);
            return;
        }

        await setUserLocale(langCode);
        setIsOpen(false);
        router.refresh();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/5 backdrop-blur-sm cursor-pointer group"
            >
                <div className="w-5 h-4 overflow-hidden rounded-sm relative shadow-sm">
                    <Image
                        src={currentLanguage.flag}
                        alt={currentLanguage.label}
                        fill
                        className="object-cover"
                    />
                </div>
                <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    {currentLanguage.label}
                </span>
                <ChevronDown
                    size={14}
                    className={`text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div
                    className={`absolute right-0 w-40 bg-[#161D33] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 ${direction === 'up'
                            ? 'bottom-full mb-2 slide-in-from-bottom-2'
                            : 'top-full mt-2 slide-in-from-top-2'
                        }`}
                >
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/5 ${locale === lang.code ? 'text-primary font-semibold bg-white/5' : 'text-white/70'
                                    }`}
                            >
                                <div className="w-5 h-3.5 overflow-hidden rounded-sm relative">
                                    <Image
                                        src={lang.flag}
                                        alt={lang.label}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span>{lang.label === 'PT-br' ? 'Português' : 'English'}</span>
                                {locale === lang.code && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
