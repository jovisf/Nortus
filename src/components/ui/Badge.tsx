'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'outline' | 'ghost';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
    const variants = {
        default: 'px-4 py-1.5 rounded-full text-xs font-bold',
        outline: 'px-4 py-1.5 rounded-full text-xs font-bold border',
        ghost: 'px-4 py-1.5 rounded-full text-xs font-bold bg-white/5',
    };

    return (
        <span className={cn(variants[variant], className)}>
            {children}
        </span>
    );
}
