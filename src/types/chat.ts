export type MessageType =
  | 'user_message'
  | 'assistant_message'
  | 'ai_suggestion';

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: MessageType;
}

export type InsightType =
  | 'interaction'
  | 'emotionAnalysis'
  | 'clusterIdentification';
export type ActionPriority = 'high' | 'medium' | 'low';

export interface Insight {
  id: string;
  type: InsightType;
  category: string;
}

export interface FutureAction {
  id: string;
  action: string;
  priority: ActionPriority;
}

export interface InsightsData {
  title: string;
  insights: Insight[];
}

export interface FutureStepsData {
  title: string;
  actions: FutureAction[];
}

export interface ConversationAnalysis {
  insights: InsightsData;
  futureSteps: FutureStepsData;
}

export interface ChatData {
  messages: ChatMessage[];
  iaSuggestion: string;
  conversationAnalysis: ConversationAnalysis;
}

export type QuickActionType =
  | 'send_proposal'
  | 'make_call'
  | 'view_history'
  | null;
