import { useMemo } from 'react'
import { formatCurrency } from '@/lib/utils'
import type { KpisTrend, KpiType } from '@/types'

interface UseKpiChartOptionsProps {
    kpisTrend: KpisTrend | null
    activeKpiTrend: KpiType
}

export function useKpiChartOptions({ kpisTrend, activeKpiTrend }: UseKpiChartOptionsProps) {
    return useMemo(() => {
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
                    },
                    zoom: {
                        enabled: false
                    },
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800,
                        animateGradually: {
                            enabled: true,
                            delay: 150
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 350
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth' as const,
                    width: 2,
                    colors: ['#43D2CB']
                },
                xaxis: {
                    categories: kpisTrend.labels,
                    axisBorder: {
                        show: true,
                        color: 'rgba(255, 255, 255, 0.25)'
                    },
                    axisTicks: {
                        show: true,
                        color: 'rgba(255, 255, 255, 0.25)'
                    },
                    labels: {
                        style: {
                            colors: '#FFFFFF',
                            fontSize: '14px',
                            fontFamily: 'Inter, sans-serif'
                        }
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: true,
                        color: 'rgba(255, 255, 255, 0.25)'
                    },
                    labels: {
                        style: {
                            colors: '#FFFFFF',
                            fontSize: '14px',
                            fontFamily: 'Inter, sans-serif'
                        }
                    }
                },
                grid: {
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    strokeDashArray: 5,
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: true
                        }
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 10
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0,
                        stops: [0, 100],
                        colorStops: [
                            {
                                offset: 0,
                                color: '#43D2CB',
                                opacity: 1
                            },
                            {
                                offset: 100,
                                color: '#43D2CB',
                                opacity: 0
                            }
                        ]
                    }
                },
                tooltip: {
                    theme: 'dark',
                    custom: function ({ series, seriesIndex, dataPointIndex }: any) {
                        return (
                            '<div class="bg-white/15 backdrop-blur-sm px-3 py-1 text-white border-0 rounded-lg text-sm font-medium shadow-none">' +
                            '<span>' + formatCurrency(series[seriesIndex][dataPointIndex]) + '</span>' +
                            '</div>'
                        )
                    }
                },
                markers: {
                    size: 0,
                    hover: {
                        size: 5
                    }
                },
                colors: ['#43D2CB']
            }
        }
    }, [kpisTrend, activeKpiTrend])
}
