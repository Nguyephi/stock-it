import { NextRequest, NextResponse } from 'next/server';
import { deleteEtsyOAuthState, getEtsyAccessTokenByUserId, getEtsyOAuthStateByUserId, storeEtsyAccessToken } from '@/data/etsy';
import { auth } from "@/auth";
import { encryptToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  const redirectUrl = new URL('/dashboard/settings', req.url);

  /**
   * Is user authenticated?
   */
  if (!userId) {
    redirectUrl.searchParams.set("error", "User is not authenticated!");
    redirectUrl.searchParams.set("provider", "etsy");
    return NextResponse.redirect(redirectUrl);
  }

  /**
   * Is user already connected to Etsy?
   */
  const currAccessToken = await getEtsyAccessTokenByUserId(userId);
  if (currAccessToken) {
    redirectUrl.searchParams.set("error", "You already have an Etsy access token!");
    redirectUrl.searchParams.set("provider", "etsy");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (!code || !state) {
      redirectUrl.searchParams.set("error", "Missing code or state");
      redirectUrl.searchParams.set("provider", "etsy");
      return NextResponse.redirect(redirectUrl);
    }

    /**
     * Does etsy oauth state exist?
     */
    const oAuthState = await getEtsyOAuthStateByUserId(userId);
    if (!oAuthState) {
      redirectUrl.searchParams.set("error", "State not found");
      redirectUrl.searchParams.set("provider", "etsy");
      return NextResponse.redirect(redirectUrl);
    }

    /**
     * Fetch access token
     */
    const { codeVerifier } = oAuthState;
    const tokenResponse = await fetch('https://api.etsy.com/v3/public/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        code_verifier: codeVerifier,
        client_id: process.env.AUTH_ETSY_ID!,
        redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/etsy/callback',
      }),
    });

    /**
     * Check if access token fetch was successful
     */
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      redirectUrl.searchParams.set("error", "Failed to fetch access token");
      redirectUrl.searchParams.set("provider", "etsy");
      return NextResponse.redirect(redirectUrl);
    }

    const tokenData = await tokenResponse.json();
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      token_type: tokenType
    } = tokenData;

    /**
     * Fetch user data
     */
    if (accessToken) {
      const providerAccountId = accessToken.split('.')[0];
      const userData = await fetch(`https://api.etsy.com/v3/application/users/${providerAccountId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-api-key': process.env.AUTH_ETSY_ID!,
        },
      });
      if (!userData.ok) {
        const errorData = await userData.json();
        redirectUrl.searchParams.set("error", "Failed to fetch user data");
        redirectUrl.searchParams.set("provider", "etsy");
        return NextResponse.redirect(redirectUrl);
      }
      const user = await userData.json();
      const encryptedAccessToken = encryptToken(accessToken);
      const encryptedRefreshToken = encryptToken(refreshToken);

      /**
       * Store access token and delete oauth state
       */
      const storedData = await storeEtsyAccessToken(
        userId,
        providerAccountId,
        encryptedAccessToken,
        encryptedRefreshToken,
        expiresIn,
        tokenType
      );
      if (storedData) {
        await deleteEtsyOAuthState(state);
      }
    }

    /**
     * Return to dashboard with success message
     */
    redirectUrl.searchParams.set("success", "Connected to Etsy!");
    redirectUrl.searchParams.set("provider", "etsy");
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth Error:', error);
    redirectUrl.searchParams.set("error", "OAuth process failed");
    redirectUrl.searchParams.set("provider", "etsy");
    return NextResponse.redirect(redirectUrl);
  }
}