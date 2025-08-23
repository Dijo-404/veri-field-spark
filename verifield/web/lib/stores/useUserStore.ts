import { create } from 'zustand';

interface UserState {
  address: string | null;
  credits: number;
  profileStats: {
    uploads: number;
    purchases: number;
  };
  setAddress: (address: string | null) => void;
  setCredits: (credits: number) => void;
  setProfileStats: (stats: { uploads: number; purchases: number }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  address: null,
  credits: 0,
  profileStats: {
    uploads: 0,
    purchases: 0,
  },
  setAddress: (address) => set({ address }),
  setCredits: (credits) => set({ credits }),
  setProfileStats: (stats) => set({ profileStats: stats }),
}));
