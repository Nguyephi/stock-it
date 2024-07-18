"use server"

import { auth } from "@/auth";
import { getEtsyAccessTokenByUserId, getEtsyShopDataByUserId } from "@/data/etsy";
import { db } from "@/lib/db";

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

export const getEtsyShopData = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const etsy = await getEtsyShopDataByUserId(userId);
        if (!etsy) {
            return { error: 'No access token found' };
        }
        return etsy;
    } catch {
        return null;
    }
}

export const deleteEtsyData = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        // delete from account and etsy tables
        const etsy = await getEtsyShopDataByUserId(userId);

        if (!etsy) {
            return { error: 'No access token found' };
        }
        const { provider, providerAccountId } = etsy;
        await db.account.delete({
            where: { 
                provider_providerAccountId: {
                    provider,
                    providerAccountId
                }
            },
        });
    } catch {
        return null;
    }
}