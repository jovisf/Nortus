'use client'

import { cn } from '@/lib'
import type { QuickActionsProps } from './QuickActions.types'
import type { QuickActionType } from '@/types'

interface ActionButton {
    id: QuickActionType
    label: string
    icon: string
}

const QUICK_ACTIONS: ActionButton[] = [
    { id: 'send_proposal', label: 'Enviar proposta', icon: '📄' },
    { id: 'make_call', label: 'Fazer ligação', icon: '📞' },
    { id: 'view_history', label: 'Ver histórico', icon: '📋' },
]

export function QuickActions({ selectedAction, onActionClick }: QuickActionsProps) {
    return (
        <div className="flex flex-wrap gap-3 p-4 border-t border-gray-700">
            {QUICK_ACTIONS.map((action) => (
                <button
                    key={action.id}
                    onClick={() => onActionClick(action.id)}
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200',
                        'text-sm font-medium',
                        selectedAction === action.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                            : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 border border-blue-500/30'
                    )}
                >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    )
}
