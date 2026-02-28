import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';
import { normalizeName } from '@/lib/normalizeName';
import { createSessionToken, sessionCookie } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const base = process.env.APP_BASE_URL || 'http://localhost:3000';

  if (error || !code) {
    return NextResponse.redirect(
      `${base}/signup?error=${encodeURIComponent(error || 'Missing authorization code')}`
    );
  }

  try {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${base}/api/auth/google-signup/callback`
    );

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: client });
    const { data: profile } = await oauth2.userinfo.get();

    if (!profile.email) {
      return NextResponse.redirect(
        `${base}/signup?error=${encodeURIComponent('Could not retrieve email from Google.')}`
      );
    }

    const normalizedName = normalizeName(profile.name);

    const user = await prisma.user.upsert({
      where: { email: profile.email },
      update: {
        googleId: profile.id || undefined,
        name: normalizedName || undefined,
        avatarUrl: profile.picture || undefined,
      },
      create: {
        email: profile.email,
        googleId: profile.id || null,
        name: normalizedName,
        avatarUrl: profile.picture || null,
      },
    });

    const token = await createSessionToken(user.id);
    const cookie = sessionCookie(token);

    const res = NextResponse.redirect(`${base}/board`);
    res.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite,
      path: cookie.path,
      maxAge: cookie.maxAge,
    });

    return res;
  } catch (err) {
    console.error('Google sign-up callback error:', err);
    return NextResponse.redirect(
      `${base}/signup?error=${encodeURIComponent('Google sign-up failed. Please try again.')}`
    );
  }
}
