import Facebook from "next-auth/providers/facebook"
import type { NextAuthConfig } from "next-auth"
 
export default { 
    providers: [
        Facebook
    ] 
} satisfies NextAuthConfig
