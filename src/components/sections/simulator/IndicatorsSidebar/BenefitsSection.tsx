'use client'

import { useTranslations } from 'next-intl'

interface BenefitsSectionProps {
    benefits: string[]
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
    const t = useTranslations('Simulator')
    const dotColors = ['#006FFF', '#53A9FD', '#00449E']

    return (
        <div className="bg-card-bg rounded-2xl p-6 border border-border-ui">
            <h3 className="text-white font-semibold mb-6">{t('includedBenefits')}</h3>
            <div className="flex flex-wrap gap-3">
                {benefits.map((benefit, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2 rounded-full bg-card-bg px-4 py-2 border border-border-ui"
                    >
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: dotColors[idx % dotColors.length] }}
                        />
                        <span className="text-sm text-white">{benefit}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
