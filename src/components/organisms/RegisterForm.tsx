"use client"

import React, { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import AuthCard from '../molecules/AuthCard';
import { RegisterSchema } from '@/schema';
import { register } from '@/actions/auth/register';
import { RegisterFormFields } from '@/lib/form-fields';
import AuthForm from '../molecules/AuthForm';

export default function RegisterForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
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
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        })
    };

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

