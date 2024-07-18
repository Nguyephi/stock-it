"use server"

import { auth } from "@/auth";
import { getEtsyAccessTokenByUserId, getEtsyShopDataByUserId } from "@/data/etsy";
import { db } from "@/lib/db";

/**
 * initiates Etsy OAuth
 * @returns
 */
export const handleEtsyOauth = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }
    try {
        const response = await fetch('/api/auth/etsy/connect');
        const data = await response.json();
        window.location.href = new URL(data.authorizationUrl).toString();
        return
    } catch (error) {
        console.error('Error initiating Etsy OAuth:', error);
        return { error: 'Something went wrong!' }
    }
}

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