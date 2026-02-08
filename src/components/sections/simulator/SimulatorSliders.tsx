'use client'

import { cn, formatCurrency } from '@/lib'
import type { BaseComponentProps } from '@/types'

interface SimulatorSlidersProps extends BaseComponentProps {
    vehicleValue: number
    clientAge: number
    onVehicleValueChange: (value: number) => void
    onClientAgeChange: (value: number) => void
}

export function SimulatorSliders({
    vehicleValue,
    clientAge,
    onVehicleValueChange,
    onClientAgeChange,
    className
}: SimulatorSlidersProps) {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-white">
                    <span className="font-semibold">Valor do veículo: {formatCurrency(vehicleValue)}</span>
                </div>
                <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="1000"
                    value={vehicleValue}
                    onChange={(e) => onVehicleValueChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>R$ 10.000</span>
                    <span>R$ 500.000</span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-white">
                    <span className="font-semibold">Idade do Cliente: {clientAge} anos</span>
                </div>
                <input
                    type="range"
                    min="18"
                    max="90"
                    value={clientAge}
                    onChange={(e) => onClientAgeChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>18 anos</span>
                    <span>90 anos</span>
                </div>
            </div>
        </div>
    )
}
