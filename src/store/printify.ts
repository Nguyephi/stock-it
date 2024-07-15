import { create } from 'zustand';

import { deletePrintifyData, getPrintifyData } from '@/actions/printify/access-token';

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
            // TODO: maybe separate prinitdy data into a different model (schema model: printify.storeData -> printifyData)
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

export const selectPrintifyData = (state: PrintifyState) => state.data;
export const selectPrintifyId = (state: PrintifyState) => state.data?.id;
export const selectPrintifyLoading = (state: PrintifyState) => state.loading;
export const selectPrintifyError = (state: PrintifyState) => state.error;

export default usePrintifyStore;
