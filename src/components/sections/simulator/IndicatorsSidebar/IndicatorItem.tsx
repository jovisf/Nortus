'use client'

import { formatCurrency } from '@/lib'
import type { PlanIndicator } from '@/types'

interface IndicatorItemProps {
    plan: PlanIndicator & { finalValue: number }
}

export function IndicatorItem({ plan }: IndicatorItemProps) {
    return (
        <div className="bg-card-bg rounded-xl p-5 border border-border-ui flex justify-between items-center">
            <div>
                <h4 className="text-white font-medium mb-2">{plan.name}</h4>
                <div className="flex gap-4 text-xs">
                    <span className="text-text-secondary">
                        Conversão: <span className="text-conversion-green">{plan.conversion}%</span>
                    </span>
                    <span className="text-text-secondary">
                        ROI: <span className="text-conversion-green">{plan.roi}%</span>
                    </span>
                </div>
            </div>
            <span className="text-xl font-bold text-white whitespace-nowrap">
                {formatCurrency(plan.finalValue)}
            </span>
        </div>
    )
}
