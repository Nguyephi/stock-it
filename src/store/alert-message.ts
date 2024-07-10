import { create } from 'zustand';

interface AlertState {
    error: string | undefined;
    success: string | undefined;
    setError: (error: string | undefined) => void;
    setSuccess: (success: string | undefined) => void;
    clearMessages: () => void;
}

const useAlertStore = create<AlertState>((set) => ({
    error: undefined,
    success: undefined,
    setError: (error) => set({ error }),
    setSuccess: (success) => set({ success }),
    clearMessages: () => set({ error: undefined, success: undefined }),
}));

export default useAlertStore;
