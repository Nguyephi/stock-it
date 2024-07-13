import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { deleteEtsyOAuthState, getEtsyOAuthState } from '@/data/etsy';

export async function GET(req: NextRequest) {
  console.log('GETT', req);
  try {
    const {searchParams} = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    if (!code || !state) {
      return NextResponse.json({ error: 'Missing code or state' }, { status: 400 });
    }
    const oAuthState = await getEtsyOAuthState(state);

    if (!oAuthState) {
      return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
    }

    const {codeVerifier} = oAuthState;

    const tokenResponse = await fetch('https://api.etsy.com/v3/public/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        code_verifier: codeVerifier,
        client_id: process.env.AUTH_ETSY_ID!,
        client_secret: process.env.AUTH_ETSY_SECRET!,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return NextResponse.json({ error: 'Failed to fetch access token', details: errorData }, { status: 400 });
    }

    const tokenData = await tokenResponse.json();
    console.log('tokenData', tokenData);

    // await deleteEtsyOAuthState(state);
    return NextResponse.json({ message: 'OAuth process completed successfully' });
  } catch (error) {
    console.error('OAuth Error:', error);
    return NextResponse.json({ error: 'OAuth process failed' }, { status: 500 });
  }
}