'use client'

import { cn } from '@/lib'
import type { ChatMessageProps } from './ChatMessage.types'

export function ChatMessage({ message }: ChatMessageProps) {
    const isUserMessage = message.type === 'user_message'
    const isAISuggestion = message.type === 'ai_suggestion'
    const isAssistantMessage = message.type === 'assistant_message'

    return (
        <div
            className={cn(
                'flex flex-col max-w-[80%] mb-4',
                isUserMessage && 'self-start',
                (isAssistantMessage || isAISuggestion) && 'self-end'
            )}
        >
            <span
                className={cn(
                    'text-sm text-gray-400 mb-1',
                    isUserMessage && 'text-left',
                    (isAssistantMessage || isAISuggestion) && 'text-right'
                )}
            >
                {isAISuggestion && ' '}
                {message.author}
            </span>

            <div
                className={cn(
                    'rounded-lg px-4 py-3 relative',
                    isUserMessage && 'bg-blue-600 text-white rounded-tl-none',
                    isAssistantMessage && 'bg-gray-700 text-white rounded-tr-none',
                    isAISuggestion && 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none border border-purple-400/30'
                )}
            >
                <p className="text-sm leading-relaxed">{message.content}</p>
            </div>

            <span
                className={cn(
                    'text-xs text-gray-500 mt-1',
                    isUserMessage && 'text-left',
                    (isAssistantMessage || isAISuggestion) && 'text-right flex items-center justify-end gap-1'
                )}
            >
                {message.timestamp}
                {isUserMessage && (
                    <span className="ml-1 text-blue-400"></span>
                )}
            </span>
        </div>
    )
}
