'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FolderOpen,
    MessageSquare,
    User,
    Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const NAV_ITEMS = [
    { icon: LayoutDashboard, href: '/dashboard', label: 'Dashboard' },
    { icon: FolderOpen, href: '/tickets', label: 'Tickets' },
    { icon: MessageSquare, href: '/chat', label: 'Chat' },
    { icon: Calculator, href: '/simulator', label: 'Simulador' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="fixed left-0 top-0 bottom-0 flex flex-col items-center py-8 bg-sidebar border-r border-border-muted z-50"
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
            <nav className="flex-1 flex flex-col gap-6">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                            title={item.label}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                            {/* Tooltip or Label could go here if needed, but per Figma it's a rail */}
                        </Link>
                    );
                })}
            </nav>

            {/* User Avatar */}
            <div className="mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white/10">
                    AC
                </div>
            </div>
        </aside>
    );
}
