import { SessionProvider } from "next-auth/react"
import {auth} from "@/auth";

interface ProviderProps {
    children: React.ReactNode;
}

export const NextAuthProvider: React.FC<ProviderProps> = async ({ children }) => {
    const session = await auth();
    return <SessionProvider session={session}>{children}</SessionProvider>;
};