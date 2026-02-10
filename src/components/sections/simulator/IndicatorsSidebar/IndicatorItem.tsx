'use client';

import { formatCurrency } from '@/lib';
import type { PlanIndicator } from '@/types';

interface IndicatorItemProps {
  plan: PlanIndicator & { finalValue: number };
}

export function IndicatorItem({ plan }: IndicatorItemProps) {
  return (
    <div className="bg-card-bg border-border-ui flex items-center justify-between rounded-xl border p-5">
      <div>
        <h4 className="mb-2 font-medium text-white">{plan.name}</h4>
        <div className="flex gap-4 text-xs">
          <span className="text-text-secondary">
            Conversão:{' '}
            <span className="text-conversion-green">{plan.conversion}%</span>
          </span>
          <span className="text-text-secondary">
            ROI: <span className="text-conversion-green">{plan.roi}%</span>
          </span>
        </div>
      </div>
      <span className="text-xl font-bold whitespace-nowrap text-white">
        {formatCurrency(plan.finalValue)}
      </span>
    </div>
  );
}
