import { X } from 'lucide-react';
import type { ApiLocation } from '../ClientsMap.types';

interface LocationDetailsCardProps {
  location: ApiLocation;
  onClose: () => void;
}

export function LocationDetailsCard({
  location,
  onClose,
}: LocationDetailsCardProps) {
  return (
    <div className="animate-in slide-in-from-bottom-4 absolute bottom-6 left-6 z-10 w-[320px] rounded-2xl border border-white/10 bg-[#0B1125]/95 p-5 shadow-2xl backdrop-blur-md duration-300">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-lg leading-tight font-semibold text-white">
            {location.name}
          </h3>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium tracking-wider text-white/80 uppercase">
            {location.category}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white/40 transition-colors hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <p className="text-text-secondary mb-4 text-sm leading-relaxed">
        {location.description}
      </p>
      <p className="text-text-secondary mb-4 text-sm leading-relaxed">
        {location.address}
      </p>
    </div>
  );
}
