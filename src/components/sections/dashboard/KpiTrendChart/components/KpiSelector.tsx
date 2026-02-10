'use client'

import { cn } from '@/lib/utils'
import type { KpiType } from '@/types'
import { useTranslations } from 'next-intl'

interface KpiSelectorProps {
    activeKpiTrend: KpiType
    onKpiChange: (kpiType: KpiType) => void
}

const KPI_BUTTONS: { key: string; value: KpiType }[] = [
    { key: 'retention', value: 'retention' },
    { key: 'conversion', value: 'conversion' },
    { key: 'churn', value: 'churn' },
    { key: 'arpu', value: 'arpu' },
]

export function KpiSelector({ activeKpiTrend, onKpiChange }: KpiSelectorProps) {
    const t = useTranslations('Dashboard.kpis')

    return (
        <div className="flex bg-white/5 p-2 rounded-[22px] gap-4">
            {KPI_BUTTONS.map((btn) => (
                <button
                    key={btn.value}
                    onClick={() => onKpiChange(btn.value)}
                    className={cn(
                        'px-4 py-2 rounded-[22px] text-sm font-medium transition-all duration-200 cursor-pointer',
                        activeKpiTrend === btn.value
                            ? 'bg-chart-kpi text-white shadow-[0_0_15px_rgba(45,179,200,0.5)]'
                            : 'bg-white/10 text-white hover:bg-white/15'
                    )}
                >
                    {t(btn.key as any)}
                </button>
            ))}
        </div>
    )
}
