'use client'

import type { AISuggestionCardProps } from './AISuggestionCard.types'

export function AISuggestionCard({ suggestion }: AISuggestionCardProps) {
    return (
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 border border-blue-500/30 mb-4">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-lg"></span>
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">
                        Sugestão da IA
                    </h4>
                    <p className="text-sm text-gray-200 leading-relaxed">
                        {suggestion}
                    </p>
                </div>
            </div>
        </div>
    )
}
