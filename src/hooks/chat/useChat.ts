import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { chatService } from '@/services'
import { useChatStore } from '@/store'
import type { QuickActionType } from '@/types'

export function useChat() {
    const {
        inputMessage,
        isTyping,
        selectedAction,
        isSidebarExpanded,
        setInputMessage,
        setIsTyping,
        setSelectedAction,
        toggleSidebar,
        clearInput,
        sendMessage: storeSendMessage
    } = useChatStore()

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['chat-data'],
        queryFn: () => chatService.getChat(),
    })

    const handleSendMessage = useCallback(() => {
        if (inputMessage.trim()) {
            storeSendMessage()
        }
    }, [inputMessage, storeSendMessage])

    const handleQuickAction = useCallback((action: QuickActionType) => {
        setSelectedAction(action)

        switch (action) {
            case 'send_proposal':
                console.log('Opening proposal modal...')
                break
            case 'make_call':
                console.log('Initiating call...')
                break
            case 'view_history':
                console.log('Opening history...')
                break
        }
    }, [setSelectedAction])

    const handleInputChange = useCallback((value: string) => {
        setInputMessage(value)
        setIsTyping(value.length > 0)
    }, [setInputMessage, setIsTyping])

    return {
        messages: data?.messages || [],
        iaSuggestion: data?.iaSuggestion || '',
        conversationAnalysis: data?.conversationAnalysis || null,

        inputMessage,
        isTyping,
        selectedAction,
        isSidebarExpanded,
        isLoading,
        error,

        actions: {
            handleSendMessage,
            handleQuickAction,
            handleInputChange,
            toggleSidebar,
            clearInput,
            refetch
        }
    }
}
