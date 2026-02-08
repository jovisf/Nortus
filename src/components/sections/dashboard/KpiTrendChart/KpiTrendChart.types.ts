import type { BaseComponentProps } from '@/types'
import type { KpisTrend, KpiType } from '@/types'

export interface KpiTrendChartProps extends BaseComponentProps {
    kpisTrend: KpisTrend | null
    activeKpiTrend: KpiType
    onKpiChange: (kpiType: KpiType) => void
}
