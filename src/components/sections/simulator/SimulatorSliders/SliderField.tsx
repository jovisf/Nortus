'use client'

import { formatCurrency } from '@/lib'

interface SliderFieldProps {
    label: string
    value: number
    min: number
    max: number
    step?: number
    onChange: (value: number) => void
    isCurrency?: boolean
    suffix?: string
}

export function SliderField({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    isCurrency = false,
    suffix = ''
}: SliderFieldProps) {
    const displayValue = isCurrency ? formatCurrency(value) : `${value}${suffix}`
    const minDisplay = isCurrency ? formatCurrency(min) : `${min}${suffix}`
    const maxDisplay = isCurrency ? formatCurrency(max) : `${max}${suffix}`

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-white">
                <span className="font-semibold">{label}: {displayValue}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1 bg-white rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-white opacity-40">
                <span>{minDisplay}</span>
                <span>{maxDisplay}</span>
            </div>
        </div>
    )
}
