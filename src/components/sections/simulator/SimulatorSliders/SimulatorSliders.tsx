'use client'

import { cn } from '@/lib'
import type { BaseComponentProps } from '@/types'
import { SliderField } from './SliderField'

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
            <SliderField
                label="Valor do veículo"
                value={vehicleValue}
                min={10000}
                max={500000}
                step={1000}
                onChange={onVehicleValueChange}
                isCurrency
            />

            <SliderField
                label="Idade do Cliente"
                value={clientAge}
                min={18}
                max={90}
                onChange={onClientAgeChange}
                suffix=" anos"
            />
        </div>
    )
}
