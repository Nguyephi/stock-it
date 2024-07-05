"use client";

import React, { useEffect } from 'react';
import useUserStore from '@/store/user';
import { Session } from 'next-auth';
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
    
    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        }
    }, [session, setUser]);

    return <div className="h-full">{children}</div>;
};

export default SessionStateProvider;