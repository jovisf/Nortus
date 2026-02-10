'use client';

import { ChatMessage } from '../ChatMessage';
import { QuickActions } from '../QuickActions';
import type { ChatMessage as ChatMessageType, QuickActionType } from '@/types';

interface MessageListProps {
  messages: ChatMessageType[];
  selectedAction: QuickActionType;
  onQuickActionClick: (action: QuickActionType) => void;
}

export function MessageList({
  messages,
  selectedAction,
  onQuickActionClick,
}: MessageListProps) {
  const lastMessage = messages[messages.length - 1];
  const hasAISuggestion = lastMessage?.type === 'ai_suggestion';

  return (
    <div className="flex flex-col gap-6">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {hasAISuggestion && (
        <div className="-mt-2 max-w-[50%] self-end">
          <QuickActions
            selectedAction={selectedAction}
            onActionClick={onQuickActionClick}
          />
        </div>
      )}
    </div>
  );
}
