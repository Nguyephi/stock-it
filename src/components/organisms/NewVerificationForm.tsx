"use client"

import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { FaCheckCircle } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';

import { newVerification } from '@/actions/auth/new-verification';
import Alert from '../atoms/Alert';
import AuthCard from '../molecules/AuthCard';

export default function NewVerificationForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token!")
            return
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token])

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div>
            <AuthCard
                headerLabel='Verify account'
                backButtonLabel="Back to login"
                backButtonHref="/auth/sigin"
            >
                {!success && !error && (
                    <div className='flex w-full justify-center'>
                        <BeatLoader />
                    </div>
                )}
                <Alert icon={<FaCheckCircle className="h-4 w-4" />} iconPlacement="before" message={success} className='text-green-950 alert-success mt-4' />
                <Alert icon={<FiAlertTriangle className="h-4 w-4" />} iconPlacement="before" message={error} className='text-red-950 alert-error mt-4' />
            </AuthCard>
        </div>
    )
}