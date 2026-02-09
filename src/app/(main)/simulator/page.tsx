'use client'

import { useSimulator } from '@/hooks/simulator/useSimulator'
import { PlanCard } from '@/components/sections/simulator/PlanCard'
import { SimulatorSliders } from '@/components/sections/simulator/SimulatorSliders'
import { AdditionalCoverages } from '@/components/sections/simulator/AdditionalCoverages'
import { IndicatorsSidebar } from '@/components/sections/simulator/IndicatorsSidebar'
import { useHeader } from '@/hooks'

export default function SimulatorPage() {
    useHeader('Simulador de Planos')

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
                <h2 className="text-xl font-bold text-red-500">Erro ao carregar o simulador</h2>
                <p className="text-gray-400 mt-2">Tente atualizar a página mais tarde.</p>
            </div>
        )
    }

    return (
        <div className="p-10">
            <div className="max-w-[1400px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <section className="bg-sidebar rounded-3xl p-8 border border-border-muted">
                            <h2 className="text-2xl font-bold text-white mb-8">Planos personalizados</h2>

                            {/* Plans Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                                {isLoading ? (
                                    Array(3).fill(0).map((_, i) => (
                                        <div key={i} className="h-48 bg-[#1e2038] animate-pulse rounded-2xl border border-[#2a2d45]" />
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
                                <div className="h-40 bg-[#1a1b2e] animate-pulse rounded-2xl border border-[#2a2d45]" />
                                <div className="h-[400px] bg-[#1a1b2e] animate-pulse rounded-2xl border border-[#2a2d45]" />
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
        </div>
    )
}
