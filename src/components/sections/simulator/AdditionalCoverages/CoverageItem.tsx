'use client';

import { formatCurrency } from '@/lib';
import type { AdditionalCoverage } from '@/types';

interface CoverageItemProps {
  coverage: AdditionalCoverage;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function CoverageItem({
  coverage,
  isSelected,
  onToggle,
}: CoverageItemProps) {
  return (
    <label className="group flex cursor-pointer items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(coverage.id)}
          className="border-primary/30 checked:bg-primary checked:border-primary flex h-4 w-4 cursor-pointer appearance-none items-center justify-center rounded-md border-2 bg-transparent transition-all after:hidden after:text-[10px] after:text-white after:content-['✓'] checked:after:block"
        />
        <span className="text-white transition-colors group-hover:text-white">
          {coverage.name}
        </span>
      </div>
      <span className="font-medium whitespace-nowrap text-white opacity-80">
        + {formatCurrency(coverage.value)}
      </span>
    </label>
  );
}
