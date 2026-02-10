'use client'

interface DateDividerProps {
    dateLabel: string
}

export function DateDivider({ dateLabel }: DateDividerProps) {
    return (
        <div className="text-center">
            <span className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">
                {dateLabel}
            </span>
        </div>
    )
}
