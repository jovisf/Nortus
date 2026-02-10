'use client';

import { useTranslations } from 'next-intl';

interface BenefitsSectionProps {
  benefits: string[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  const t = useTranslations('Simulator');
  const dotColors = ['#006FFF', '#53A9FD', '#00449E'];

  return (
    <div className="bg-card-bg border-border-ui rounded-2xl border p-6">
      <h3 className="mb-6 font-semibold text-white">{t('includedBenefits')}</h3>
      <div className="flex flex-wrap gap-3">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="bg-card-bg border-border-ui flex items-center gap-2 rounded-full border px-4 py-2"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: dotColors[idx % dotColors.length] }}
            />
            <span className="text-sm text-white">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
