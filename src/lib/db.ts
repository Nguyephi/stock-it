import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined;
}

// prevents hot reload in next js dev env
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db