'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import type { KpiTrendChartProps } from './KpiTrendChart.types'
import type { KpiType } from '@/types'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function KpiTrendChart({ kpisTrend, activeKpiTrend, onKpiChange, className }: KpiTrendChartProps) {
    const kpiButtons: { label: string; value: KpiType }[] = [
        { label: 'Retenção', value: 'retention' },
        { label: 'Conversão', value: 'conversion' },
        { label: 'Churn', value: 'churn' },
        { label: 'ARPU', value: 'arpu' },
    ]

    const chartData = useMemo(() => {
        if (!kpisTrend) return null

        let seriesData: number[] = []
        let seriesName = ''

        switch (activeKpiTrend) {
            case 'arpu':
                seriesData = kpisTrend.arpuTrend.data
                seriesName = kpisTrend.arpuTrend.name
                break
            case 'conversion':
                seriesData = kpisTrend.conversionTrend.data
                seriesName = kpisTrend.conversionTrend.name
                break
            case 'churn':
                seriesData = kpisTrend.churnTrend.data
                seriesName = kpisTrend.churnTrend.name
                break
            case 'retention':
                seriesData = kpisTrend.retentionTrend.data
                seriesName = kpisTrend.retentionTrend.name
                break
        }

        return {
            series: [{
                name: seriesName,
                data: seriesData
            }],
            options: {
                chart: {
                    type: 'area' as const,
                    height: 350,
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth' as const,
                    width: 2
                },
                xaxis: {
                    categories: kpisTrend.labels
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.3,
                    }
                },
                colors: ['#3b82f6']
            }
        }
    }, [kpisTrend, activeKpiTrend])

    if (!kpisTrend || !chartData) {
        return (
            <div className={cn('bg-white rounded-lg p-6 shadow-sm border border-gray-200', className)}>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
                <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className={cn('bg-white rounded-lg p-6 shadow-sm border border-gray-200', className)}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Evolução dos KPI&apos;s</h2>
                <div className="flex gap-2">
                    {kpiButtons.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => onKpiChange(btn.value)}
                            className={cn(
                                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                                activeKpiTrend === btn.value
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            )}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={350}
            />
        </div>
    )
}
