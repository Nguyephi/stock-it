import { NextRequest, NextResponse } from 'next/server';
import { deleteEtsyOAuthState, getEtsyOAuthState, storeEtsyAccessToken } from '@/data/etsy';
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'User is not authenticated!' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (!code || !state) {
      return NextResponse.json({ error: 'Missing code or state' }, { status: 400 });
    }
    const oAuthState = await getEtsyOAuthState(state);
    if (!oAuthState) {
      return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
    }

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
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json({ error: 'Failed to fetch access token', details: errorData }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();
    const { access_token: accessToken } = tokenData;

    if (accessToken) {
      const providerAccountId = accessToken.split('.')[0];
      console.log('userId', providerAccountId);
      console.log('accessToken', accessToken);
      const userData = await fetch(`https://api.etsy.com/v3/application/users/${providerAccountId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-api-key': process.env.AUTH_ETSY_ID!,
        },
      });
      if (!userData.ok) {
        const errorData = await userData.json();
        return NextResponse.json({ error: 'Failed to fetch user data', details: errorData }, { status: 400 });
      }
      const user = await userData.json();
      console.log('user!!!!', user);
      console.log("tokenData", tokenData);
      const storedData = await storeEtsyAccessToken(userId, accessToken, providerAccountId);
      // if (!storedData.error) 
    }

    await deleteEtsyOAuthState(state);
    return NextResponse.json({ message: 'OAuth process completed successfully' });
  } catch (error) {
    console.error('OAuth Error:', error);
    return NextResponse.json({ error: 'OAuth process failed' }, { status: 500 });
  }
}