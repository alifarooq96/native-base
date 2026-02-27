import { NextResponse } from 'next/server';
import { registerWebhook } from '@/lib/gcal';

/**
 * Register a Google Calendar webhook for push notifications.
 * Call this once after deploying to a public URL.
 * The channel lasts 7 days by default — call again to renew.
 */
export async function POST() {
  try {
    const result = await registerWebhook(168);
    return NextResponse.json({
      message: 'Webhook registered. Google will push notifications for 7 days.',
      ...result,
    });
  } catch (error) {
    console.error('Failed to register webhook:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to register webhook';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
