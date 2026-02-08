'use client'

import { cn, formatCurrency } from '@/lib'
import type { BaseComponentProps, AdditionalCoverage } from '@/types'

interface AdditionalCoveragesProps extends BaseComponentProps {
    coverages: AdditionalCoverage[]
    selectedIds: string[]
    onToggle: (id: string) => void
}

export function AdditionalCoverages({
    coverages,
    selectedIds,
    onToggle,
    className
}: AdditionalCoveragesProps) {
    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <h3 className="text-white font-semibold mb-2">Coberturas Adicionais</h3>
            <div className="flex flex-col gap-3">
                {coverages.map((coverage) => (
                    <label
                        key={coverage.id}
                        className="flex items-center justify-between cursor-pointer group"
                    >
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(coverage.id)}
                                onChange={() => onToggle(coverage.id)}
                                className="w-5 h-5 rounded border-gray-700 bg-transparent text-blue-500 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                {coverage.name}
                            </span>
                        </div>
                        <span className="text-gray-400 font-medium whitespace-nowrap">
                            + {formatCurrency(coverage.value)}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    )
}
