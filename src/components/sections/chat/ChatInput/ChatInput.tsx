'use client';

import { Send, Bot } from 'lucide-react';
import {
  useCallback,
  type KeyboardEvent,
  useRef,
  useEffect,
  useState,
} from 'react';
import type { ChatInputProps } from './ChatInput.types';
import { useTranslations } from 'next-intl';

/**
 * Overlay component that shows IA suggestions when the input is empty and focused.
 */
function ChatSuggestionOverlay({
  suggestion,
  ghostRef,
}: {
  suggestion: string;
  ghostRef: React.RefObject<HTMLDivElement | null>;
}) {
  const t = useTranslations('Chat');

  return (
    <div className="animate-in fade-in slide-in-from-top-1 pointer-events-none absolute top-4 right-16 left-6 z-0 duration-200 select-none">
      <div className="mb-1 flex items-center gap-2 opacity-70">
        <Bot className="h-3.5 w-3.5" />
        <span className="text-[10px] font-bold tracking-wider uppercase">
          {t('iaSuggestion')}
        </span>
      </div>

      <div
        ref={ghostRef}
        className="text-sm leading-relaxed font-medium break-words text-white/30"
      >
        {suggestion}
      </div>

      <div className="mt-2 flex items-center gap-1.5 opacity-60 transition-opacity">
        <span className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 text-[9px] font-bold">
          TAB
        </span>
        <span className="text-[10px] font-medium">{t('tabToFill')}</span>
      </div>
    </div>
  );
}

export function ChatInput({
  value,
  isTyping,
  suggestion,
  onChange,
  onSend,
}: ChatInputProps) {
  const t = useTranslations('Chat');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    const ghost = ghostRef.current;

    if (textarea) {
      textarea.style.height = 'auto';
      const showSuggestion = !value && suggestion && isFocused;
      const contentHeight = showSuggestion
        ? ghost?.scrollHeight || 0
        : textarea.scrollHeight;
      const finalHeight = Math.max(24, contentHeight);
      textarea.style.height = `${finalHeight}px`;
    }
  }, [value, isFocused, suggestion]);

  useEffect(() => {
    adjustHeight();
  }, [value, suggestion, isFocused, adjustHeight]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Tab' && suggestion && !value) {
        e.preventDefault();
        onChange(suggestion);
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend, suggestion, value, onChange]
  );

  const showSuggestion = !value && suggestion && isFocused;

  return (
    <div className="group relative w-full max-w-[800px]">
      <div className="focus-within:border-primary/50 relative flex min-h-[60px] items-end gap-3 rounded-[28px] border border-white/10 bg-white/5 p-5 transition-all">
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
          placeholder={!suggestion || !isFocused ? t('placeholder') : ''}
          className="custom-scrollbar z-10 max-h-[200px] flex-1 resize-none border-none bg-transparent py-1 text-sm leading-relaxed font-medium text-white placeholder-white/20 outline-none"
        />

        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="bg-primary hover:bg-primary-hover z-10 mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all active:scale-90 disabled:opacity-30 disabled:grayscale"
        >
          <Send className="h-4 w-4 text-white" />
        </button>
      </div>

      {isTyping && (
        <div className="absolute -top-6 left-6 animate-pulse">
          <span className="text-primary text-[10px] font-bold tracking-widest uppercase">
            {t('typing')}
          </span>
        </div>
      )}
    </div>
  );
}
