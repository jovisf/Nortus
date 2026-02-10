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
            className="fixed top-0 left-0 w-full flex items-center justify-between px-10 bg-layout-bg border-b border-border-ui z-40"
            style={{
                height: 'var(--header-height)',
                paddingLeft: 'calc(var(--sidebar-width) + 40px)'
            }}
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
