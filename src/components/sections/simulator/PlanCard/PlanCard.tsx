'use client';

import { cn, formatCurrency } from '@/lib';
import type { PlanCardProps } from './PlanCard.types';
import { useTranslations } from 'next-intl';

export function PlanCard({
  name,
  price,
  isSelected,
  isRecommended,
  onSelect,
  className,
}: PlanCardProps) {
  const t = useTranslations('Simulator');

  return (
    <div
      onClick={onSelect}
      className={cn(
        'relative h-full cursor-pointer rounded-2xl border-2 p-6 transition-all',
        'bg-card-bg border-border-ui hover:border-primary',
        isSelected ? 'border-primary ring-primary ring-1' : 'border-border-ui',
        className
      )}
    >
      {isRecommended && (
        <span className="bg-brand-cyan text-app-bg absolute top-4 right-4 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wide uppercase">
          {t('recommended')}
        </span>
      )}

      <h3 className="mb-4 text-sm font-medium tracking-wider text-white uppercase">
        {name}
      </h3>

      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold text-white">
          {formatCurrency(price)}
        </span>
        <span className="text-text-secondary text-sm">{t('perMonth')}</span>
      </div>
    </div>
  );
}
