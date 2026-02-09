'use client';

import { useEffect, ReactNode } from 'react';
import { useLayoutStore } from '@/store/useLayoutStore';

export function useHeader(title: string, actions: ReactNode | null = null) {
    const setHeaderTitle = useLayoutStore((state) => state.setHeaderTitle);
    const setHeaderActions = useLayoutStore((state) => state.setHeaderActions);
    const resetHeader = useLayoutStore((state) => state.resetHeader);

    useEffect(() => {
        setHeaderTitle(title);
    }, [title, setHeaderTitle]);

    useEffect(() => {
        setHeaderActions(actions);
    }, [actions, setHeaderActions]);

    useEffect(() => {
        return () => resetHeader();
    }, [resetHeader]);
}
