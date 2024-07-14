import { db } from "@/lib/db";

export const scopes = ['transactions_r', 'transactions_w', 'profile_r', 'email_r']

export async function fetchEtsyUserData(accessToken: string) {
    const response = await fetch('https://api.etsy.com/v3/application/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
}

export const handleEtsyOauth = async () => {
    try {
        const response = await fetch('/api/auth/etsy/connect');
        const data = await response.json();
        window.location.href = data.authorizationUrl;
    } catch (error) {
        console.error('Error initiating Etsy OAuth:', error);
    }
}

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