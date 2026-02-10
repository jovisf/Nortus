'use client'

import { useSimulator } from '@/hooks/simulator/useSimulator'
import { PlanCard } from '@/components/sections/simulator/PlanCard'
import { SimulatorSliders } from '@/components/sections/simulator/SimulatorSliders'
import { AdditionalCoverages } from '@/components/sections/simulator/AdditionalCoverages'
import { IndicatorsSidebar } from '@/components/sections/simulator/IndicatorsSidebar'
import { useHeader } from '@/hooks'
import { useTranslations } from 'next-intl'

export default function SimulatorPage() {
    useHeader('Simulador')
    const t = useTranslations('Simulator')
    const tErr = useTranslations('Errors')

    const {
        plans,
        includedBenefits,
        isLoading,
        error,
        vehicleValue,
        clientAge,
        selectedAdditionalCoverages,
        selectedPlanName,
        recommendedPlanName,
        additionalCoveragesList,
        actions
    } = useSimulator()

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-white">
                <h2 className="text-xl font-bold text-red-500">{tErr('unexpected')}</h2>
                <p className="text-gray-400 mt-2">{tErr('serverError')}</p>
            </div>
        )
    }

    return (
        <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Area */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <section className="bg-card-bg rounded-3xl p-8 border border-border-ui">
                        <h2 className="text-2xl font-bold text-white mb-8">{t('title')}</h2>

                        {/* Plans Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                            {isLoading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="h-48 bg-card-bg animate-pulse rounded-2xl border border-border-ui" />
                                ))
                            ) : (
                                plans.map((plan) => (
                                    <PlanCard
                                        key={plan.name}
                                        name={plan.name}
                                        price={plan.finalValue}
                                        isSelected={selectedPlanName === plan.name}
                                        isRecommended={plan.name === recommendedPlanName}
                                        onSelect={() => actions.setSelectedPlan(plan.name)}
                                    />
                                ))
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-10">
                            <SimulatorSliders
                                vehicleValue={vehicleValue}
                                clientAge={clientAge}
                                onVehicleValueChange={actions.setVehicleValue}
                                onClientAgeChange={actions.setClientAge}
                            />

                            <AdditionalCoverages
                                coverages={additionalCoveragesList}
                                selectedIds={selectedAdditionalCoverages}
                                onToggle={actions.toggleAdditionalCoverage}
                            />
                        </div>
                    </section>
                </div>

                {/* Sidebar Area */}
                <div className="lg:col-span-1">
                    {isLoading ? (
                        <div className="flex flex-col gap-8">
                            <div className="h-40 bg-card-bg animate-pulse rounded-2xl border border-border-ui" />
                            <div className="h-[400px] bg-card-bg animate-pulse rounded-2xl border border-border-ui" />
                        </div>
                    ) : (
                        <IndicatorsSidebar
                            includedBenefits={includedBenefits}
                            plans={plans}
                        />
                    )}
                </div>

            </div>
        </div>
    )
}
