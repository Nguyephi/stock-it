import { create } from 'zustand';

import { 
    deletePrintifyData, 
    getPrintifyToken,
    getPrintifyProducts,
    fetchPrintifyProducts 
} from '@/actions/printify/access-token';

interface PrintifyState {
    token: string | undefined;
    data: any;
    loading: boolean;
    error: string | null;
    fetchDataStart: () => void;
    fetchDataSuccess: (data: any) => void;
    fetchDataFailure: (error: string) => void;
    fetchToken: () => void;
    fetchData: () => void;
    deleteData: () => void;
}

const initialState = {
    token: undefined,
    data: null,
    loading: true,
    error: null,
};

const usePrintifyStore = create<PrintifyState>((set) => ({
    ...initialState,
    fetchDataStart: () => set((state) => ({ ...state, loading: true, error: null })),
    fetchDataSuccess: (data) => set((state) => ({ ...state, loading: false, data })),
    fetchDataFailure: (error) => set((state) => ({ ...state, loading: false, error })),
    fetchToken: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
            // TODO: maybe separate prinitdy data into a different model (schema model: printify.storeData -> printifyData)
            const token = await getPrintifyToken();
            if (typeof token !== "string") {
                set((state) => ({ ...state, loading: false, error: token?.error }));
                return;
            }
            set((state) => ({ ...state, loading: false, token }));
        } catch (error) {
            set((state) => ({ ...state, loading: false, error: "Something went wrong!" }));
        }
    },
    fetchData: async () => {
        // might not want to set loading for now (it might mess with provider connectin ui)
        // set((state) => ({ ...state, loading: true, error: null }));
        try {
            const data = await getPrintifyProducts();
            if (!data) {
                const storeData = await fetchPrintifyProducts();
                const { printify } = storeData;
                set((state) => ({ ...state, data: printify }));
                return;
            }
            set((state) => ({ ...state, loading: false, data }));
        } catch (error) {
            set((state) => ({ ...state, loading: false, error: "Something went wrong!" }));
        }
    },
    deleteData: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
            const data = await deletePrintifyData();
            set((state) => ({ ...state, loading: false, data: null, token: undefined }));
        } catch (error) {
            set((state) => ({ ...state, loading: false, error: "Something went wrong!" }));
        }
    }
}));

export const selectPrintifyToken = (state: PrintifyState) => state.token;
export const selectPrintifyData = (state: PrintifyState) => state.data;
export const selectPrintifyLoading = (state: PrintifyState) => state.loading;
export const selectPrintifyError = (state: PrintifyState) => state.error;

export default usePrintifyStore;
