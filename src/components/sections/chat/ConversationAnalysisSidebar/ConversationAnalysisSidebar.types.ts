import type { ConversationAnalysis } from '@/types'

export interface ConversationAnalysisSidebarProps {
    analysis: ConversationAnalysis | null
    isExpanded: boolean
    onToggle: () => void
}
