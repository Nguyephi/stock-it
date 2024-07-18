import { db } from "@/lib/db";

export const scopes = ['transactions_r', 'transactions_w', 'profile_r', 'email_r']

/**
 * initiates Etsy OAuth
 * @returns
 */
export const handleEtsyOauth = async () => {
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

/**
 * Stores/get/delete Etsy oauth state into/from db
 * @param userId 
 * @param state 
 * @param codeVerifier 
 */
export const storeEtsyOauthStateByUserId = async (userId: string, state: string, codeVerifier: string) => {
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);
    try {
        await db.etsyOAuthState.upsert({
            where: { userId },
            update: {
                state,
                codeVerifier,
                expiresAt,
            },
            create: {
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

export const getEtsyOAuthStateByUserId = async (userId: string) => {
    // TODO: check if expired
    try {
        const stateData = await db.etsyOAuthState.findUnique({ where: { userId } });
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

/**
 * Used to store Etsy access token
 * @param userId 
 * @param providerAccountId 
 * @param accessToken 
 * @param refreshToken 
 * @param expiresIn 
 * @param tokenType 
 * @returns 
 */
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

export const isEtsyAccessTokenExpired = async (createdAt: Date, expiresAt: number | null) => {
    try {
        const expiryTime = new Date(createdAt.getTime() + (expiresAt || 3600) * 1000);
        return new Date() > expiryTime;;
    } catch (error) {
        console.error('Error checking Etsy access token validity:', error);
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

        if (!accountData) {
            throw new Error('No access token found');
        }
        const isTokenValidated = await isEtsyAccessTokenExpired(accountData.createdAt, accountData.expires_at);

        if (!isTokenValidated) {
            // TODO: refresh token
        }
        return accountData.access_token;
    } catch (error) {
        console.error('Error fetching Etsy access token:', error);
    }
}

export const getEtsyShopDataByUserId = async (userId: string) => {
    try {
        const accountData = await db.account.findFirst({
            where: {
                userId,
                type: 'etsy',
            },
        });

        if (!accountData) {
            throw new Error('No access token found');
        }
        const isTokenValidated = await isEtsyAccessTokenExpired(accountData.createdAt, accountData.expires_at);

        if (!isTokenValidated) {
            // TODO: refresh token
        }
        return accountData;
    } catch (error) {
        console.error('Error fetching Etsy access token:', error);
    }
}

export const getEtsyProductsByUserId = async (userId: string) => {
    try {
        const etsy = await db.etsy.findUnique({ where: { userId }});
        return etsy?.storeData;
    } catch {
        return null;
    }
}

export const deleteEtsyProductsByUserId = async (userId: string) => {
    try {
        await db.etsy.delete({ where: { userId }});
    } catch {
        return null;
    }
}

export const deleteEtsyAccessTokenByProviderAccountId = async (providerAccountId: string) => {
    try {
        await db.account.delete({
            where: {
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