import { cn } from '@/lib/utils'

interface ChartSkeletonProps {
    className?: string
    titleWidth?: string
}

export function ChartSkeleton({ className, titleWidth = '1/3' }: ChartSkeletonProps) {
    return (
        <div className={cn('bg-card-bg rounded-[22px] p-6 border border-white/5', className)}>
            <div className={cn('h-4 bg-white/5 rounded mb-6 animate-pulse', `w-${titleWidth}`)}></div>
            <div className="h-64 bg-white/5 rounded animate-pulse"></div>
        </div>
    )
}
