'use client'

import { cn } from '@/lib'
import type { BaseComponentProps, AdditionalCoverage } from '@/types'
import { CoverageItem } from './CoverageItem'

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
                    <CoverageItem
                        key={coverage.id}
                        coverage={coverage}
                        isSelected={selectedIds.includes(coverage.id)}
                        onToggle={onToggle}
                    />
                ))}
            </div>
        </div>
    )
}
