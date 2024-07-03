"use client"

import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import AuthCard from '../molecules/AuthCard';
import Form from '../molecules/Form';
import { SigninSchema } from '@/schema';

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
    const form = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (data: z.infer<typeof SigninSchema>) => {
        console.log(data);
    };

    return (
        <div>
            <AuthCard
                headerLabel='Sign In'
                backButtonLabel="Don't have an account?"
                backButtonHref="/auth/register"
                showSocial
            >
                <Form form={form} onSubmit={onSubmit} fields={formFields} />
            </AuthCard>
        </div>
    )
}