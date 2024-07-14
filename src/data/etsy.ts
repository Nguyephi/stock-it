import { db } from "@/lib/db";

export const scopes = ['transactions_r', 'transactions_w', 'profile_r', 'email_r']

export const storeEtsyOauthStateByUserId = async (userId: string, state: string, codeVerifier: string) => {
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);
    try {
        await db.etsyOAuthState.create({
            data: {
                userId,
                state,
                codeVerifier,
                expiresAt,
            },
        });
    } catch (error) {
        console.error('Error storing Etsy OAuth state:', error);
    }
}

export const getEtsyOAuthState = async (state: string) => {
    try {
        const stateData = await db.etsyOAuthState.findUnique({ where: { state } });
        return stateData;
    } catch {
        return null;
    }
}

export const deleteEtsyOAuthState = async (state: string) => {
    try {
        await db.etsyOAuthState.delete({ where: { state } });
    } catch {
        return null;
    }
}

export const storeEtsyAccessToken = async (
    userId: string,
    providerAccountId: string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    tokenType: string
) => {
    try {
        const accountData = await db.account.upsert({
            where: {
                provider_providerAccountId: {
                    provider: 'etsy',
                    providerAccountId: providerAccountId,
                },
            },
            update: {
                access_token: accessToken,
                updatedAt: new Date(),
            },
            create: {
                userId,
                type: 'etsy',
                provider: 'etsy',
                providerAccountId: providerAccountId,
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_at: expiresIn,
                token_type: tokenType,
                scope: scopes.join(' '),
            },
        });

        return accountData;
    } catch (error) {
        console.error('Error storing Etsy access token:', error);
    }
}

export const getEtsyAccessTokenByUserId = async (userId: string) => {
    try {
        const accountData = await db.account.findFirst({
            where: {
                userId,
                type: 'etsy',
            },
        });

        return accountData;
    } catch (error) {
        console.error('Error fetching Etsy access token:', error);
    }
}

export const deleteEtsyAccessToken = async (userId: string, providerAccountId: string) => {
    try {
        await db.account.delete({
            where:{
                provider_providerAccountId: {
                    provider: 'etsy',
                    providerAccountId: providerAccountId,
                },
            }
        });
    } catch (error) {
        console.error('Error deleting Etsy access token:', error);
    }
}