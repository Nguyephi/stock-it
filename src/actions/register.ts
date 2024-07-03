"use server"

import * as z from 'zod';
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { RegisterSchema } from '@/schema';
import { getUserByEmail } from '@/data/user';


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log('server', values);
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { username, email, password } = validatedFields.data;
    const hashedPW = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {error: 'Email taken!'}
    }

    await db.user.create({
        data: {
            name: username,
            email,
            password: hashedPW
        }
    })

    // TODO: sent email verification token
    return { success: 'User created!' }
}