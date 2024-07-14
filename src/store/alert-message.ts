import { create } from 'zustand';

interface AlertState {
    error: string | undefined;
    success: string | undefined;
    provider: string | undefined;
    setError: (error: string | undefined) => void;
    setSuccess: (success: string | undefined) => void;
    setProvider: (provider: string) => void;
    clearMessages: () => void;
}

const useAlertStore = create<AlertState>((set) => ({
    error: undefined,
    success: undefined,
    provider: undefined,
    setError: (error) => set({ error }),
    setSuccess: (success) => set({ success }),
    setProvider: (provider) => set({ provider }),
    clearMessages: () => set({ error: undefined, success: undefined, provider: undefined }),
}));

export default useAlertStore;
