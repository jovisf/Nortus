'use client';

import { useSimulator } from '@/hooks/simulator/useSimulator';
import { PlanCard } from '@/components/sections/simulator/PlanCard';
import { SimulatorSliders } from '@/components/sections/simulator/SimulatorSliders';
import { AdditionalCoverages } from '@/components/sections/simulator/AdditionalCoverages';
import { IndicatorsSidebar } from '@/components/sections/simulator/IndicatorsSidebar';
import { useHeader } from '@/hooks';
import { useTranslations } from 'next-intl';
import { PageSkeleton } from '@/components/shared';

export default function SimulatorPage() {
  useHeader('Simulador');
  const t = useTranslations('Simulator');
  const tErr = useTranslations('Errors');

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
    actions,
  } = useSimulator();

  if (isLoading) {
    return <PageSkeleton type="simulator" />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-white">
        <h2 className="text-xl font-bold text-red-500">{tErr('unexpected')}</h2>
        <p className="mt-2 text-gray-400">{tErr('serverError')}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          <section className="bg-card-bg border-border-ui rounded-3xl border p-8">
            <h2 className="mb-8 text-2xl font-bold text-white">{t('title')}</h2>

            {/* Plans Grid */}
            <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.name}
                  name={plan.name}
                  price={plan.finalValue}
                  isSelected={selectedPlanName === plan.name}
                  isRecommended={plan.name === recommendedPlanName}
                  onSelect={() => actions.setSelectedPlan(plan.name)}
                />
              ))}
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
          <IndicatorsSidebar
            includedBenefits={includedBenefits}
            plans={plans}
          />
        </div>
      </div>
    </div>
  );
}
