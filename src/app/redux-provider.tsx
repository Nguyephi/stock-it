'use client'

import store from "@/redux/store";
import { Provider } from "react-redux";

interface ProviderProps {
    children: React.ReactNode;
}

export const ReduxProvider: React.FC<ProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};