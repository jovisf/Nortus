'use client';

import Image from 'next/image';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-card-ticket flex min-h-[148px] flex-1 flex-col justify-between rounded-[22px] border border-white/5 p-6">
      <h3 className="text-sm font-medium tracking-tight text-white">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-[28px] leading-none font-bold tracking-tight text-white">
          {value}
        </span>
        <div className="relative h-9 w-9">
          <Image src={icon} alt={title} fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
