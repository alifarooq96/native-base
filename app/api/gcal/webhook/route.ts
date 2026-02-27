import { NextResponse } from 'next/server';
import { syncGoogleCalendar } from '@/lib/gcal';

/**
 * Receives push notifications from Google Calendar.
 * Google sends a POST with headers (not a JSON body) when events change.
 * We respond 200 immediately and trigger a background sync.
 */
export async function POST(request: Request) {
  const channelId = request.headers.get('x-goog-channel-id');
  const resourceState = request.headers.get('x-goog-resource-state');

  // Google sends a 'sync' message when the channel is first created — ignore it
  if (resourceState === 'sync') {
    return NextResponse.json({ ok: true });
  }

  console.log(`GCal webhook: state=${resourceState}, channel=${channelId}`);

  // Trigger a full sync in the background (don't block the response)
  syncGoogleCalendar(14).catch((err) =>
    console.error('Webhook-triggered sync failed:', err)
  );

  return NextResponse.json({ ok: true });
}
