'use client'

import React, { useEffect } from 'react';
import SignOut from '../organisms/SignOut';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
    const session = useSession();
    useEffect(() => {
        console.log("dashboard", session);
        
    }, [])
    return (
        <div className="flex h-full flex-col items-center justify-center bg-sky-400">
            <SignOut />
            {JSON.stringify(session)}
        </div>
    )
};

export default DashboardPage;