'use client'

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setUser } from '@/redux/slices/user';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.data);

    useEffect(() => {
        if (session === null) {
            console.log('session is null');
            /**
             * TODO: Bug! Page does not load session after user signs in. 
             * Realoding the page is the fix for now.
             */
            window.location.reload();
        }
        if (session?.user && !user) {
            dispatch(setUser(session.user));
        }
    }, [session, user, dispatch]);

    return (
        <div className="h-full">
            {children}
        </div>
    );
};

export default DashboardLayout;
