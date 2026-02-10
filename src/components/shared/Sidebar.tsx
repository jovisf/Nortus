'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { UserMenu } from './UserMenu';

const NAV_ITEMS = [
    { icon: '/sidebar/dashboard.svg', href: '/dashboard', key: 'dashboard' },
    { icon: '/sidebar/tickets.svg', href: '/tickets', key: 'tickets' },
    { icon: '/sidebar/chat.svg', href: '/chat', key: 'chat' },
    { icon: '/sidebar/simulator.svg', href: '/simulator', key: 'simulator' },
] as const;

export function Sidebar() {
    const pathname = usePathname();
    const t = useTranslations('Layout.sidebar');

    return (
        <aside
            className="fixed left-0 top-0 h-screen flex flex-col items-center py-8 bg-layout-bg border-r border-border-ui z-50 rounded-r-[24px] shadow-[10px_0px_30px_0px_rgba(0,0,0,0.3)]"
            style={{ width: 'var(--sidebar-width)' }}
        >
            {/* Logo */}
            <div className="mb-12">
                <Link href="/dashboard">
                    <div className="w-10 h-10 relative">
                        <Image
                            src="/logo.svg"
                            alt="Nortus Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                </Link>
            </div>

            {/* Navigation Icons */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-[29px]">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const label = t(item.key as any);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 bg-white/5",
                                !isActive && "text-gray-400 hover:text-white hover:bg-white/10"
                            )}
                            title={label}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 bg-primary rounded-xl shadow-[0px_0px_20px_rgba(24,118,210,0.8)]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }}
                                />
                            )}
                            <div className={cn(
                                "relative w-6 h-6 transition-all duration-200",
                                isActive ? "scale-110 text-white" : "opacity-70 group-hover:opacity-100"
                            )}>
                                <Image
                                    src={item.icon}
                                    alt={label}
                                    fill
                                    className={cn(
                                        "object-contain transition-all",
                                        isActive ? "brightness-0 invert" : ""
                                    )}
                                />
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Avatar */}
            <UserMenu />
        </aside>
    );
}
