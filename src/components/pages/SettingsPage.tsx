'use client'

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Title from '../atoms/Title';
import ShopConnectCard from '../molecules/ShopConnectCard';
import Divider from '../atoms/Divider';
import DashboardLayout from '../templates/DashboardLayout';
import { handleEtsyOauthByUserId } from '@/data/etsy';
import { storePrintifyAccessToken } from '@/actions/printify/access-token';
import useUserStore from '@/store/user';
import useAlertStore from '@/store/alert-message';

const SettingsPage = () => {
    const { data: user } = useUserStore();
    const { clearMessages, setError, setSuccess, setProvider } = useAlertStore();
    const searchParams = useSearchParams();

    useEffect(() => {
        return () => {
            clearMessages();
        };
    }, [clearMessages]);

    return (
        <DashboardLayout>
            <Title className='text-left w-full px-8 pt-8 pb-4'>Settings</Title>
            <Divider className='w-full mb-8' />
            <div className='container flex w-full space-x-4 py-4'>
                <ShopConnectCard
                    provider="printify"
                    headerLabel="Connect your printify"
                    description="Grab your personal access token from printify and paste it here."
                    handleSubmit={(values) => storePrintifyAccessToken(values)
                        .then((data) => {
                            if (!data) return
                            const { error, success } = data
                            if (error) setError(data.error)
                            if (success) setSuccess(data.success)
                            setProvider("printify")
                        })
                    }
                >
                </ShopConnectCard>
                <ShopConnectCard
                    provider="etsy"
                    headerLabel="Connect your etsy"
                    description="Using oAuth2"
                    onClick={() => handleEtsyOauthByUserId()
                        .then((data) => {
                            if (!data) return
                            const { error, success } = data
                            if (error) setError(data.error)
                            if (success) setSuccess(data.success)
                            console.log('error', searchParams.get("error"))
                            if (searchParams.get("error")) {
                                setError(searchParams.get("error") ?? undefined)
                            }
                            setProvider("etsy")
                        })
                    }
                >
                </ShopConnectCard>
            </div>
        </DashboardLayout>
    )
};

export default SettingsPage;