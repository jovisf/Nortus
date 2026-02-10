import type { QuickActionType } from '@/types';

export interface QuickActionsProps {
  selectedAction: QuickActionType;
  onActionClick: (action: QuickActionType) => void;
}
