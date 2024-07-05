"use client"

import React, { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

import AuthCard from '../molecules/AuthCard';
import Form from '../molecules/Form';
import { NewPasswordSchema } from '@/schema';
import { newPassword } from '@/actions/auth/new-password';

const formFields = [
    {
        id: 'password',
        // label: 'Password',
        type: 'password',
        placeholder: 'Password',
    },
    {
        id: 'confirmPassword',
        // label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm Password',
    },
];

export default function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            newPassword(values, token)
            .then((data) => {
                if (!data) return
                const {error, success} = data
                if (error) setError(data.error)
                if (success) setSuccess(data.success)
            })
        })
    };

    return (
        <div>
            <AuthCard
                headerLabel='Enter a new password'
                backButtonLabel="Back to login"
                backButtonHref="/auth/signin"
            >
                <Form 
                    form={form}
                    onSubmit={onSubmit}
                    fields={formFields}
                    isPending={isPending} 
                    error={error}
                    success={success}
                    buttonLabel='Reset password'
                />
            </AuthCard>
        </div>
    )
}