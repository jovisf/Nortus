import { useMemo } from 'react'
import { formatCurrency } from '@/lib/utils'
import { CHART_COMMON_OPTIONS, CHART_COLORS } from '@/constants/charts'
import type { KpisTrend, KpiType } from '@/types'

interface UseKpiChartOptionsProps {
    kpisTrend: KpisTrend | null
    activeKpiTrend: KpiType
}

export function useKpiChartOptions({ kpisTrend, activeKpiTrend }: UseKpiChartOptionsProps) {
    return useMemo(() => {
        if (!kpisTrend) return null

        const trendMapping = {
            arpu: kpisTrend.arpuTrend,
            conversion: kpisTrend.conversionTrend,
            churn: kpisTrend.churnTrend,
            retention: kpisTrend.retentionTrend,
        }

        const activeData = trendMapping[activeKpiTrend]

        return {
            series: [{
                name: activeData.name,
                data: activeData.data
            }],
            options: {
                ...CHART_COMMON_OPTIONS,
                chart: {
                    ...CHART_COMMON_OPTIONS.chart,
                    type: 'area' as const,
                    height: 350,
                    animations: {
                        ...CHART_COMMON_OPTIONS.chart.animations,
                        animateGradually: { enabled: true, delay: 150 },
                        dynamicAnimation: { enabled: true, speed: 350 }
                    }
                },
                stroke: {
                    curve: 'smooth' as const,
                    width: 2,
                    colors: [CHART_COLORS.primary]
                },
                xaxis: {
                    ...CHART_COMMON_OPTIONS.xaxis,
                    type: 'category' as const,
                    categories: kpisTrend.labels,
                },
                grid: {
                    ...CHART_COMMON_OPTIONS.grid,
                    padding: { left: 10 }
                },
                annotations: {
                    xaxis: kpisTrend.labels.map((label) => ({
                        x: label,
                        borderColor: CHART_COLORS.gridBorder,
                        strokeDashArray: 5,
                        borderWidth: 1,
                    }))
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0,
                        stops: [0, 100],
                        colorStops: [
                            { offset: 0, color: CHART_COLORS.primary, opacity: 1 },
                            { offset: 100, color: CHART_COLORS.primary, opacity: 0 }
                        ]
                    }
                },
                tooltip: {
                    ...CHART_COMMON_OPTIONS.tooltip,
                    custom: function ({ series, seriesIndex, dataPointIndex }: any) {
                        return `<div class="bg-white/15 backdrop-blur-sm px-3 py-1 text-white border-0 rounded-lg text-sm font-medium shadow-none">
                            <span>${formatCurrency(series[seriesIndex][dataPointIndex])}</span>
                        </div>`
                    }
                },
                markers: {
                    size: 0,
                    hover: { size: 5 }
                },
                colors: [CHART_COLORS.primary]
            }
        }
    }, [kpisTrend, activeKpiTrend])
}
