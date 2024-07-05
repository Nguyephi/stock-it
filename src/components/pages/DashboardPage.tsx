'use client'

import React from 'react';
import SignOut from '../molecules/SignOut';
import { useAppSelector } from '@/redux/store';

const DashboardPage = () => {
    const user = useAppSelector(state => state.user.data);
    return (
        <div className="flex h-full flex-col items-center justify-center bg-sky-400">
            <SignOut />
            {user && JSON.stringify(user)}
        </div>
    )
};

export default DashboardPage;