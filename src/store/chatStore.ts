import { create } from 'zustand';
import type { QuickActionType } from '@/types';

interface ChatState {
  inputMessage: string;
  isTyping: boolean;
  selectedAction: QuickActionType;
  isSidebarExpanded: boolean;
}

interface ChatActions {
  setInputMessage: (message: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  setSelectedAction: (action: QuickActionType) => void;
  toggleSidebar: () => void;
  clearInput: () => void;
  sendMessage: () => void;
}

type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>((set, get) => ({
  inputMessage: '',
  isTyping: false,
  selectedAction: null,
  isSidebarExpanded: true,

  setInputMessage: (inputMessage) => set({ inputMessage }),

  setIsTyping: (isTyping) => set({ isTyping }),

  setSelectedAction: (selectedAction) => set({ selectedAction }),

  toggleSidebar: () =>
    set((state) => ({
      isSidebarExpanded: !state.isSidebarExpanded,
    })),

  clearInput: () => set({ inputMessage: '' }),

  sendMessage: () => {
    const { inputMessage } = get();
    if (inputMessage.trim()) {
      set({ inputMessage: '', isTyping: false });
    }
  },
}));
