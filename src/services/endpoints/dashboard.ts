import { api } from '@/lib';
import type { DashboardData, MapLocationsResponse } from '@/types';

const DASHBOARD_URL = '/nortus-v1/dashboard';

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    const response = await api.get<DashboardData>(DASHBOARD_URL);
    return response.data;
  },

  async getLocations(): Promise<MapLocationsResponse> {
    const response = await api.get<MapLocationsResponse>('/map/locations');
    return response.data;
  },
};
