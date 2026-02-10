'use client';

interface DateDividerProps {
  dateLabel: string;
}

export function DateDivider({ dateLabel }: DateDividerProps) {
  return (
    <div className="text-center">
      <span className="text-text-secondary text-[10px] font-medium tracking-wider uppercase">
        {dateLabel}
      </span>
    </div>
  );
}
