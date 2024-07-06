"use client"

import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { FaCheckCircle } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';

import { newVerification } from '@/actions/auth/new-verification';
import { Alert, AlertDescription } from '../atoms/alert';
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
                {error && <Alert variant="destructive">
                    <div className='flex items-center space-x-2'>
                        <FiAlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </div>
                </Alert>}
                {success && <Alert variant="affirmative">
                    <div className='flex items-center space-x-2'>
                        <FaCheckCircle className="h-4 w-4" />
                        <AlertDescription>{success}</AlertDescription>
                    </div>
                </Alert>}
            </AuthCard>
        </div>
    )
}