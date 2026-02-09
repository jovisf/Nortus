'use client';

import { useChat, useHeader } from '@/hooks'
import {
    ChatMessage,
    AISuggestionCard,
    QuickActions,
    ConversationAnalysisSidebar,
    ChatInput
} from '@/components/sections/chat'

export default function ChatPage() {
    useHeader('Chat & Assistente Virtual')

    const {
        messages,
        iaSuggestion,
        conversationAnalysis,
        inputMessage,
        isTyping,
        selectedAction,
        isSidebarExpanded,
        isLoading,
        actions
    } = useChat()

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center h-full">
                <div className="text-gray-400">Carregando chat...</div>
            </div>
        )
    }

    return (
        <div className="flex flex-1 min-h-0 h-full">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}
                </div>

                {iaSuggestion && (
                    <div className="px-4">
                        <AISuggestionCard suggestion={iaSuggestion} />
                    </div>
                )}

                <QuickActions
                    selectedAction={selectedAction}
                    onActionClick={actions.handleQuickAction}
                />

                <ChatInput
                    value={inputMessage}
                    isTyping={isTyping}
                    onChange={actions.handleInputChange}
                    onSend={actions.handleSendMessage}
                />
            </div>

            <ConversationAnalysisSidebar
                analysis={conversationAnalysis}
                isExpanded={isSidebarExpanded}
                onToggle={actions.toggleSidebar}
            />
        </div>
    )
}
