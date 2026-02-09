'use client'

import { useCallback, type KeyboardEvent } from 'react'
import type { ChatInputProps } from './ChatInput.types'

export function ChatInput({ value, isTyping, onChange, onSend }: ChatInputProps) {
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }, [onSend])

    return (
        <div className="p-4 border-t border-gray-700 bg-gray-900/50">
            <div className="flex items-center gap-3 bg-gray-800 rounded-full px-4 py-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escreva aqui..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm"
                />
                <button
                    onClick={onSend}
                    disabled={!value.trim()}
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="text-white text-lg transform rotate-45">➤</span>
                </button>
            </div>

            {isTyping && (
                <div className="mt-2 text-xs text-gray-400 pl-4">
                    Digitando...
                </div>
            )}
        </div>
    )
}
