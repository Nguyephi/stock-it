import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { getUserById } from "@/data/user";
import authConfig from "@/auth.config"
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("account")
      // Allow oAuth w/o email verification
      if (account?.provider !== "credentials") {
        if (account?.provider === "etsy" && user && user.id) {
          const existingUser = await getUserById(user.id);
          if (!existingUser) {
            return false;
          }
          await db.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: { userId: existingUser.id },
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at
            },
          });
          return true;
        }
        return true;
      }

      // Prevent signin without email verification
      if (user && user.id) {
        const existingUser = await getUserById(user.id);

        if (!existingUser?.emailVerified) {
          return false;
        }
      }

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session;
    },
    async jwt({ token, user, trigger, profile, account }) {
      console.log("token", token)
      console.log("user", user)
      console.log("trigger", trigger)
      console.log("profile", profile)
      console.log("account", account)
      if (trigger === "signIn") {
        if (user && user.id) {
          const existingUser = await getUserById(user.id);
  
          if (!existingUser) {
            return token
          }
          token.role = existingUser.role
        }
      };
      return token;
    },
  },
})