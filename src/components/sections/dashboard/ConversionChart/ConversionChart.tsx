'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import type { ConversionChartProps } from './ConversionChart.types'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function ConversionChart({ conversionData, labels, className }: ConversionChartProps) {
    const chartData = useMemo(() => {
        if (!conversionData) return null

        return {
            series: [{
                name: 'Novos clientes',
                data: conversionData.data
            }],
            options: {
                chart: {
                    type: 'bar' as const,
                    height: 350,
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        columnWidth: '60%',
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: labels
                },
                colors: ['#3b82f6']
            }
        }
    }, [conversionData, labels])

    if (!conversionData || !chartData) {
        return (
            <div className={cn('bg-white rounded-lg p-6 shadow-sm border border-gray-200', className)}>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
                <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className={cn('bg-white rounded-lg p-6 shadow-sm border border-gray-200', className)}>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Taxa de conversão</h2>
            </div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </div>
    )
}
