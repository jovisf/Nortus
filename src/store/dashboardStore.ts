import { create } from 'zustand';
import type { KpiType, DashboardFilters } from '@/types';

interface DashboardState {
  activeKpiTrend: KpiType;
  mapFilters: DashboardFilters;
  tableFilters: DashboardFilters;
}

interface DashboardActions {
  setActiveKpiTrend: (kpiType: KpiType) => void;
  setMapFilter: (filterType: keyof DashboardFilters, value: string) => void;
  setTableFilter: (filterType: keyof DashboardFilters, value: string) => void;
  resetMapFilters: () => void;
  resetTableFilters: () => void;
}

type DashboardStore = DashboardState & DashboardActions;

const initialFilters: DashboardFilters = {
  status: 'Todos',
  secureType: 'Todos',
  location: 'Todos',
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  activeKpiTrend: 'arpu',
  mapFilters: initialFilters,
  tableFilters: initialFilters,

  setActiveKpiTrend: (activeKpiTrend) => set({ activeKpiTrend }),

  setMapFilter: (filterType, value) =>
    set((state) => ({
      mapFilters: {
        ...state.mapFilters,
        [filterType]: value,
      },
    })),

  setTableFilter: (filterType, value) =>
    set((state) => ({
      tableFilters: {
        ...state.tableFilters,
        [filterType]: value,
      },
    })),

  resetMapFilters: () => set({ mapFilters: initialFilters }),
  resetTableFilters: () => set({ tableFilters: initialFilters }),
}));
