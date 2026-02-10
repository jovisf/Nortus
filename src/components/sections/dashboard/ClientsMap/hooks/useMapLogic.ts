import { useState, useMemo } from 'react'
import { useLocations } from '@/hooks'
import type { ApiLocation } from '../ClientsMap.types'

export function useMapLogic() {
    const { data, isLoading } = useLocations()
    const [selectedCategory, setSelectedCategory] = useState('Todos')
    const [selectedLocationId, setSelectedLocationId] = useState('Todos')

    const locations = useMemo<ApiLocation[]>(() => data?.data.locations || [], [data])

    const activeLocation = useMemo<ApiLocation | null>(() => {
        if (selectedLocationId === 'Todos') return null
        return locations.find(l => l.id === selectedLocationId) || null
    }, [locations, selectedLocationId])

    const categoryOptions = useMemo(() => {
        const categories = Array.from(new Set(locations.map(l => l.category)))
        return [
            { label: 'Todos os tipos', value: 'Todos' },
            ...categories.map(cat => ({
                label: cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase(),
                value: cat
            }))
        ]
    }, [locations])

    const locationOptions = useMemo(() => {
        const relevantLocations = selectedCategory === 'Todos'
            ? locations
            : locations.filter(l => l.category === selectedCategory)

        return [
            { label: 'Todos os locais', value: 'Todos' },
            ...relevantLocations.map(loc => ({
                label: loc.name,
                value: loc.id
            }))
        ]
    }, [locations, selectedCategory])

    const filteredLocations = useMemo(() => {
        if (selectedCategory === 'Todos') return locations
        return locations.filter(loc => loc.category === selectedCategory)
    }, [locations, selectedCategory])

    const handleCategoryChange = (val: string) => {
        setSelectedCategory(val)
        setSelectedLocationId('Todos')
    }

    return {
        locations,
        isLoading,
        selectedCategory,
        selectedLocationId,
        setSelectedLocationId,
        handleCategoryChange,
        activeLocation,
        categoryOptions,
        locationOptions,
        filteredLocations
    }
}
