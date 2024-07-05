'use client'

import React from 'react';
import SignOut from '../molecules/SignOut';
import useUserStore from '@/store/user';

const DashboardPage = () => {
    const { data: user } = useUserStore();
    return (
        <div className="flex h-full flex-col items-center justify-center bg-sky-400">
            <SignOut />
            {user && JSON.stringify(user)}
        </div>
    )
};

export default DashboardPage;