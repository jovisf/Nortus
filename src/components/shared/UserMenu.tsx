'use client';

import { useState, useRef, useEffect } from 'react';
import { useLogout } from '@/hooks';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function UserMenu() {
  const tCommon = useTranslations('Common');
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative mt-auto flex w-full items-center justify-center"
      ref={containerRef}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -20, y: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-[calc(100%+16px)] z-[60] w-64 rounded-2xl border border-white/10 bg-[#161D33] p-4 shadow-2xl"
          >
            {/* User Info */}
            <div className="mb-4 flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/10 bg-blue-400 text-sm font-bold text-white uppercase">
                AC
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <LanguageSwitcher direction="up" />
              </div>

              <button
                onClick={() => logout()}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20"
              >
                <LogOut size={16} />
                {tCommon('logout')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white/10 bg-blue-400 text-sm font-bold text-white uppercase shadow-lg shadow-blue-400/20 transition-transform hover:scale-105"
      >
        AC
      </button>
    </div>
  );
}
