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
            <div className="bg-[#1a1b2e] rounded-2xl p-6 border border-[#2a2d45]">
                <h3 className="text-white font-semibold mb-6">Benefícios Inclusos</h3>
                <div className="flex flex-wrap gap-3">
                    {includedBenefits.map((benefit, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 rounded-full bg-[#1e2038] px-4 py-2 border border-[#2a2d45]"
                        >
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicadores Section (My Page in image) */}
            <div className="bg-[#1a1b2e] rounded-2xl p-6 border border-[#2a2d45] flex-1">
                <h3 className="text-white font-semibold mb-6">Indicadores</h3>
                <div className="flex flex-col gap-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className="bg-[#141526] rounded-xl p-5 border border-[#2a2d45] flex justify-between items-center"
                        >
                            <div>
                                <h4 className="text-white font-medium mb-2">{plan.name}</h4>
                                <div className="flex gap-4 text-xs">
                                    <span className="text-gray-500">
                                        Conversão: <span className="text-green-500">{plan.conversion}%</span>
                                    </span>
                                    <span className="text-gray-500">
                                        ROI: <span className="text-green-500">{plan.roi}%</span>
                                    </span>
                                </div>
                            </div>
                            <span className="text-xl font-bold text-white whitespace-nowrap">
                                {formatCurrency(plan.finalValue)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
