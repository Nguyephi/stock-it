import { create } from 'zustand';

interface DrawerState {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
    isOpen: false,
    handleOpen: () => set({ isOpen: true }),
    handleClose: () => set({ isOpen: false }),
}));