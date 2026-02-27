import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.APP_BASE_URL}/api/auth/google-signup/callback`
  );

  const url = client.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    prompt: 'select_account',
  });

  return NextResponse.redirect(url);
}
