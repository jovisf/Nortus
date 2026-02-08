import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { simulatorService } from '@/services'
import { useSimulatorStore, ADDITIONAL_COVERAGES } from '@/store'
import type { PlanIndicator } from '@/types'

export function useSimulator() {
    const {
        vehicleValue,
        clientAge,
        selectedAdditionalCoverages,
        selectedPlanName,
        setVehicleValue,
        setClientAge,
        toggleAdditionalCoverage,
        setSelectedPlan
    } = useSimulatorStore()

    const { data, isLoading, error } = useQuery({
        queryKey: ['simulator-data'],
        queryFn: () => simulatorService.getSimulatorData(),
    })

    const additionalCoveragesSum = useMemo(() => {
        return ADDITIONAL_COVERAGES
            .filter(c => selectedAdditionalCoverages.includes(c.id))
            .reduce((sum, c) => sum + c.value, 0)
    }, [selectedAdditionalCoverages])

    const calculatedPlans = useMemo(() => {
        if (!data?.plansIndicators) return []

        return data.plansIndicators.map((plan: PlanIndicator) => {
            const vehicleMultiplier = 1 + (vehicleValue / 800000)

            let ageFactor = 1.0
            if (clientAge < 25) {
                ageFactor = 1.35
            } else if (clientAge < 35) {
                ageFactor = 1.15
            } else if (clientAge > 65) {
                ageFactor = 1.2
            } else {
                ageFactor = 1.0
            }

            const finalValue = (plan.value * vehicleMultiplier * ageFactor) + additionalCoveragesSum

            return {
                ...plan,
                finalValue,
            }
        })
    }, [data, vehicleValue, clientAge, additionalCoveragesSum])

    const recommendedPlanName = useMemo(() => {
        if (!calculatedPlans.length) return null

        let ageRiskScore: number
        if (clientAge < 21) ageRiskScore = 1.0
        else if (clientAge < 25) ageRiskScore = 0.8
        else if (clientAge < 30) ageRiskScore = 0.5
        else if (clientAge <= 55) ageRiskScore = 0.2
        else if (clientAge <= 65) ageRiskScore = 0.4
        else if (clientAge <= 75) ageRiskScore = 0.7
        else ageRiskScore = 0.9

        const vehicleRiskScore = Math.min(vehicleValue / 500000, 1.0)

        const protectionInterestScore = selectedAdditionalCoverages.length / 4

        const profileScore = (
            (ageRiskScore * 0.35) +
            (vehicleRiskScore * 0.40) +
            (protectionInterestScore * 0.25)
        )

        const sortedByValue = [...calculatedPlans].sort((a, b) => a.finalValue - b.finalValue)

        if (sortedByValue.length < 3) {
            return sortedByValue[Math.min(1, sortedByValue.length - 1)]?.name || null
        }

        const [basicPlan, standardPlan, premiumPlan] = sortedByValue

        if (profileScore < 0.33) return basicPlan.name
        if (profileScore < 0.60) return standardPlan.name
        return premiumPlan.name
    }, [calculatedPlans, vehicleValue, clientAge, selectedAdditionalCoverages])

    const selectedPlan = useMemo(() => {
        return calculatedPlans.find((p: PlanIndicator & { finalValue: number }) => p.name === selectedPlanName) || null
    }, [calculatedPlans, selectedPlanName])

    return {
        plans: calculatedPlans,
        includedBenefits: data?.includedBenefits || [],
        isLoading,
        error,
        vehicleValue,
        clientAge,
        selectedAdditionalCoverages,
        selectedPlanName,
        selectedPlan,
        recommendedPlanName,
        additionalCoveragesList: ADDITIONAL_COVERAGES,
        actions: {
            setVehicleValue,
            setClientAge,
            toggleAdditionalCoverage,
            setSelectedPlan,
        }
    }
}
