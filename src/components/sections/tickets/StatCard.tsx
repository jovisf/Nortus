'use client';

import Image from 'next/image';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <div className="bg-card-ticket border border-white/5 rounded-[22px] p-6 flex flex-col justify-between min-h-[148px] flex-1">
            <h3 className="text-white text-sm font-medium tracking-tight">{title}</h3>
            <div className="flex items-end justify-between">
                <span className="text-[28px] font-bold text-white leading-none tracking-tight">{value}</span>
                <div className="relative w-9 h-9">
                    <Image
                        src={icon}
                        alt={title}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
