'use client'

import React from 'react';
import useUserStore from '@/store/user';
import DashboardLayout from '../templates/DashboardLayout';
import Title from '../atoms/Title';

const SettingsPage = () => {
    const { data: user } = useUserStore();
    return (
        <DashboardLayout>
            <Title>Welcome to the Settings Page</Title>
            {user && JSON.stringify(user)}
        </DashboardLayout>  
    )
};

export default SettingsPage;