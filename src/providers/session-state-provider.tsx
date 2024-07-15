"use client";

import React, { useEffect } from 'react';
import useUserStore from '@/store/user';
import { Session } from 'next-auth';
import usePrintifyStore from '@/store/printify';
import useEtsyStore from '@/store/etsy';
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
    const { data: printify, fetchData: fetchPrintifyData } = usePrintifyStore();
    const { data: etsy, fetchData: fetchEtsyData } = useEtsyStore();

    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        }
    }, [session, setUser]);

    useEffect(() => {
        if (session && !printify) {
            fetchPrintifyData()
        }
    }, [session, printify]);

    useEffect(() => {
        if (session && !etsy) {
            fetchEtsyData()
        }
    }, [session, etsy]);

    return <div className="h-full">{children}</div>;
};

export default SessionStateProvider;