import { db } from "@/lib/db";

export const getPrintifyDataByUserId = async (userId: string) => {
    try {   
        const user = await db.printify.findUnique({ where: { userId }});
        return user;
    } catch {
        return null;
    }
}