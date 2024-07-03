"use client"

import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import AuthCard from '../molecules/AuthCard';
import Form from '../molecules/Form';
import { RegisterSchema } from '@/schema';

const formFields = [
    {
        id: 'username',
        // label: 'Username',
        type: 'text',
        placeholder: 'Username',
    },
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
    {
        id: 'confirmPassword',
        // label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm Password',
    },
];

export default function RegisterForm() {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        console.log(data);
    };

    return (
        <div>
            <AuthCard
                headerLabel='Register'
                backButtonLabel="Already have an account?"
                backButtonHref="/auth/signin"
                showSocial
            >
                <Form form={form} onSubmit={onSubmit} fields={formFields} />
            </AuthCard>
        </div>
    )
}

