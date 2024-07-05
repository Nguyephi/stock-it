import { create } from 'zustand';
import { Session } from 'next-auth';

interface UserState {
    data: Session['user'] | null;
    setUser: (user: Session['user']) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    data: null,
    setUser: (user) => set({ data: user }),
    clearUser: () => set({ data: null }),
}));

export default useUserStore;
