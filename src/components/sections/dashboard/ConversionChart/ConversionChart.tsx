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
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 1,
                        opacityTo: 0.2,
                        stops: [0, 100]
                    }
                },
                colors: ['#75dfff']
            }
        }
    }, [conversionData, labels])

    if (!conversionData || !chartData) {
        return (
            <div className={cn('bg-card-bg rounded-lg p-6 shadow-sm border border-border-ui', className)}>
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
                <div className="h-64 bg-gray-800 rounded animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className={cn('bg-card-bg rounded-lg p-6 shadow-sm border border-border-ui', className)}>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-text-primary">Taxa de conversão</h2>
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
