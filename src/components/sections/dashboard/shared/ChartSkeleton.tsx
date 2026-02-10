import { cn } from '@/lib/utils';

interface ChartSkeletonProps {
  className?: string;
  titleWidth?: string;
}

export function ChartSkeleton({
  className,
  titleWidth = '1/3',
}: ChartSkeletonProps) {
  return (
    <div
      className={cn(
        'bg-card-bg rounded-[22px] border border-white/5 p-6',
        className
      )}
    >
      <div
        className={cn(
          'mb-6 h-4 animate-pulse rounded bg-white/5',
          `w-${titleWidth}`
        )}
      ></div>
      <div className="h-64 animate-pulse rounded bg-white/5"></div>
    </div>
  );
}
