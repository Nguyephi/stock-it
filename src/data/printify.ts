import { db } from "@/lib/db";

export const getPrintifyDataByUserId = async (userId: string) => {
    try {   
        const data = await db.printify.findUnique({ where: { userId }});
        return data?.storeData;
    } catch {
        return null;
    }
}

export const getPrintifyAcessTokenByUserId = async (userId: string) => {
    try {   
        const data = await db.printify.findUnique({ where: { userId }});
        return data?.accessToken;
    } catch {
        return null;
    }
}

export const getPrintifyShopIdByUserId = async (userId: string) => {
    try {   
        const data = await db.printify.findUnique({ where: { userId }});
        return data?.shopId;
    } catch {
        return "";
    }
}