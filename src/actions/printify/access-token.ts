"use server"

import { z } from "zod";
import { InputSchema } from "@/schema";
import { auth } from "@/auth";
import { decryptToken, encryptToken } from "@/lib/jwt";
import { db } from "@/lib/db";
import { getPrintifyDataByUserId } from "@/data/printify";

const PRINTIFY_API_URL = "https://api.printify.com/v1"

export const fetchPrintifyStoreDataByToken = async (token: string) => {
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

export const storePrintifyAccessToken = async (values: z.infer<typeof InputSchema>) => {
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
        const printifyStore = await fetchPrintifyStoreDataByToken(token)
        if (!printifyStore) {
            return { error: "Invalid access token!" }
        }
        const encryptedToken = encryptToken(token);

        await db.printify.upsert({
            where: { userId },
            update: { accessToken: encryptedToken },
            create: {
                userId: userId as string,
                accessToken: encryptedToken,
                refreshToken: '',
                expiresAt: new Date(),
            },
        });
        return { success: "Access token validated!" }
    } catch (error) {
        console.error(error);
        return { error: 'Internal server error' };
    }
}

export const fetchPrintifyProductsByShopId = async (token: string, id: string) => {
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

export const storePrintifyProductsByUserId = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const printify = await getPrintifyDataByUserId(userId);
        if (!printify) {
            return { error: 'No access token found' };
        }

        const decryptedToken = decryptToken(printify.accessToken);

        if (!decryptedToken) {
            return { error: "Invalid access token!" }
        }
        let storeData = await fetchPrintifyStoreDataByToken(decryptedToken)

        if (!storeData) {
            return { error: "Invalid access token!" }
        }
        storeData = storeData[0];
        const shopId = storeData.id;
        const products = await fetchPrintifyProductsByShopId(decryptedToken, shopId);
        storeData.productData = products.data

        const updatePrintify = await db.printify.update({
            where: { userId: userId },
            data: { storeData: storeData },
        });
        return { success: "Product data updated!", printify: updatePrintify }
    } catch (error) {
        console.error(error);
        return { error: 'Internal server error' };
    }
}

export const getPrintifyData = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return { error: "User is not authenticated!" }
    }

    try {
        const printify = await getPrintifyDataByUserId(userId);
        if (!printify) {
            return { error: 'No access token found' };
        }
        return printify;
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
        const printify = await db.printify.findUnique({
            where: { userId: userId },
        });

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
