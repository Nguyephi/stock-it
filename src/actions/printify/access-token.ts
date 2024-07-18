"use server"

import { z } from "zod";
import { InputSchema } from "@/schema";
import { auth } from "@/auth";
import { decryptToken, encryptToken } from "@/lib/jwt";
import { db } from "@/lib/db";
import {
    getPrintifyAcessTokenByUserId,
    getPrintifyShopIdByUserId,
    getPrintifyDataByUserId
} from "@/data/printify";

const PRINTIFY_API_URL = "https://api.printify.com/v1"

/**
 * Fetch printify access token with personal access token
 * @param token 
 * @returns 
 */
const fetchPrintifyAccessTokenByPAT = async (token: string) => {
    const response = await fetch(`${PRINTIFY_API_URL}/shops.json`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    return data;
}

/**
 * Makes a request to the Printify API to get the access token and shop id
 * @param values 
 * @returns 
 */
export const fetchPrintifyAccessToken = async (values: z.infer<typeof InputSchema>) => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    const validatedFields = InputSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Personal access token is required!" }
    }

    const { input: token } = validatedFields.data;

    try {
        const printifyStore = await fetchPrintifyAccessTokenByPAT(token)
        if (!printifyStore) {
            return { error: "Invalid access token!" }
        }
        const shopId = printifyStore[0].id;
        const encryptedToken = await encryptToken(token);
        console.log("whats is token?", encryptedToken)

        await db.printify.upsert({
            where: { userId },
            update: { accessToken: encryptedToken },
            create: {
                userId,
                accessToken: encryptedToken,
                refreshToken: '',
                expiresAt: new Date(),
                shopId
            },
        });
        return { success: "Access token validated!" }
    } catch (error) {
        console.error(error);
        return { error: 'Internal server error' };
    }
}

/**
 * Fetch products from Printify API with token and shopId
 * @param token 
 * @param id 
 * @returns 
 */
const fetchPrintifyProductsByShopId = async (token: string, id: number) => {
    const response = await fetch(`${PRINTIFY_API_URL}/shops/${id}/products.json`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        return null;
    }

    const data = await response.json();
    return data;
}

/**
 * Makes a request to the Printify API to get the products and stores product data in the database
 * @returns 
 */
export const fetchPrintifyProducts = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const token = await getPrintifyAcessTokenByUserId(userId);
        if (!token) {
            return { error: 'No access token found' };
        }

        const decryptedToken = await decryptToken(token);

        if (!decryptedToken) {
            return { error: "Invalid access token!" }
        }
        let shopId = await getPrintifyShopIdByUserId(userId);
        if (!shopId) {
            return { error: 'No shop id found' };
        }
        const products = await fetchPrintifyProductsByShopId(decryptedToken, shopId);

        const updatePrintify = await db.printify.update({
            where: { userId: userId },
            data: { storeData: products.data },
        });
        return { success: "Product data updated!", printify: updatePrintify.storeData }
    } catch (error) {
        console.error(error);
        return { error: 'Internal server error' };
    }
}

/***************************************
 * Use these functions to interact with printify store
 ***************************************/

export const getPrintifyToken = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const token = await getPrintifyAcessTokenByUserId(userId);
        if (!token) {
            return { error: 'No access token found' };
        }
        return token;
    } catch {
        return null;
    }
}

export const getPrintifyProducts = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const data = await getPrintifyDataByUserId(userId);
        return data;
    } catch {
        return null;
    }
}

export const deletePrintifyData = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const printify = await getPrintifyAcessTokenByUserId(userId);

        if (!printify) {
            return { error: 'No access token found' };
        }

        await db.printify.delete({
            where: { userId: userId },
        });
    } catch {
        return null;
    }
}
