'use client'

import React from 'react';
import useUserStore from '@/store/user';
import DashboardLayout from '../templates/DashboardLayout';
import Title from '../atoms/Title';

const EtsyPage = () => {
    const { data: user } = useUserStore();
    return (
        <DashboardLayout>
            <Title>Welcome to the Etsy Page</Title>
        </DashboardLayout>  
    )
};

export default EtsyPage;