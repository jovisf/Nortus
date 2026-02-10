import { useMemo } from 'react'
import { CHART_COMMON_OPTIONS, CHART_COLORS } from '@/constants/charts'

interface UseConversionChartOptionsProps {
    conversionData: { data: number[] } | null
    labels: string[]
}

export function useConversionChartOptions({ conversionData, labels }: UseConversionChartOptionsProps) {
    return useMemo(() => {
        if (!conversionData) return null

        return {
            series: [{
                name: 'novos clientes',
                data: conversionData.data
            }],
            options: {
                ...CHART_COMMON_OPTIONS,
                chart: {
                    ...CHART_COMMON_OPTIONS.chart,
                    type: 'bar' as const,
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        columnWidth: '35%',
                    }
                },
                stroke: {
                    show: false
                },
                xaxis: {
                    ...CHART_COMMON_OPTIONS.xaxis,
                    categories: labels,
                    labels: {
                        ...CHART_COMMON_OPTIONS.xaxis.labels,
                        offsetY: 5
                    }
                },
                yaxis: {
                    ...CHART_COMMON_OPTIONS.yaxis,
                    min: 0,
                    max: 100,
                    tickAmount: 5,
                    axisTicks: {
                        show: false
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        type: 'vertical',
                        shadeIntensity: 0,
                        opacityFrom: 1,
                        opacityTo: 0.25,
                        stops: [0, 100],
                        inverseColors: false
                    }
                },
                annotations: {
                    xaxis: labels.slice(1, -1).map(label => ({
                        x: label,
                        borderColor: CHART_COLORS.gridBorder,
                        strokeDashArray: 5,
                    }))
                },
                colors: [CHART_COLORS.conversion],
                tooltip: {
                    ...CHART_COMMON_OPTIONS.tooltip,
                    custom: function ({ series, seriesIndex, dataPointIndex }: any) {
                        const val = series[seriesIndex][dataPointIndex]
                        return `<div class="bg-white/15 backdrop-blur-md px-4 py-2 rounded-lg border-none shadow-xl">
                            <span class="text-white text-sm font-semibold">${val} novos clientes</span>
                        </div>`
                    }
                }
            }
        }
    }, [conversionData, labels])
}
