'use client'

import { cn } from '@/lib'
import type { ConversationAnalysisSidebarProps } from './ConversationAnalysisSidebar.types'
import type { ActionPriority } from '@/types'

const PRIORITY_STYLES: Record<ActionPriority, string> = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30',
}

const PRIORITY_LABELS: Record<ActionPriority, string> = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
}

export function ConversationAnalysisSidebar({
    analysis,
    isExpanded,
    onToggle
}: ConversationAnalysisSidebarProps) {
    if (!analysis) return null

    return (
        <aside
            className={cn(
                'bg-gray-800/50 border-l border-gray-700 transition-all duration-300 overflow-hidden',
                isExpanded ? 'w-80' : 'w-12'
            )}
        >
            <button
                onClick={onToggle}
                className="w-full p-3 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
                title={isExpanded ? 'Recolher' : 'Expandir'}
            >
                <span className="text-gray-400">
                    {isExpanded ? '→' : '←'}
                </span>
            </button>

            {isExpanded && (
                <div className="p-4 space-y-6">
                    <section>
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <span></span>
                            {analysis.insights.title}
                        </h3>
                        <div className="space-y-2">
                            {analysis.insights.insights.map((insight) => (
                                <div
                                    key={insight.id}
                                    className="bg-gray-700/50 rounded-lg p-3 border border-gray-600/50"
                                >
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                                        {insight.type === 'interaction' && 'Tipo de interação'}
                                        {insight.type === 'emotionAnalysis' && 'Análise emocional'}
                                        {insight.type === 'clusterIdentification' && 'Identificação de cluster'}
                                    </span>
                                    <p className="text-sm text-white mt-1">{insight.category}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <span></span>
                            {analysis.futureSteps.title}
                        </h3>
                        <div className="space-y-2">
                            {analysis.futureSteps.actions.map((action) => (
                                <div
                                    key={action.id}
                                    className={cn(
                                        'rounded-lg p-3 border',
                                        PRIORITY_STYLES[action.priority]
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs uppercase tracking-wider">
                                            Prioridade: {PRIORITY_LABELS[action.priority]}
                                        </span>
                                    </div>
                                    <p className="text-sm">{action.action}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </aside>
    )
}
