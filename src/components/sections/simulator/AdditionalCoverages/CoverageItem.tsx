'use client'

import { formatCurrency } from '@/lib'
import type { AdditionalCoverage } from '@/types'

interface CoverageItemProps {
    coverage: AdditionalCoverage
    isSelected: boolean
    onToggle: (id: string) => void
}

export function CoverageItem({ coverage, isSelected, onToggle }: CoverageItemProps) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(coverage.id)}
                    className="w-4 h-4 rounded-md border-2 border-primary/30 bg-transparent checked:bg-primary checked:border-primary transition-all cursor-pointer appearance-none flex items-center justify-center after:content-['✓'] after:text-white after:text-[10px] after:hidden checked:after:block"
                />
                <span className="text-white group-hover:text-white transition-colors">
                    {coverage.name}
                </span>
            </div>
            <span className="text-white font-medium whitespace-nowrap opacity-80">
                + {formatCurrency(coverage.value)}
            </span>
        </label>
    )
}
