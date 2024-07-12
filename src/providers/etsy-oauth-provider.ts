
import { OAuthConfig } from 'next-auth/providers';

const HOST = 'https://etsy.com';
const TOKEN_HOST = 'https://api.etsy.com';
const AUTHORIZE_PATH = '/oauth/connect';
const TOKEN_PATH = '/v3/public/oauth/token';
const SCOPE = ['transactions_r', 'transactions_w'];
const USER_INFO_PATH = '/v3/public/users/me';
const REDIRECT_URI = "/api/auth/callback/etsy"

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

function Etsy(): OAuthConfig<any> {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateRandomString(32);

  return {
    id: 'etsy',
    name: 'Etsy',
    type: 'oauth',
    authorization: {
      url: HOST + AUTHORIZE_PATH,
      params: {
        response_type: 'code',
        client_id: process.env.AUTH_ETSY_ID!,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/etsy`,
        scope: SCOPE.join(' '),
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      },
    },
    token: {
      url: `${TOKEN_HOST}${TOKEN_PATH}`,
      async request(context: any) {
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', process.env.AUTH_ETSY_ID!);
        params.append('redirect_uri', `${process.env.NEXTAUTH_URL}${REDIRECT_URI}`);
        params.append('code', context.params.code);
        params.append('code_verifier', codeVerifier);

        const res = await fetch(`${TOKEN_HOST}${TOKEN_PATH}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        });

        const data = await res.json();
        return { tokens: data };
      },
    },
    userinfo: {
      url: `${TOKEN_HOST}${USER_INFO_PATH}`,
      async request(context: any) {
        const res = await fetch(`${TOKEN_HOST}${USER_INFO_PATH}`, {
          headers: {
            'Authorization': `Bearer ${context.tokens.access_token}`,
          },
        });
        const profile = await res.json();
        return { profile };
      },
    },
    clientId: process.env.AUTH_ETSY_ID!,
    clientSecret: process.env.AUTH_ETSY_SECRET!,
    async profile(profile, token) {
      console.log('profile', profile);
      return {
        id: profile.user_id,
        name: profile.login_name,
        email: profile.email,
      };
    },
  };
}

export default Etsy;