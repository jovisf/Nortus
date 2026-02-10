import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services';
import { useDashboardStore } from '@/store';
import type { ActiveClient, KpiTrendData } from '@/types';

export function useDashboard() {
  const {
    activeKpiTrend,
    mapFilters,
    tableFilters,
    setActiveKpiTrend,
    setMapFilter,
    setTableFilter,
    resetMapFilters,
    resetTableFilters,
  } = useDashboardStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: () => dashboardService.getDashboardData(),
  });

  const activeTrendData: KpiTrendData | null = useMemo(() => {
    if (!data?.kpisTrend) return null;

    switch (activeKpiTrend) {
      case 'arpu':
        return data.kpisTrend.arpuTrend;
      case 'conversion':
        return data.kpisTrend.conversionTrend;
      case 'churn':
        return data.kpisTrend.churnTrend;
      case 'retention':
        return data.kpisTrend.retentionTrend;
      default:
        return data.kpisTrend.arpuTrend;
    }
  }, [data, activeKpiTrend]);

  const filteredClientsForMap = useMemo(() => {
    if (!data?.activeClients?.data) return [];

    return data.activeClients.data.filter((client: ActiveClient) => {
      const secureTypeMatch =
        mapFilters.secureType === 'Todos' ||
        client.secureType === mapFilters.secureType;
      const locationMatch =
        mapFilters.location === 'Todos' ||
        client.location === mapFilters.location;

      return secureTypeMatch && locationMatch;
    });
  }, [data, mapFilters]);

  const filteredClientsForTable = useMemo(() => {
    if (!data?.activeClients?.data) return [];

    return data.activeClients.data.filter((client: ActiveClient) => {
      const statusMatch =
        tableFilters.status === 'Todos' ||
        client.status === tableFilters.status;
      const secureTypeMatch =
        tableFilters.secureType === 'Todos' ||
        client.secureType === tableFilters.secureType;
      const locationMatch =
        tableFilters.location === 'Todos' ||
        client.location === tableFilters.location;

      return statusMatch && secureTypeMatch && locationMatch;
    });
  }, [data, tableFilters]);

  return {
    kpisTrend: data?.kpisTrend || null,
    activeClients: data?.activeClients || null,
    filteredClientsForMap,
    filteredClientsForTable,

    activeKpiTrend,
    activeTrendData,

    mapFilters,
    tableFilters,

    isLoading,
    error,

    actions: {
      setActiveKpiTrend,
      setMapFilter,
      setTableFilter,
      resetMapFilters,
      resetTableFilters,
    },
  };
}
