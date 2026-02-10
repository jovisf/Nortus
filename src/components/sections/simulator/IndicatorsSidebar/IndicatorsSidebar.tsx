'use client'

import { cn } from '@/lib'
import type { BaseComponentProps, PlanIndicator } from '@/types'
import { BenefitsSection } from './BenefitsSection'
import { IndicatorItem } from './IndicatorItem'

interface IndicatorsSidebarProps extends BaseComponentProps {
    includedBenefits: string[]
    plans: (PlanIndicator & { finalValue: number })[]
}

export function IndicatorsSidebar({
    includedBenefits,
    plans,
    className
}: IndicatorsSidebarProps) {
    return (
        <div className={cn('flex flex-col gap-8 h-full', className)}>
            <BenefitsSection benefits={includedBenefits} />

            <div className="bg-card-bg rounded-2xl p-6 border border-border-ui flex-1">
                <h3 className="text-white font-semibold mb-6">Indicadores</h3>
                <div className="flex flex-col gap-4">
                    {plans.map((plan) => (
                        <IndicatorItem key={plan.name} plan={plan} />
                    ))}
                </div>
            </div>
        </div>
    )
}
