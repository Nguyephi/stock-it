"use client"

import React, { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import AuthCard from '../molecules/AuthCard';
import Form from '../molecules/Form';
import { ResetSchema } from '@/schema';
import { reset } from '@/actions/reset';

const formFields = [
    {
        id: 'email',
        // label: 'Email',
        type: 'email',
        placeholder: 'Email',
    },
];

export default function ResetForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            reset(values)
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
                headerLabel='Forgot your password?'
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