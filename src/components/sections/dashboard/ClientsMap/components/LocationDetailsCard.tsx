import { X } from 'lucide-react'
import type { ApiLocation } from '../ClientsMap.types'

interface LocationDetailsCardProps {
    location: ApiLocation
    onClose: () => void
}

export function LocationDetailsCard({ location, onClose }: LocationDetailsCardProps) {
    return (
        <div className="absolute bottom-6 left-6 z-10 w-[320px] bg-[#0B1125]/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-white font-semibold text-lg leading-tight mb-1">{location.name}</h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80 uppercase tracking-wider">
                        {location.category}
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/40 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                {location.description}
            </p>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                {location.address}
            </p>
        </div>
    )
}
