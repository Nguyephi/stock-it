"use server"

import { auth } from "@/auth";
import { getEtsyAccessTokenByUserId } from "@/data/etsy";

export const getEtsyToken = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const etsy = await getEtsyAccessTokenByUserId(userId);
        if (!etsy) {
            return { error: 'No access token found' };
        }
        return etsy;
    } catch {
        return null;
    }
}