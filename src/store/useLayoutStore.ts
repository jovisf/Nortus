import { create } from 'zustand';
import { ReactNode } from 'react';

interface LayoutState {
  headerTitle: string;
  headerActions: ReactNode | null;
  setHeaderTitle: (title: string) => void;
  setHeaderActions: (actions: ReactNode | null) => void;
  resetHeader: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  headerTitle: 'Nortus',
  headerActions: null,
  setHeaderTitle: (title) =>
    set((state) =>
      state.headerTitle === title ? state : { headerTitle: title }
    ),
  setHeaderActions: (actions) =>
    set((state) =>
      state.headerActions === actions ? state : { headerActions: actions }
    ),
  resetHeader: () =>
    set((state) =>
      state.headerTitle === 'Nortus' && state.headerActions === null
        ? state
        : { headerTitle: 'Nortus', headerActions: null }
    ),
}));
