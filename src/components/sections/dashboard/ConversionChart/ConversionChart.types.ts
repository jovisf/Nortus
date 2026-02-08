import type { BaseComponentProps } from '@/types'
import type { KpiTrendData } from '@/types'

export interface ConversionChartProps extends BaseComponentProps {
    conversionData: KpiTrendData | null
    labels: string[]
}
