"use server"

import * as z from 'zod';

import { SigninSchema } from '@/schema';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';


export const signin = async (values: z.infer<typeof SigninSchema>) => {
    console.log('server', values);
    const validatedFields = SigninSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!"}
    }

    const { email, password} = validatedFields.data;

    try {
        await signIn('credentials', {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return { success: 'User signed in!' }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!'}
                case 'CallbackRouteError':
                    return { error: error.cause?.err?.message}
                default: 
                    return { error: 'Something went wrong!'}
            }
        }
        throw error;
    }
}