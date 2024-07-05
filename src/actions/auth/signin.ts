"use server"

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { generateVerificationToken } from "@/lib/tokens";
import { SigninSchema } from '@/schema';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

export const signin = async (values: z.infer<typeof SigninSchema>) => {
    const validatedFields = SigninSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data;

    const exisitingUser = await getUserByEmail(email);

    if (!exisitingUser || !exisitingUser.email || !exisitingUser.password) {
        return { error: "Email does not exist!" }
    }

    if (!exisitingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success: "Confirmation email sent" }
    }

    try {
        await signIn('credentials', {
            email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return { success: 'User signed in!' }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' }
                case 'CallbackRouteError':
                    return { error: error.cause?.err?.message }
                default:
                    return { error: 'Something went wrong!' }
            }
        }
        throw error;
    }
}