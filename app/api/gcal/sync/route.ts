import { NextResponse } from 'next/server';
import { syncGoogleCalendar } from '@/lib/gcal';

export async function POST() {
  try {
    const result = await syncGoogleCalendar(14);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Google Calendar sync failed:', error);
    const message =
      error instanceof Error ? error.message : 'Sync failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
