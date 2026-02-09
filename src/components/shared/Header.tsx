'use client';

import { ReactNode } from 'react';
import { useLayoutStore } from '@/store/useLayoutStore';

interface HeaderProps {
    title?: string;
    actions?: ReactNode;
}

export function Header({ title: propTitle, actions: propActions }: HeaderProps) {
    const { headerTitle, headerActions } = useLayoutStore();

    const title = propTitle ?? headerTitle;
    const actions = propActions ?? headerActions;

    return (
        <header
            className="flex items-center justify-between px-10 bg-sidebar border-b border-border-muted flex-shrink-0"
            style={{ height: 'var(--header-height)' }}
        >
            <h1 className="text-2xl font-bold text-white tracking-tight">
                {title}
            </h1>

            {actions && (
                <div className="flex items-center gap-4">
                    {actions}
                </div>
            )}
        </header>
    );
}
