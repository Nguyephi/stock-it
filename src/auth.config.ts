import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from "next-auth"

import Credentials from "next-auth/providers/credentials"
import Facebook from "next-auth/providers/facebook"

import { SigninSchema } from "@/schema"
import { getUserByEmail } from "@/data/user"

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = SigninSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email)
                    if (!user || !user.password) {
                        throw new Error("User not found!")
                    }

                    const passwordMatched = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (passwordMatched) {
                        return user
                    }
                }
                throw new Error("Invalid credentials!")
            }
        }),
        Facebook
    ]
} satisfies NextAuthConfig
