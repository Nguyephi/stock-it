"use client"

import React, { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation';

import AuthCard from '../molecules/AuthCard';
import AuthForm from '../molecules/AuthForm';
import { SigninSchema } from '@/schema';
import { signin } from '@/actions/auth/signin';
import { SigninFormFields } from '@/lib/form-fields';

export default function SignInForm() {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?
        "Email in use with a different provider!" : "";
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
                    const { error, success } = data
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
                <AuthForm
                    form={form}
                    onSubmit={onSubmit}
                    fields={SigninFormFields}
                    isPending={isPending}
                    error={error || urlError}
                    success={success}
                    buttonLabel='Sign in'
                />
            </AuthCard>
        </div>
    )
}