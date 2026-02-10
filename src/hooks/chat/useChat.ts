import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { chatService } from '@/services';
import { useChatStore } from '@/store';
import type { QuickActionType } from '@/types';
import { useTranslations } from 'next-intl';

export function useChat() {
  const t = useTranslations('Toasts.chat');
  const {
    inputMessage,
    isTyping,
    selectedAction,
    isSidebarExpanded,
    setInputMessage,
    setIsTyping,
    setSelectedAction,
    toggleSidebar,
    clearInput,
  } = useChatStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['chat-data'],
    queryFn: () => chatService.getChat(),
  });

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim()) {
      toast.success(t('maintenanceTitle'), {
        description: t('maintenanceDescription'),
      });
      // TODO: Reativar envio quando a API de chat estiver disponível
      // storeSendMessage()
    }
  }, [inputMessage, t]);

  const handleQuickAction = useCallback(
    (action: QuickActionType) => {
      setSelectedAction(action);

      toast.success(t('unavailableActionTitle'), {
        description: t('unavailableActionDescription'),
      });

      switch (action) {
        case 'send_proposal':
          break;
        case 'make_call':
          break;
        case 'view_history':
          break;
      }
    },
    [setSelectedAction, t]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInputMessage(value);
      setIsTyping(value.length > 0);
    },
    [setInputMessage, setIsTyping]
  );

  return {
    messages: data?.messages || [],
    iaSuggestion: data?.iaSuggestion || '',
    conversationAnalysis: data?.conversationAnalysis || null,

    inputMessage,
    isTyping,
    selectedAction,
    isSidebarExpanded,
    isLoading,
    error,

    actions: {
      handleSendMessage,
      handleQuickAction,
      handleInputChange,
      toggleSidebar,
      clearInput,
      refetch,
    },
  };
}
