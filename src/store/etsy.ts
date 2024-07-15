// import { deletePrintifyData, getPrintifyData } from '@/actions/printify/access-token';
import { getEtsyToken } from '@/actions/etsy/access-token';
import { create } from 'zustand';

interface EtsyState {
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

const useEtsyStore = create<EtsyState>((set) => ({
    ...initialState,
    fetchDataStart: () => set((state) => ({ ...state, loading: true, error: null })),
    fetchDataSuccess: (data) => set((state) => ({ ...state, loading: false, data })),
    fetchDataFailure: (error) => set((state) => ({ ...state, loading: false, error })),
    fetchData: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
            const data = await getEtsyToken();
            set((state) => ({ ...state, loading: false, data }));
        } catch (error) {
            set((state) => ({ ...state, loading: false, error: "Something went wrong!" }));
        }
    },
    deleteData: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        // try {
        //     const data = await deletePrintifyData();
        //     set((state) => ({ ...state, loading: false, data }));
        // } catch (error) {
        //     set((state) => ({ ...state, loading: false, error: "Something went wrong!" }));
        // }
    }
}));

export const selectEtsyData = (state: EtsyState) => state.data;
export const selectEtsyId = (state: EtsyState) => state.data?.id;
export const selectEtsyLoading = (state: EtsyState) => state.loading;
export const selectEtsyError = (state: EtsyState) => state.error;

export default useEtsyStore;
