'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import type { QuickActionsProps } from './QuickActions.types';

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const t = useTranslations('Chat.actions');

  const actions = [
    { id: 'send_proposal', label: t('sendProposal') },
    { id: 'make_call', label: t('makeCall') },
    { id: 'view_history', label: t('viewHistory') },
  ] as const;

  return (
    <div className="flex flex-wrap justify-end gap-2.5">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onActionClick(action.id)}
          className="cursor-pointer transition-opacity hover:opacity-80 active:scale-95"
        >
          <Badge className="bg-primary shadow-primary/20 rounded-full border-none px-8 py-2.5 text-[11px] font-semibold text-white shadow-lg">
            {action.label}
          </Badge>
        </button>
      ))}
    </div>
  );
}
