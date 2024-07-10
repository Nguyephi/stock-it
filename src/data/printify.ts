import { db } from "@/lib/db";

export const getPrintifyDataByUserId = async (userId: string) => {
    try {   
        const data = await db.printify.findUnique({ where: { userId }});
        return data;
    } catch {
        return null;
    }
}