'use client';

import { useChat, useHeader } from '@/hooks'
import {
    ChatInput,
    MessageList,
    DateDivider
} from '@/components/sections/chat'
import { useTranslations } from 'next-intl'

export default function ChatPage() {
    useHeader('Chat')
    const t = useTranslations('Chat')
    const tCommon = useTranslations('Common')

    const {
        messages,
        iaSuggestion,
        inputMessage,
        isTyping,
        selectedAction,
        isLoading,
        actions
    } = useChat()

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center h-full">
                <div className="text-gray-400">{tCommon('loading')}</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col flex-1 h-full min-h-0 page-container gap-8 overflow-hidden max-w-[1400px] mx-auto w-full">
            {/* Main Chat Area */}
            <div className="flex-1 bg-card-bg rounded-3xl border border-white/10 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-10 py-6 custom-scrollbar flex flex-col gap-8">

                    {/* In a real scenario, this would come from the messages grouping logic */}
                    <DateDivider dateLabel={t('today') + ", 16:40"} />

                    <MessageList
                        messages={messages}
                        selectedAction={selectedAction}
                        onQuickActionClick={actions.handleQuickAction}
                    />
                </div>
            </div>

            {/* Chat Input Footer */}
            <div className="flex justify-center shrink-0">
                <ChatInput
                    value={inputMessage}
                    suggestion={iaSuggestion}
                    isTyping={isTyping}
                    onChange={actions.handleInputChange}
                    onSend={actions.handleSendMessage}
                />
            </div>
        </div>
    )
}
