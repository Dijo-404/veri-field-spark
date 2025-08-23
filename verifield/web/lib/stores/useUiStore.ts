import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface UiState {
  toasts: Toast[];
  isLoading: boolean;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  toasts: [],
  isLoading: false,
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { id: new Date().toISOString(), ...toast }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));
