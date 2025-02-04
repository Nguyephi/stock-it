'use client'

import React from 'react';
import useUserStore from '@/store/user';
import DashboardLayout from '../templates/DashboardLayout';
import Title from '../atoms/Title';

const DashboardPage = () => {
    const { data: user } = useUserStore();
    return (
        <DashboardLayout>
            <Title>Welcome to the Dashboard</Title>
        </DashboardLayout>  
    )
};

export default DashboardPage;