"use server"

import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";
import SessionStateProvider from "./session-state-provider";

interface ProviderProps {
    children: React.ReactNode;
}

/**
 * A provider that passes the session object to SessionProvider and SessionStateProvider
 * Client components can now useSession to access/update the session object or use the global state
 * @param {ProviderProps} props
 * @returns {React.ReactElement}
 */
export const NextAuthProvider: React.FC<ProviderProps> = async ({ children }) => {
    const session = await auth();
    return (
        <SessionProvider>
            <SessionStateProvider session={session}>
                {children}
            </SessionStateProvider>
        </SessionProvider>
    )
};