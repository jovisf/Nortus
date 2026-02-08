'use client'

import { useDashboard } from '@/hooks'
import { KpiTrendChart } from '@/components/sections/dashboard/KpiTrendChart'
import { ConversionChart } from '@/components/sections/dashboard/ConversionChart'
import { ClientsMap } from '@/components/sections/dashboard/ClientsMap'
import { ActiveClientsTable } from '@/components/sections/dashboard/ActiveClientsTable'

export default function DashboardPage() {
    const {
        kpisTrend,
        activeClients,
        filteredClientsForMap,
        filteredClientsForTable,
        activeKpiTrend,
        mapFilters,
        tableFilters,
        isLoading,
        error,
        actions
    } = useDashboard()

    if (error) {
        return (
            <main className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    Erro ao carregar dados do dashboard. Por favor, tente novamente.
                </div>
            </main>
        )
    }

    return (
        <main className="p-6 space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <KpiTrendChart
                        kpisTrend={kpisTrend}
                        activeKpiTrend={activeKpiTrend}
                        onKpiChange={actions.setActiveKpiTrend}
                    />
                </div>
                <div className="lg:col-span-1">
                    <ConversionChart
                        conversionData={kpisTrend?.conversionTrend || null}
                        labels={kpisTrend?.labels || []}
                    />
                </div>
            </div>

            {/* Clients Map */}
            <ClientsMap
                clients={filteredClientsForMap}
                filters={mapFilters}
                onFilterChange={actions.setMapFilter}
                availableFilters={{
                    locations: activeClients?.filters.locations || [],
                    secureTypes: activeClients?.filters.secureType || []
                }}
            />

            {/* Active Clients Table */}
            <ActiveClientsTable
                clients={filteredClientsForTable}
                filters={tableFilters}
                availableFilters={activeClients?.filters || { status: [], secureType: [], locations: [] }}
                onFilterChange={actions.setTableFilter}
            />
        </main>
    )
}
