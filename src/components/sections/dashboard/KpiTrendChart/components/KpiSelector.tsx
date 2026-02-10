import { cn } from '@/lib/utils'
import type { KpiType } from '@/types'

interface KpiSelectorProps {
    activeKpiTrend: KpiType
    onKpiChange: (kpiType: KpiType) => void
}

export function KpiSelector({ activeKpiTrend, onKpiChange }: KpiSelectorProps) {
    const kpiButtons: { label: string; value: KpiType }[] = [
        { label: 'Retenção', value: 'retention' },
        { label: 'Conversão', value: 'conversion' },
        { label: 'Churn', value: 'churn' },
        { label: 'ARPU', value: 'arpu' },
    ]

    return (
        <div className="flex bg-white/5 p-2 rounded-[22px] gap-4">
            {kpiButtons.map((btn) => (
                <button
                    key={btn.value}
                    onClick={() => onKpiChange(btn.value)}
                    className={cn(
                        'px-4 py-2 rounded-[22px] text-sm font-medium transition-all duration-200 cursor-pointer',
                        activeKpiTrend === btn.value
                            ? 'bg-[#2DB3C8] text-white shadow-[0_0_15px_#2DB3C8]'
                            : 'bg-white/10 text-white hover:bg-white/15'
                    )}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    )
}
