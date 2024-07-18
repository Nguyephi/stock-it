"use server";

import { auth } from "@/auth";
import { getEtsyProductsByUserId, getEtsyShopDataByUserId } from "@/data/etsy";
import { decryptToken } from "@/lib/jwt";

export const getEtsyProducts = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }
    try {
        const etsy = await getEtsyProductsByUserId(userId);
        return etsy;
    } catch {
        return null;
    }
}
const fetchEtsyProductsByShopId = async (shopId: string, token: string) => {
    const response = await fetch(`https://api.etsy.com/v3/application/shops/${shopId}/listings`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'x-api-key': process.env.AUTH_ETSY_ID!,
        }
    });
    console.log('etsy server response', response);

    if (!response.ok) {
        throw new Error(`Error fetching listings: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

export const fetchEtsyProducts = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const etsy = await getEtsyShopDataByUserId(userId);
        if (!etsy || !etsy.access_token) {
            return { error: 'No access token found' };
        }
        const { access_token: accessToken, providerAccountId } = etsy;
        const token = await decryptToken(accessToken);

        const getEtsyProducts = await fetchEtsyProductsByShopId(providerAccountId, token);
        console.log('etsy server product', getEtsyProducts);
        return getEtsyProducts;
    } catch {
        return null;
    }
}