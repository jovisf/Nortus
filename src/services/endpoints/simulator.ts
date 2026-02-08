import { api } from '@/lib'
import type { SimulatorData } from '@/types'

const SIMULATOR_URL = '/nortus-v1/simulador-planos'

export const simulatorService = {
    async getSimulatorData(): Promise<SimulatorData> {
        const response = await api.get<SimulatorData>(SIMULATOR_URL)
        return response.data
    }
}
