"use client";

import React, { useEffect } from 'react';
import useUserStore from '@/store/user';
import { Session } from 'next-auth';
import usePrintifyStore, { selectPrintifyToken } from '@/store/printify';
import useEtsyStore, { selectEtsyToken } from '@/store/etsy';
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
    const { fetchToken: fetchPrintifyToken } = usePrintifyStore();
    const printifyToken = usePrintifyStore(selectPrintifyToken);
    const { fetchToken: fetchEtsyToken } = useEtsyStore();
    const etsyToken = useEtsyStore(selectEtsyToken);

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

    return <div className="h-full">{children}</div>;
};

export default SessionStateProvider;