
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as Icons from 'lucide-react'

const ICON_COMPONENTS: Record<string, React.ComponentType<any>> = {
    'map-pin': Icons.MapPin,
    'hospital': Icons.Hospital,
    'plane': Icons.Plane,
    'graduation-cap': Icons.GraduationCap,
    'landmark': Icons.Landmark,
    'dumbbell': Icons.Dumbbell,
    'tree': Icons.Trees,
    'utensils': Icons.Utensils,
    'store': Icons.Store,
    'film': Icons.Film,
}



const iconCache: Record<string, string> = {}

export const createMarkerIcon = (color: string, iconName: string) => {
    const cacheKey = `${color}-${iconName}`
    if (iconCache[cacheKey]) return iconCache[cacheKey]

    const IconComponent = ICON_COMPONENTS[iconName] || Icons.MapPin
    const iconContent = renderToStaticMarkup(
        <IconComponent color="white" size={18} strokeWidth={2.5} />
    )

    const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="14" fill="${color}" stroke="white" stroke-width="2"/>
        <g transform="translate(11, 11)">
            ${iconContent}
        </g>
    </svg>
    `;
    const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    iconCache[cacheKey] = dataUri
    return dataUri
}
