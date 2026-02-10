import { Skeleton } from '@/components/ui';

interface PageSkeletonProps {
  type?: 'dashboard' | 'tickets' | 'chat' | 'simulator';
}

export function PageSkeleton({ type = 'dashboard' }: PageSkeletonProps) {
  if (type === 'tickets') {
    return (
      <div className="page-container space-y-8">
        {/* Stats Row */}
        <div className="flex flex-row gap-5 overflow-x-auto pb-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="h-32 min-w-[240px] flex-1 rounded-3xl"
              />
            ))}
        </div>
        {/* Table Area */}
        <Skeleton className="h-[600px] w-full rounded-[22px]" />
      </div>
    );
  }

  if (type === 'chat') {
    return (
      <div className="page-container flex h-[calc(100vh-var(--header-height)-40px)] flex-col gap-8">
        <Skeleton className="w-full flex-1 rounded-3xl" />
        <div className="flex justify-center">
          <Skeleton className="h-16 w-full max-w-[800px] rounded-full" />
        </div>
      </div>
    );
  }

  if (type === 'simulator') {
    return (
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Skeleton className="h-[600px] w-full rounded-3xl" />
          </div>
          <div className="space-y-8 lg:col-span-1">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Default: Dashboard
  return (
    <div className="page-container space-y-6">
      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] w-full rounded-[22px]" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-[400px] w-full rounded-[22px]" />
        </div>
      </div>

      {/* Map Area */}
      <Skeleton className="h-[400px] w-full rounded-[22px]" />

      {/* Table Area */}
      <Skeleton className="h-[400px] w-full rounded-[22px]" />
    </div>
  );
}
