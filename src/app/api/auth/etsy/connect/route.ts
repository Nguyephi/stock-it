import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/etsy-oauth';

export async function GET(req: NextRequest, res: NextResponse) {
  console.log('server');
  const authorizationUri = client.authorizeURL({
    redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/etsy/callback',
    scope: 'profile_r email_r',
    state: 'some-random-string',
  });

  return NextResponse.json({
    authorizationUrl: authorizationUri,
  });
}