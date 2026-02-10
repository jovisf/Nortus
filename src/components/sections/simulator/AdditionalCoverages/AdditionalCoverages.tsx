'use client';

import { cn } from '@/lib';
import type { BaseComponentProps, AdditionalCoverage } from '@/types';
import { CoverageItem } from './CoverageItem';
import { useTranslations } from 'next-intl';

interface AdditionalCoveragesProps extends BaseComponentProps {
  coverages: AdditionalCoverage[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function AdditionalCoverages({
  coverages,
  selectedIds,
  onToggle,
  className,
}: AdditionalCoveragesProps) {
  const t = useTranslations('Simulator');

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <h3 className="mb-2 font-semibold text-white">
        {t('additionalCoverages')}
      </h3>
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
  );
}
