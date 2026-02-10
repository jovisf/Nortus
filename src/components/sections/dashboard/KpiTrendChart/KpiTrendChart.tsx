'use client';

import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import type { KpiTrendChartProps } from './KpiTrendChart.types';
import { useKpiChartOptions } from './hooks/useKpiChartOptions';
import { KpiSelector } from './components/KpiSelector';
import { ChartSkeleton } from '../shared/ChartSkeleton';
import { useTranslations } from 'next-intl';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function KpiTrendChart({
  kpisTrend,
  activeKpiTrend,
  onKpiChange,
  className,
}: KpiTrendChartProps) {
  const chartData = useKpiChartOptions({ kpisTrend, activeKpiTrend });
  const t = useTranslations('Dashboard');

  if (!kpisTrend || !chartData) {
    return <ChartSkeleton className={className} />;
  }

  return (
    <div
      className={cn(
        'bg-card-bg rounded-[22px] border border-white/5 p-6',
        className
      )}
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {t('kpiEvolution')}
        </h2>
        <KpiSelector
          activeKpiTrend={activeKpiTrend}
          onKpiChange={onKpiChange}
        />
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
  );
}
