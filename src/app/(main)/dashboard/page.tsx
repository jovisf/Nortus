'use client'

import { useDashboard, useHeader } from '@/hooks'
import { KpiTrendChart } from '@/components/sections/dashboard/KpiTrendChart'
import { ConversionChart } from '@/components/sections/dashboard/ConversionChart'
import { ClientsMap } from '@/components/sections/dashboard/ClientsMap'
import { ActiveClientsTable } from '@/components/sections/dashboard/ActiveClientsTable'
import { useTranslations } from 'next-intl'
import { PageSkeleton } from '@/components/shared'

export default function DashboardPage() {
    useHeader('Dashboard')
    const t = useTranslations('Errors');

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

    if (isLoading) {
        return <PageSkeleton />
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="bg-red-50/10 border border-red-200/20 rounded-lg p-4 text-red-400">
                    {t('serverError')}
                </div>
            </div>
        )
    }

    return (
        <div className="page-container space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <KpiTrendChart
                        kpisTrend={kpisTrend}
                        activeKpiTrend={activeKpiTrend}
                        onKpiChange={actions.setActiveKpiTrend}
                        className="h-full"
                    />
                </div>
                <div className="lg:col-span-1">
                    <ConversionChart
                        conversionData={kpisTrend?.conversionTrend || null}
                        labels={kpisTrend?.labels || []}
                        className="h-full"
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
        </div>
    )
}
