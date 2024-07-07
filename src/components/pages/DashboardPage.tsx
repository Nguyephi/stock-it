'use client'

import React from 'react';
import SignOut from '../molecules/SignOut';
import useUserStore from '@/store/user';
import DashboardLayout from '../templates/DashboardLayout';
import Title from '../atoms/Title';

const DashboardPage = () => {
    const { data: user } = useUserStore();
    return (
        <DashboardLayout>
            <Title>Welcome to the Dashboard</Title>
            <SignOut />
            {user && JSON.stringify(user)}
        </DashboardLayout>  
    )
};

export default DashboardPage;