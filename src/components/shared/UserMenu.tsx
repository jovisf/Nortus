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
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="mt-auto flex items-center justify-center w-full relative" ref={containerRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -20, y: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute left-[calc(100%+16px)] bottom-0 bg-[#161D33] border border-white/10 rounded-2xl p-4 shadow-2xl w-64 z-[60]"
                    >
                        {/* User Info */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/5">
                            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white/10 uppercase">
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
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-sm font-medium cursor-pointer"
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
                className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white/10 uppercase hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-blue-400/20"
            >
                AC
            </button>
        </div>
    );
}
