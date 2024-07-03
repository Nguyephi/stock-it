"use client"

import React, { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import AuthCard from '../molecules/AuthCard';
import Form from '../molecules/Form';
import { SigninSchema } from '@/schema';
import { signin } from '@/actions/signin';

const formFields = [
    {
        id: 'email',
        // label: 'Email',
        type: 'email',
        placeholder: 'Email',
    },
    {
        id: 'password',
        // label: 'Password',
        type: 'password',
        placeholder: 'Password',
    },
];

export default function SignInForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof SigninSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            signin(values)
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
                headerLabel='Sign In'
                backButtonLabel="Don't have an account?"
                backButtonHref="/auth/register"
                showSocial
            >
                <Form 
                    form={form}
                    onSubmit={onSubmit}
                    fields={formFields}
                    isPending={isPending} 
                    error={error}
                    success={success}
                />
            </AuthCard>
        </div>
    )
}