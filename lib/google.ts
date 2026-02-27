import { google } from 'googleapis';
import { prisma } from './prisma';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export function getAuthUrl(): string {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });
}

export async function getAuthedClient() {
  const token = await prisma.adminToken.findUnique({
    where: { id: 'google_calendar' },
  });

  if (!token) {
    throw new Error('Google Calendar not connected. Visit /api/auth/google to connect.');
  }

  const client = getOAuth2Client();
  client.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
    expiry_date: token.expiresAt.getTime(),
  });

  client.on('tokens', async (tokens) => {
    await prisma.adminToken.update({
      where: { id: 'google_calendar' },
      data: {
        accessToken: tokens.access_token ?? token.accessToken,
        refreshToken: tokens.refresh_token ?? token.refreshToken,
        expiresAt: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : token.expiresAt,
      },
    });
  });

  return client;
}
