'use client'

import { cn, formatCurrency } from '@/lib'
import type { BaseComponentProps, PlanIndicator } from '@/types'

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
            {/* Benefícios Inclusos Section */}
            <div className="bg-card-bg rounded-2xl p-6 border border-border-ui">
                <h3 className="text-text-primary font-semibold mb-6">Benefícios Inclusos</h3>
                <div className="flex flex-wrap gap-3">
                    {includedBenefits.map((benefit, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 rounded-full bg-app-bg px-4 py-2 border border-border-ui"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm text-text-secondary">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicadores Section (My Page in image) */}
            <div className="bg-card-bg rounded-2xl p-6 border border-border-ui flex-1">
                <h3 className="text-text-primary font-semibold mb-6">Indicadores</h3>
                <div className="flex flex-col gap-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className="bg-dashboard-bg rounded-xl p-5 border border-border-ui flex justify-between items-center"
                        >
                            <div>
                                <h4 className="text-text-primary font-medium mb-2">{plan.name}</h4>
                                <div className="flex gap-4 text-xs">
                                    <span className="text-text-secondary">
                                        Conversão: <span className="text-success">{plan.conversion}%</span>
                                    </span>
                                    <span className="text-text-secondary">
                                        ROI: <span className="text-success">{plan.roi}%</span>
                                    </span>
                                </div>
                            </div>
                            <span className="text-xl font-bold text-text-primary whitespace-nowrap">
                                {formatCurrency(plan.finalValue)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
