'use client'

import { cn, formatCurrency } from '@/lib'
import type { PlanCardProps } from './PlanCard.types'

export function PlanCard({
    name,
    price,
    isSelected,
    isRecommended,
    onSelect,
    className
}: PlanCardProps) {
    return (
        <div
            onClick={onSelect}
            className={cn(
                'relative cursor-pointer rounded-2xl border-2 p-6 transition-all h-full',
                'bg-[#1a1b2e] border-[#2a2d45] hover:border-blue-500',
                isSelected ? 'border-blue-500 ring-1 ring-blue-500' : 'border-[#2a2d45]',
                className
            )}
        >
            {isRecommended && (
                <span className="absolute right-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-[#0a0b1e]">
                    Recomendado
                </span>
            )}

            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                {name}
            </h3>

            <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-white">
                    {formatCurrency(price)}
                </span>
                <span className="text-sm text-gray-500">Por mês</span>
            </div>
        </div>
    )
}
