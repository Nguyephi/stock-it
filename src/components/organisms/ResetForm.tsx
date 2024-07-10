"use client"

import React, { useEffect, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import AuthCard from '../molecules/AuthCard';
import { ResetSchema } from '@/schema';
import { reset } from '@/actions/auth/reset';
import { ResetFormFields } from '@/lib/form-fields';
import AuthForm from '../molecules/AuthForm';
import useAlertStore from '@/store/alert-message';

export default function ResetForm() {
    const { error, success, clearMessages, setError, setSuccess } = useAlertStore();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        clearMessages();
        startTransition(() => {
            reset(values)
                .then((data) => {
                    if (!data) return
                    const { error, success } = data
                    if (error) setError(data.error)
                    if (success) setSuccess(data.success)
                })
        })
    };

    useEffect(() => {
        return () => {
            clearMessages();
        };
    }, [clearMessages]);

    return (
        <div>
            <AuthCard
                headerLabel='Forgot your password?'
                backButtonLabel="Back to login"
                backButtonHref="/auth/signin"
            >
                <AuthForm
                    form={form}
                    onSubmit={onSubmit}
                    fields={ResetFormFields}
                    isPending={isPending}
                    error={error}
                    success={success}
                    buttonLabel='Reset password'
                />
            </AuthCard>
        </div>
    )
}