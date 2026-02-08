import { api } from '@/lib'
import type { DashboardData } from '@/types'

const DASHBOARD_URL = '/nortus-v1/dashboard'

export const dashboardService = {
    async getDashboardData(): Promise<DashboardData> {
        const response = await api.get<DashboardData>(DASHBOARD_URL)
        return response.data
    }
}
