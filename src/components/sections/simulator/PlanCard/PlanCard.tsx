'use client'

import { cn, formatCurrency } from '@/lib'
import type { PlanCardProps } from './PlanCard.types'
import { useTranslations } from 'next-intl'

export function PlanCard({
    name,
    price,
    isSelected,
    isRecommended,
    onSelect,
    className
}: PlanCardProps) {
    const t = useTranslations('Simulator')

    return (
        <div
            onClick={onSelect}
            className={cn(
                'relative cursor-pointer rounded-2xl border-2 p-6 transition-all h-full',
                'bg-card-bg border-border-ui hover:border-primary',
                isSelected ? 'border-primary ring-1 ring-primary' : 'border-border-ui',
                className
            )}
        >
            {isRecommended && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-cyan px-4 py-1.5 text-[10px] font-bold text-app-bg uppercase tracking-wide">
                    {t('recommended')}
                </span>
            )}

            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4">
                {name}
            </h3>

            <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-white">
                    {formatCurrency(price)}
                </span>
                <span className="text-sm text-text-secondary">{t('perMonth')}</span>
            </div>
        </div>
    )
}
