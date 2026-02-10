'use client';

import { ReactNode } from 'react';
import { useLayoutStore } from '@/store/useLayoutStore';
import { useTranslations } from 'next-intl';

interface HeaderProps {
  title?: string;
  actions?: ReactNode;
}

export function Header({
  title: propTitle,
  actions: propActions,
}: HeaderProps) {
  const t = useTranslations('Layout.header');
  const { headerTitle, headerActions } = useLayoutStore();

  const titleMap: Record<string, string> = {
    Dashboard: 'dashboard',
    Tickets: 'tickets',
    Chat: 'chat',
    'Chat & Assistente Virtual': 'chat',
    'Simulador de Planos': 'simulator',
    Simulador: 'simulator',
    Nortus: 'defaultTitle',
  };

  const rawTitle = propTitle ?? headerTitle;
  const translationKey = titleMap[rawTitle];
  const title = translationKey
    ? t(
        translationKey as
          | 'dashboard'
          | 'tickets'
          | 'chat'
          | 'simulator'
          | 'defaultTitle'
      )
    : rawTitle;

  const actions = propActions ?? headerActions;

  return (
    <header
      className="bg-layout-bg border-border-ui fixed top-0 left-0 z-40 flex w-full items-center justify-between border-b px-10"
      style={{
        height: 'var(--header-height)',
        paddingLeft: 'calc(var(--sidebar-width) + 40px)',
      }}
    >
      <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>

      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </header>
  );
}
