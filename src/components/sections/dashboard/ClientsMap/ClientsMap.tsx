'use client'

import { useEffect, useRef } from 'react'
import { Map as OLMap, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Icon } from 'ol/style'
import { defaults as defaultInteractions } from 'ol/interaction'
import 'ol/ol.css'

import { cn } from '@/lib/utils'
import type { ClientsMapProps } from './ClientsMap.types'
import { SearchableSelect } from '@/components/ui/SearchableSelect'
import { createMarkerIcon } from './utils'
import { LocationDetailsCard } from './components/LocationDetailsCard'
import { useMapLogic } from './hooks/useMapLogic'
import { useTranslations } from 'next-intl'

export function ClientsMap({ className, clients, filters, onFilterChange, availableFilters }: ClientsMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<OLMap | null>(null)
    const vectorSourceRef = useRef<VectorSource | null>(null)

    const t = useTranslations('Dashboard')

    const {
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
    } = useMapLogic({ t })

    useEffect(() => {
        if (!mapRef.current) return

        const vectorSource = new VectorSource()
        vectorSourceRef.current = vectorSource

        const map = new OLMap({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    })
                }),
                new VectorLayer({
                    source: vectorSource
                })
            ],
            view: new View({
                center: fromLonLat([-34.8813, -8.0539]),
                zoom: 12
            }),
            controls: [],
            interactions: defaultInteractions({
                mouseWheelZoom: true
            })
        })

        mapInstanceRef.current = map

        map.on('click', (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f)
            if (feature) {
                const locationId = feature.get('id')
                if (locationId) {
                    setSelectedLocationId(locationId)
                }
            }
        })

        map.on('pointermove', (evt) => {
            if (map.getView().getInteracting()) return
            const pixel = map.getEventPixel(evt.originalEvent)
            const hit = map.hasFeatureAtPixel(pixel)
            map.getTargetElement().style.cursor = hit ? 'pointer' : ''
        })

        return () => {
            map.setTarget(undefined)
        }
    }, [setSelectedLocationId])

    // Center map on first load of locations
    useEffect(() => {
        if (locations.length > 0 && mapInstanceRef.current && !activeLocation) {
            const first = locations[0]
            mapInstanceRef.current.getView().animate({
                center: fromLonLat([first.coordinates[0], first.coordinates[1]]),
                duration: 1000
            })
        }
    }, [locations, activeLocation])

    // Update Markers when filteredLocations or selectedLocationId changes
    useEffect(() => {
        if (!vectorSourceRef.current) return

        vectorSourceRef.current.clear()

        const features = filteredLocations.map(loc => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([loc.coordinates[0], loc.coordinates[1]])),
                name: loc.name,
                category: loc.category,
                id: loc.id
            })

            const isSelected = loc.id === selectedLocationId
            feature.setStyle(new Style({
                image: new Icon({
                    src: createMarkerIcon(loc.color, loc.icon),
                    scale: isSelected ? 1.2 : 1,
                    anchor: [0.5, 0.5]
                }),
                zIndex: isSelected ? 999 : 1
            }))

            return feature
        })

        vectorSourceRef.current.addFeatures(features)
    }, [filteredLocations, selectedLocationId])

    // Pan/Zoom to active location
    useEffect(() => {
        if (activeLocation && mapInstanceRef.current) {
            mapInstanceRef.current.getView().animate({
                center: fromLonLat([activeLocation.coordinates[0], activeLocation.coordinates[1]]),
                zoom: 15,
                duration: 1000
            })
        }
    }, [activeLocation])

    return (
        <div className={cn('bg-[rgba(255,255,255,0.05)] rounded-[32px] p-10 shadow-sm border border-white/5 relative', className)}>
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-white tracking-tight">{t('mapTitle')}</h2>
                    {isLoading && (
                        <span className="text-xs text-text-secondary italic">{t('loadingLocals')}</span>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                    <SearchableSelect
                        options={locationOptions}
                        value={selectedLocationId}
                        onChange={setSelectedLocationId}
                        className="w-full sm:w-[280px]"
                        placeholder={t('allLocals')}
                        searchPlaceholder={t('searchLocal')}
                    />
                    <SearchableSelect
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full sm:w-[220px]"
                        placeholder={t('allTypes')}
                        searchPlaceholder={t('searchType')}
                    />
                </div>
            </div>

            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-white/5 bg-[#0f1322]">
                <div
                    ref={mapRef}
                    className="w-full h-full [&_.ol-zoom]:top-4 [&_.ol-zoom]:right-4 [&_.ol-zoom]:left-auto [&_.ol-zoom]:bg-white/10 [&_.ol-zoom]:rounded-lg [&_.ol-zoom-in]:rounded-t-lg [&_.ol-zoom-out]:rounded-b-lg [&_.ol-zoom_button]:bg-transparent [&_.ol-zoom_button]:text-white [&_.ol-zoom_button]:text-xl [&_.ol-zoom_button]:w-8 [&_.ol-zoom_button]:h-8 [&_.ol-zoom_button:hover]:bg-white/20 transition-all brightness-110 contrast-[0.95]"
                ></div>

                {activeLocation && (
                    <LocationDetailsCard
                        location={activeLocation}
                        onClose={() => setSelectedLocationId('Todos')}
                    />
                )}
            </div>
        </div>
    )
}
