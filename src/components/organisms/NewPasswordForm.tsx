"use client"

import React, { useEffect, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

import AuthCard from '../molecules/AuthCard';
import { NewPasswordSchema } from '@/schema';
import { newPassword } from '@/actions/auth/new-password';
import { NewPasswordFormFields } from '@/lib/form-fields';
import AuthForm from '../molecules/AuthForm';
import useAlertStore from '@/store/alert-message';

export default function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const { error, success, clearMessages, setError, setSuccess } = useAlertStore();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        clearMessages()
        startTransition(() => {
            newPassword(values, token)
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
                headerLabel='Enter a new password'
                backButtonLabel="Back to login"
                backButtonHref="/auth/signin"
            >
                <AuthForm
                    form={form}
                    onSubmit={onSubmit}
                    fields={NewPasswordFormFields}
                    isPending={isPending}
                    error={error}
                    success={success}
                    buttonLabel='Reset password'
                />
            </AuthCard>
        </div>
    )
}