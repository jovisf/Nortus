import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
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
            toast.success('Sistema em Manutenção', {
                description: 'A API do chat não está disponível no momento. Tente novamente mais tarde.'
            })
            // TODO: Reativar envio quando a API de chat estiver disponível
            // storeSendMessage()
        }
    }, [inputMessage])

    const handleQuickAction = useCallback((action: QuickActionType) => {
        setSelectedAction(action)

        toast.success('Ação Indisponível', {
            description: 'Esta funcionalidade depende da API do chat, que está temporariamente offline.'
        })

        switch (action) {
            case 'send_proposal':
                break
            case 'make_call':
                break
            case 'view_history':
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
