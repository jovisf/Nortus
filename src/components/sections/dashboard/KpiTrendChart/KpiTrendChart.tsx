'use client'

import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import type { KpiTrendChartProps } from './KpiTrendChart.types'
import { useKpiChartOptions } from './hooks/useKpiChartOptions'
import { KpiSelector } from './components/KpiSelector'
import { ChartSkeleton } from '../shared/ChartSkeleton'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function KpiTrendChart({ kpisTrend, activeKpiTrend, onKpiChange, className }: KpiTrendChartProps) {
    const chartData = useKpiChartOptions({ kpisTrend, activeKpiTrend })

    if (!kpisTrend || !chartData) {
        return <ChartSkeleton className={className} />
    }

    return (
        <div className={cn('bg-card-bg rounded-[22px] p-6 border border-white/5', className)}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-white tracking-tight">Evolução dos KPI&apos;s</h2>
                <KpiSelector activeKpiTrend={activeKpiTrend} onKpiChange={onKpiChange} />
            </div>
            <div className="h-[350px] w-full">
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height="100%"
                />
            </div>
        </div>
    )
}
