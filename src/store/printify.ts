import { deletePrintifyData, getPrintifyData } from '@/actions/printify/access-token';
import { create } from 'zustand';

interface PrintifyState {
    data: any;
    loading: boolean;
    error: string | null;
    fetchDataStart: () => void;
    fetchDataSuccess: (data: any) => void;
    fetchDataFailure: (error: string) => void;
    fetchData: () => void;
    deleteData: () => void;
}

const initialState = {
    data: null,
    loading: true,
    error: null,
};

const usePrintifyStore = create<PrintifyState>((set) => ({
    ...initialState,
    fetchDataStart: () => set((state) => ({ ...state, loading: true, error: null })),
    fetchDataSuccess: (data) => set((state) => ({ ...state, loading: false, data })),
    fetchDataFailure: (error) => set((state) => ({ ...state, loading: false, error })),
    fetchData: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
            const data = await getPrintifyData();
            set((state) => ({ ...state, loading: false, data }));
        } catch (error) {
            set((state) => ({ ...state, loading: false, error: "Something went wrong!" }));
        }
    },
    deleteData: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
            const data = await deletePrintifyData();
            set((state) => ({ ...state, loading: false, data }));
        } catch (error) {
            set((state) => ({ ...state, loading: false, error: "Something went wrong!" }));
        }
    }
}));

export default usePrintifyStore;
