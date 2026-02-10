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

export function LanguageSwitcher({
  direction = 'down',
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
        className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:bg-white/10"
      >
        <div className="relative h-4 w-5 overflow-hidden rounded-sm shadow-sm">
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.label}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-white">
          {currentLanguage.label}
        </span>
        <ChevronDown
          size={14}
          className={`text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={`animate-in fade-in zoom-in-95 absolute right-0 z-50 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#161D33] shadow-2xl duration-200 ${
            direction === 'up'
              ? 'slide-in-from-bottom-2 bottom-full mb-2'
              : 'slide-in-from-top-2 top-full mt-2'
          }`}
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                  locale === lang.code
                    ? 'text-primary bg-white/5 font-semibold'
                    : 'text-white/70'
                }`}
              >
                <div className="relative h-3.5 w-5 overflow-hidden rounded-sm">
                  <Image
                    src={lang.flag}
                    alt={lang.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{lang.label === 'PT-br' ? 'Português' : 'English'}</span>
                {locale === lang.code && (
                  <div className="bg-primary ml-auto h-1.5 w-1.5 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
