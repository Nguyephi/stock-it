"use client";

import React, { useEffect } from 'react';
import useUserStore from '@/store/user';
import { Session } from 'next-auth';
import usePrintifyStore, { selectPrintifyData, selectPrintifyToken } from '@/store/printify';
import useEtsyStore, { selectEtsyData, selectEtsyToken } from '@/store/etsy';
interface SessionStateProviderProps {
    children: React.ReactNode;
    session: Session | null;
}

/**
 * A provider that passes user session to user state
 * @param {SessionStateProviderProps} props
 * @returns {React.ReactElement}
 */
const SessionStateProvider: React.FC<SessionStateProviderProps> = ({ children, session }) => {
    const { setUser } = useUserStore();
    const { fetchToken: fetchPrintifyToken, fetchData: fetchPrintifyData } = usePrintifyStore();
    const printifyToken = usePrintifyStore(selectPrintifyToken);
    const printifyData = usePrintifyStore(selectPrintifyData);
    const { fetchToken: fetchEtsyToken, fetchData: fetchEtsyData } = useEtsyStore();
    const etsyToken = useEtsyStore(selectEtsyToken);
    const etsyData = useEtsyStore(selectEtsyData);

    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        }
    }, [session, setUser]);

    useEffect(() => {
        if (session && !printifyToken) {
            fetchPrintifyToken()
        }
    }, [session, printifyToken]);

    useEffect(() => {
        if (session && !etsyToken) {
            fetchEtsyToken()
        }
    }, [session, etsyToken]);
    
    useEffect(() => {
        if (session && !printifyData) {
            fetchPrintifyData()
        }
    }, [session, printifyData]);

    useEffect(() => {
        if (session && !etsyData) {
            console.log('fetching etsy data', etsyData)
            fetchEtsyData()
        }
    }, [session, etsyData]);


    return <div className="h-full">{children}</div>;
};

export default SessionStateProvider;