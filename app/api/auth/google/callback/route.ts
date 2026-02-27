import { NextResponse } from 'next/server';
import { getOAuth2Client } from '@/lib/google';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Missing authorization code' },
      { status: 400 }
    );
  }

  try {
    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      return NextResponse.json(
        { error: 'Failed to obtain tokens. Try again with consent prompt.' },
        { status: 400 }
      );
    }

    await prisma.adminToken.upsert({
      where: { id: 'google_calendar' },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : new Date(Date.now() + 3600 * 1000),
      },
      create: {
        id: 'google_calendar',
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : new Date(Date.now() + 3600 * 1000),
      },
    });

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Google OAuth callback failed:', error);
    return NextResponse.json(
      { error: 'OAuth callback failed' },
      { status: 500 }
    );
  }
}
