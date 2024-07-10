"use client"

import React, { useEffect, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import AuthCard from '../molecules/AuthCard';
import { RegisterSchema } from '@/schema';
import { register } from '@/actions/auth/register';
import { RegisterFormFields } from '@/lib/form-fields';
import AuthForm from '../molecules/AuthForm';
import useAlertStore from '@/store/alert-message';

export default function RegisterForm() {
    const { error, success, clearMessages, setError, setSuccess } = useAlertStore();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        clearMessages();
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
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
                headerLabel='Register'
                backButtonLabel="Already have an account?"
                backButtonHref="/auth/signin"
                showSocial
            >
                <AuthForm
                    form={form}
                    onSubmit={onSubmit}
                    fields={RegisterFormFields}
                    isPending={isPending}
                    error={error}
                    success={success}
                    buttonLabel='Register account'
                />
            </AuthCard>
        </div>
    )
}

