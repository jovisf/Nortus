'use client'

import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib'
import type { QuickActionsProps } from './QuickActions.types'

const QUICK_ACTIONS = [
    { id: 'send_proposal', label: 'Enviar proposta' },
    { id: 'make_call', label: 'Fazer ligação' },
    { id: 'view_history', label: 'Ver histórico' },
] as const

export function QuickActions({ selectedAction, onActionClick }: QuickActionsProps) {
    return (
        <div className="flex flex-wrap gap-2.5 justify-end">
            {QUICK_ACTIONS.map((action) => (
                <button
                    key={action.id}
                    onClick={() => onActionClick(action.id)}
                    className="hover:opacity-80 transition-opacity active:scale-95 cursor-pointer"
                >
                    <Badge className="bg-primary text-white px-8 py-2.5 text-[11px] font-semibold border-none rounded-full shadow-lg shadow-primary/20">
                        {action.label}
                    </Badge>
                </button>
            ))}
        </div>
    )
}

