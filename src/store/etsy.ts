import { 
    deleteEtsyData, 
    getEtsyToken 
} from '@/actions/etsy/access-token';
import { fetchEtsyProducts, getEtsyProducts } from '@/actions/etsy/products';
import { create } from 'zustand';

interface EtsyState {
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

const useEtsyStore = create<EtsyState>((set) => ({
    ...initialState,
    fetchDataStart: () => set((state) => ({ ...state, loading: true, error: null })),
    fetchDataSuccess: (data) => set((state) => ({ ...state, loading: false, data })),
    fetchDataFailure: (error) => set((state) => ({ ...state, loading: false, error })),
    fetchToken: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
            const token = await getEtsyToken();
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
            const data = await getEtsyProducts();
            console.log('etsy data', data);
            if (!data) {
                const storeData = await fetchEtsyProducts();
                console.log('etsy store data', storeData);
                set((state) => ({ ...state, data }));
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
            const data = await deleteEtsyData();
            set((state) => ({ ...state, loading: false, data: null, token: undefined }));
        } catch (error) {
            set((state) => ({ ...state, loading: false, error: "Something went wrong!" }));
        }
    }
}));

export const selectEtsyToken = (state: EtsyState) => state.token;
export const selectEtsyData = (state: EtsyState) => state.data;
export const selectEtsyLoading = (state: EtsyState) => state.loading;
export const selectEtsyError = (state: EtsyState) => state.error;

export default useEtsyStore;
