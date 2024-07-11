'use client'

import React from 'react';
import useUserStore from '@/store/user';
import DashboardLayout from '../templates/DashboardLayout';
import { storePrintifyAccessToken } from '@/actions/printify/access-token';
import Title from '../atoms/Title';
import ShopConnectCard from '../molecules/ShopConnectCard';
import Divider from '../atoms/Divider';

const SettingsPage = () => {
    const { data: user } = useUserStore();
    return (
        <DashboardLayout>
            <Title className='text-left w-full px-8 pt-8 pb-4'>Settings</Title>
            <Divider className='w-full mb-8' />
            <div className='container flex w-full space-x-4 py-4'>
                <ShopConnectCard
                    provider="printify"
                    headerLabel="Connect your printify"
                    description="Grab your personal access token from your printify account and paste it here."
                    handleSubmit={(values) => storePrintifyAccessToken(values)}
                >
                </ShopConnectCard>
                <ShopConnectCard
                    provider="etsy"
                    headerLabel="Connect your etsy"
                    description="Add input and button here"
                >
                </ShopConnectCard>
            </div>
        </DashboardLayout>
    )
};

export default SettingsPage;