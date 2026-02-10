'use client';

import { useChat, useHeader } from '@/hooks';
import {
  ChatInput,
  MessageList,
  DateDivider,
} from '@/components/sections/chat';
import { useTranslations } from 'next-intl';
import { PageSkeleton } from '@/components/shared';

export default function ChatPage() {
  useHeader('Chat');
  const t = useTranslations('Chat');

  const {
    messages,
    iaSuggestion,
    inputMessage,
    isTyping,
    selectedAction,
    isLoading,
    actions,
  } = useChat();

  if (isLoading) {
    return <PageSkeleton type="chat" />;
  }

  return (
    <div className="page-container mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-1 flex-col gap-8 overflow-hidden">
      {/* Main Chat Area */}
      <div className="bg-card-bg flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10">
        <div className="custom-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto px-10 py-6">
          {/* In a real scenario, this would come from the messages grouping logic */}
          <DateDivider dateLabel={t('today') + ', 16:40'} />

          <MessageList
            messages={messages}
            selectedAction={selectedAction}
            onQuickActionClick={actions.handleQuickAction}
          />
        </div>
      </div>

      {/* Chat Input Footer */}
      <div className="flex shrink-0 justify-center">
        <ChatInput
          value={inputMessage}
          suggestion={iaSuggestion}
          isTyping={isTyping}
          onChange={actions.handleInputChange}
          onSend={actions.handleSendMessage}
        />
      </div>
    </div>
  );
}
