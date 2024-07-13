import { auth } from '@/auth';
import { storeEtsyOauthStateByUserId } from '@/data/etsy';
import { NextRequest, NextResponse } from 'next/server';
import { encode } from 'querystring';

function generateRandomString(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let randomString = '';
  const values = crypto.getRandomValues(new Uint8Array(length));
  values.forEach(value => {
    randomString += charset[value % charset.length];
  });
  return randomString;
}

function base64URLEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function generateCodeChallenge(codeVerifier: string): string {
  const buffer = new TextEncoder().encode(codeVerifier);
  return base64URLEncode(buffer);
}

const clientId = process.env.AUTH_ETSY_ID!;
const redirectUri = `https://stock-it.vercel.app/api/auth/etsy/callback`;
const scopes = ['transactions_r', 'transactions_w']; // Define your required scopes
const state = generateRandomString(32);
const codeVerifier = generateRandomString(128);
const codeChallenge = generateCodeChallenge(codeVerifier);

const authorizationUrl = `https://www.etsy.com/oauth/connect?` + encode({
  response_type: 'code',
  client_id: clientId,
  redirect_uri: redirectUri,
  scope: scopes.join(' '),
  state,
  code_challenge: codeChallenge,
  code_challenge_method: 'S256',
});

export async function GET(req: NextRequest) {
  console.log('server');
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'User is not authenticated!' }, { status: 401 });
  }
  try {
    await storeEtsyOauthStateByUserId(userId, state, codeVerifier);
    return NextResponse.json({ authorizationUrl });
  } catch (error) {
    console.error('OAuth Error:', error);
    return NextResponse.json({ error: 'OAuth process failed' }, { status: 500 });
  }
}