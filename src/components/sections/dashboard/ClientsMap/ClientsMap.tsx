'use client'

import { useEffect, useRef, useState } from 'react'
import { Map as OLMap, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import 'ol/ol.css'
import { cn } from '@/lib/utils'
import { geocodeCity } from '@/lib/geocoding'
import type { ClientsMapProps } from './ClientsMap.types'

interface CityCoordinates {
    lat: number
    lon: number
}

export function ClientsMap({ clients, filters, onFilterChange, availableFilters, className }: ClientsMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<OLMap | null>(null)
    const [cityCoordinates, setCityCoordinates] = useState<Map<string, CityCoordinates>>(new Map())
    const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(false)

    useEffect(() => {
        if (!mapRef.current) return

        const map = new OLMap({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([-47.8825, -15.7942]), // Brasília center
                zoom: 4
            })
        })

        mapInstanceRef.current = map

        return () => {
            map.setTarget(undefined)
        }
    }, [])

    useEffect(() => {
        const uniqueCities = Array.from(new Set(clients.map(c => c.location)))
        const citiesToGeocode = uniqueCities.filter(city => !cityCoordinates.has(city))

        if (citiesToGeocode.length === 0) return

        setIsLoadingCoordinates(true)

        const geocodeCities = async () => {
            const newCoordinates = new Map(cityCoordinates)

            for (const city of citiesToGeocode) {
                try {
                    const coords = await geocodeCity(city, 'BR')
                    if (coords) {
                        newCoordinates.set(city, coords)
                    }
                    if (citiesToGeocode.indexOf(city) < citiesToGeocode.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000))
                    }
                } catch (error) {
                    console.error(`Failed to geocode ${city}:`, error)
                }
            }

            setCityCoordinates(newCoordinates)
            setIsLoadingCoordinates(false)
        }

        geocodeCities()
    }, [clients])

    useEffect(() => {
        if (!mapInstanceRef.current) return

        const layers = mapInstanceRef.current.getLayers().getArray()
        const vectorLayer = layers.find(l => l instanceof VectorLayer)
        if (vectorLayer) {
            mapInstanceRef.current.removeLayer(vectorLayer)
        }

        const features = clients.map(client => {
            const coords = cityCoordinates.get(client.location)
            if (!coords) return null

            const feature = new Feature({
                geometry: new Point(fromLonLat([coords.lon, coords.lat])),
                name: client.name,
                location: client.location
            })

            feature.setStyle(new Style({
                image: new Circle({
                    radius: 8,
                    fill: new Fill({ color: '#3b82f6' }),
                    stroke: new Stroke({ color: '#fff', width: 2 })
                })
            }))

            return feature
        }).filter(Boolean) as Feature[]

        const vectorSource = new VectorSource({
            features
        })

        const newVectorLayer = new VectorLayer({
            source: vectorSource
        })

        mapInstanceRef.current.addLayer(newVectorLayer)
    }, [clients, cityCoordinates])

    return (
        <div className={cn('bg-white rounded-lg p-6 shadow-sm border border-gray-200', className)}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-gray-900">Mapa de clientes por região</h2>
                    {isLoadingCoordinates && (
                        <span className="text-xs text-gray-500 italic">Carregando coordenadas...</span>
                    )}
                </div>
                <div className="flex gap-3">
                    <select
                        value={filters.location}
                        onChange={(e) => onFilterChange('location', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {availableFilters.locations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                    <select
                        value={filters.secureType}
                        onChange={(e) => onFilterChange('secureType', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {availableFilters.secureTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div ref={mapRef} className="w-full h-96 rounded-lg overflow-hidden"></div>
        </div>
    )
}
