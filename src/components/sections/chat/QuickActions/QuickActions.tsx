'use client';

import { Badge } from '@/components/ui/Badge';

import type { QuickActionsProps } from './QuickActions.types';

const QUICK_ACTIONS = [
  { id: 'send_proposal', label: 'Enviar proposta' },
  { id: 'make_call', label: 'Fazer ligação' },
  { id: 'view_history', label: 'Ver histórico' },
] as const;

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap justify-end gap-2.5">
      {QUICK_ACTIONS.map((action) => (
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
