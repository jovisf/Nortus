import { create } from 'zustand'
import type { SimulatorState, AdditionalCoverage } from '@/types'

export const ADDITIONAL_COVERAGES: AdditionalCoverage[] = [
    { id: '1', name: 'Cobertura contra roubo e furto', value: 25.00 },
    { id: '2', name: 'Danos por colisão', value: 35.00 },
    { id: '3', name: 'Cobertura contra incêndio', value: 20.00 },
    { id: '4', name: 'Fenômenos naturais (granizo, enchente)', value: 30.00 },
]

interface SimulatorStore extends SimulatorState {
    setVehicleValue: (value: number) => void
    setClientAge: (age: number) => void
    toggleAdditionalCoverage: (id: string) => void
    setSelectedPlan: (planName: string) => void
    reset: () => void
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
    // State
    vehicleValue: 50000,
    clientAge: 28,
    selectedAdditionalCoverages: ['1', '2', '3'],
    selectedPlanName: 'Intermediário',

    // Actions
    setVehicleValue: (vehicleValue) => set({ vehicleValue }),
    setClientAge: (clientAge) => set({ clientAge }),
    toggleAdditionalCoverage: (id) => set((state) => ({
        selectedAdditionalCoverages: state.selectedAdditionalCoverages.includes(id)
            ? state.selectedAdditionalCoverages.filter((cid) => cid !== id)
            : [...state.selectedAdditionalCoverages, id]
    })),
    setSelectedPlan: (selectedPlanName) => set({ selectedPlanName }),
    reset: () => set({
        vehicleValue: 50000,
        clientAge: 28,
        selectedAdditionalCoverages: [],
        selectedPlanName: null,
    })
}))
