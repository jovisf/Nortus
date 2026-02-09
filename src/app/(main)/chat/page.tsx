'use client'

import { useChat } from '@/hooks'
import {
    ChatMessage,
    AISuggestionCard,
    QuickActions,
    ConversationAnalysisSidebar,
    ChatInput
} from '@/components/sections/chat'

export default function ChatPage() {
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
            <main className="flex h-full bg-gray-900">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-gray-400">Carregando chat...</div>
                </div>
            </main>
        )
    }

    return (
        <main className="flex h-full bg-gray-900">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <header className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-white">
                            Chat - Assistente Virtual
                        </h1>
                        <span className="text-sm text-gray-400">
                            HOJE, {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col">
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
        </main>
    )
}
