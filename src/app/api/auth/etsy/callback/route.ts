import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('GETT', req);
}
export async function POST(req: NextRequest) {
  console.log('PPOSTT', req);
}