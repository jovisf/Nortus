'use client';

import { CheckCheck, Bot } from 'lucide-react';
import { cn } from '@/lib';
import type { ChatMessageProps } from './ChatMessage.types';

export function ChatMessage({ message }: ChatMessageProps) {
  const isUserMessage = message.type === 'user_message';
  const isAISuggestion = message.type === 'ai_suggestion';

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-bottom-2 flex max-w-[50%] flex-col duration-300',
        isUserMessage ? 'self-start' : 'self-end'
      )}
    >
      <div
        className={cn(
          'relative rounded-2xl border px-5 py-3',
          isUserMessage
            ? 'bg-primary border-primary/20 rounded-tl-none text-blue-100'
            : 'rounded-tr-none border-white/5 bg-white/20 text-blue-100'
        )}
      >
        {/* Header */}
        <div className="mb-1 flex items-center gap-2 opacity-60">
          {isAISuggestion && <Bot className="h-3.5 w-3.5" />}
          <span className="text-[11px] font-bold tracking-tight">
            {isAISuggestion ? 'Sugestão da IA' : message.author}
          </span>
        </div>

        {/* Content */}
        <p className="mb-4 text-[13px] leading-relaxed font-medium">
          {message.content}
        </p>

        {/* Footer (Time + Checks) */}
        <div
          className={cn(
            'absolute right-4 bottom-2 flex items-center gap-1.5 text-[10px] font-medium text-blue-100 transition-opacity'
          )}
        >
          {message.timestamp}
          {isUserMessage && (
            <CheckCheck
              className="h-3.5 w-3.5 text-blue-100"
              strokeWidth={2.5}
            />
          )}
        </div>
      </div>
    </div>
  );
}
