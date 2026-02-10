'use client'

import { CheckCheck, Bot } from 'lucide-react'
import { cn } from '@/lib'
import type { ChatMessageProps } from './ChatMessage.types'

export function ChatMessage({ message }: ChatMessageProps) {
    const isUserMessage = message.type === 'user_message'
    const isAISuggestion = message.type === 'ai_suggestion'

    return (
        <div
            className={cn(
                'flex flex-col max-w-[50%] animate-in fade-in slide-in-from-bottom-2 duration-300',
                isUserMessage ? 'self-start' : 'self-end'
            )}
        >
            <div
                className={cn(
                    'rounded-2xl px-5 py-3 relative border',
                    isUserMessage
                        ? 'bg-primary border-primary/20 text-blue-100 rounded-tl-none'
                        : 'bg-white/20 border-white/5 text-blue-100 rounded-tr-none'
                )}
            >
                {/* Header */}
                <div className="flex items-center gap-2 mb-1 opacity-60">
                    {isAISuggestion && <Bot className="w-3.5 h-3.5" />}
                    <span className="text-[11px] font-bold tracking-tight">
                        {isAISuggestion ? 'Sugestão da IA' : message.author}
                    </span>
                </div>


                {/* Content */}
                <p className="text-[13px] leading-relaxed font-medium mb-4">
                    {message.content}
                </p>

                {/* Footer (Time + Checks) */}
                <div className={cn(
                    "flex items-center gap-1.5 absolute bottom-2 right-4 text-[10px] font-medium transition-opacity text-blue-100",
                )}>
                    {message.timestamp}
                    {isUserMessage && (
                        <CheckCheck className="w-3.5 h-3.5 text-blue-100" strokeWidth={2.5} />
                    )}
                </div>
            </div>
        </div>
    )
}

