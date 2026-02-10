import type { BaseComponentProps } from '@/types';

export interface PlanCardProps extends BaseComponentProps {
  name: string;
  price: number;
  isSelected?: boolean;
  isRecommended?: boolean;
  onSelect: () => void;
}
