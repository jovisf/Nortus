'use client'

import { Send, Bot } from 'lucide-react'
import { useCallback, type KeyboardEvent, useRef, useEffect, useState } from 'react'
import type { ChatInputProps } from './ChatInput.types'
import { useTranslations } from 'next-intl'

/**
 * Overlay component that shows IA suggestions when the input is empty and focused.
 */
function ChatSuggestionOverlay({ suggestion, ghostRef }: { suggestion: string; ghostRef: React.RefObject<HTMLDivElement | null> }) {
    const t = useTranslations('Chat')

    return (
        <div className="absolute left-6 right-16 top-4 pointer-events-none select-none z-0 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2 mb-1 opacity-70">
                <Bot className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('iaSuggestion')}</span>
            </div>

            <div
                ref={ghostRef}
                className="text-sm font-medium text-white/30 leading-relaxed break-words"
            >
                {suggestion}
            </div>

            <div className="mt-2 flex items-center gap-1.5 opacity-60 transition-opacity">
                <span className="px-1.5 py-0.5 rounded border border-white/20 text-[9px] font-bold bg-white/5">TAB</span>
                <span className="text-[10px] font-medium">{t('tabToFill')}</span>
            </div>
        </div>
    )
}

export function ChatInput({ value, isTyping, suggestion, onChange, onSend }: ChatInputProps) {
    const t = useTranslations('Chat')
    const [isFocused, setIsFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const ghostRef = useRef<HTMLDivElement>(null)

    const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current
        const ghost = ghostRef.current

        if (textarea) {
            textarea.style.height = 'auto'
            const showSuggestion = !value && suggestion && isFocused
            const contentHeight = showSuggestion ? (ghost?.scrollHeight || 0) : textarea.scrollHeight
            const finalHeight = Math.max(24, contentHeight)
            textarea.style.height = `${finalHeight}px`
        }
    }, [value, isFocused, suggestion])

    useEffect(() => {
        adjustHeight()
    }, [value, suggestion, isFocused, adjustHeight])

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab' && suggestion && !value) {
            e.preventDefault()
            onChange(suggestion)
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }, [onSend, suggestion, value, onChange])

    const showSuggestion = !value && suggestion && isFocused

    return (
        <div className="w-full max-w-[800px] relative group">
            <div className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-[28px] p-5 transition-all focus-within:border-primary/50 relative min-h-[60px]">
                {showSuggestion && (
                    <ChatSuggestionOverlay suggestion={suggestion} ghostRef={ghostRef} />
                )}

                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={!suggestion || !isFocused ? t('placeholder') : ""}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 text-sm font-medium z-10 resize-none py-1 leading-relaxed max-h-[200px] custom-scrollbar"
                />

                <button
                    onClick={onSend}
                    disabled={!value.trim()}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-hover transition-all disabled:opacity-30 disabled:grayscale active:scale-90 z-10 mb-0.5 shrink-0"
                >
                    <Send className="w-4 h-4 text-white" />
                </button>
            </div>

            {isTyping && (
                <div className="absolute -top-6 left-6 animate-pulse">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                        {t('typing')}
                    </span>
                </div>
            )}
        </div>
    )
}
