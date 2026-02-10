'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ConversionChartProps } from './ConversionChart.types';
import { useConversionChartOptions } from './hooks/useConversionChartOptions';
import { ChartSkeleton } from '../shared/ChartSkeleton';
import { useTranslations } from 'next-intl';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function ConversionChart({
  conversionData,
  labels,
  className,
}: ConversionChartProps) {
  const [page, setPage] = useState(0);
  const t = useTranslations('Dashboard');

  const currentLabels = labels.slice(page * 6, (page + 1) * 6);
  const currentSeriesData =
    conversionData?.data.slice(page * 6, (page + 1) * 6) || [];

  const chartOptions = useConversionChartOptions({
    conversionData: { data: currentSeriesData },
    labels: currentLabels,
  });

  if (!conversionData || !chartOptions) {
    return <ChartSkeleton className={className} />;
  }

  return (
    <div
      className={cn(
        'bg-card-bg rounded-[22px] border border-white/5 p-6',
        className
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {t('conversionRate')}
        </h2>
        <button
          onClick={() => setPage(page === 0 ? 1 : 0)}
          className="group cursor-pointer rounded-lg p-1 transition-all duration-200 hover:bg-white/10"
        >
          <ChevronRight
            className={cn(
              'h-6 w-6 text-white transition-transform duration-300',
              page === 1 ? 'rotate-180' : 'rotate-0'
            )}
          />
        </button>
      </div>
      <div className="h-[350px] w-full">
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
}
