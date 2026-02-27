import { google, calendar_v3 } from 'googleapis';
import { prisma } from './prisma';
import { getAuthedClient } from './google';
import { randomUUID } from 'crypto';

function getCalendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID || 'primary';
}

/**
 * Full sync: pull Google Calendar events into BlockedPeriods,
 * and reconcile bookings whose GCal events were deleted.
 */
export async function syncGoogleCalendar(days: number = 14): Promise<{
  synced: number;
  cancelled: number;
}> {
  const auth = await getAuthedClient();
  const calendar = google.calendar({ version: 'v3', auth });

  const now = new Date();
  const until = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  const response = await calendar.events.list({
    calendarId: getCalendarId(),
    timeMin: now.toISOString(),
    timeMax: until.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items || [];
  const gcalEventIds = new Set(events.map((e) => e.id).filter(Boolean));

  // --- Sync blocked periods ---
  await prisma.blockedPeriod.deleteMany({
    where: {
      source: 'google_calendar',
      startTime: { gte: now },
      endTime: { lte: until },
    },
  });

  let synced = 0;
  for (const event of events) {
    const start = event.start?.dateTime || event.start?.date;
    const end = event.end?.dateTime || event.end?.date;
    if (!start || !end) continue;

    await prisma.blockedPeriod.create({
      data: {
        startTime: new Date(start),
        endTime: new Date(end),
        reason: event.summary || 'Google Calendar event',
        source: 'google_calendar',
        gcalId: event.id || undefined,
      },
    });
    synced++;
  }

  // --- Reconcile bookings: cancel those whose GCal event was deleted ---
  const bookingsWithGcal = await prisma.booking.findMany({
    where: {
      gcalEventId: { not: null },
      startTime: { gte: now },
    },
    select: { id: true, gcalEventId: true },
  });

  let cancelled = 0;
  for (const booking of bookingsWithGcal) {
    if (booking.gcalEventId && !gcalEventIds.has(booking.gcalEventId)) {
      // Verify the event is truly gone or cancelled
      let shouldDelete = false;
      try {
        const eventRes = await calendar.events.get({
          calendarId: getCalendarId(),
          eventId: booking.gcalEventId,
        });
        // Google returns deleted events with status "cancelled"
        if (eventRes.data.status === 'cancelled') {
          shouldDelete = true;
        }
      } catch {
        // 404 — event doesn't exist at all
        shouldDelete = true;
      }

      if (shouldDelete) {
        await prisma.booking.delete({ where: { id: booking.id } });
        cancelled++;
      }
    }
  }

  return { synced, cancelled };
}

/**
 * Create a Google Calendar event for a booking.
 * Returns the created event ID.
 */
export async function createCalendarEvent(booking: {
  name: string;
  email: string;
  startTime: Date;
  endTime: Date;
}): Promise<string | null> {
  try {
    const auth = await getAuthedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const event: calendar_v3.Schema$Event = {
      summary: `Native Base – Intro call with ${booking.name}`,
      description: `Booking from ${booking.email}`,
      start: {
        dateTime: booking.startTime.toISOString(),
      },
      end: {
        dateTime: booking.endTime.toISOString(),
      },
      attendees: [{ email: booking.email }],
      conferenceData: {
        createRequest: {
          requestId: `nb-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      guestsCanModify: false,
      guestsCanSeeOtherGuests: false,
    };

    const response = await calendar.events.insert({
      calendarId: getCalendarId(),
      requestBody: event,
      sendUpdates: 'all',
      conferenceDataVersion: 1,
    });

    return response.data.id || null;
  } catch (error) {
    console.error('Failed to create Google Calendar event:', error);
    return null;
  }
}

/**
 * Register a webhook channel for push notifications from Google Calendar.
 * Google will POST to APP_BASE_URL/api/gcal/webhook when events change.
 * Channels expire after `ttlHours` and must be renewed.
 */
export async function registerWebhook(ttlHours: number = 168): Promise<{
  channelId: string;
  expiration: string;
}> {
  const auth = await getAuthedClient();
  const calendar = google.calendar({ version: 'v3', auth });

  const channelId = randomUUID();
  const baseUrl = process.env.APP_BASE_URL;
  if (!baseUrl) {
    throw new Error('APP_BASE_URL environment variable is not set');
  }

  const expiration = Date.now() + ttlHours * 60 * 60 * 1000;

  const response = await calendar.events.watch({
    calendarId: getCalendarId(),
    requestBody: {
      id: channelId,
      type: 'web_hook',
      address: `${baseUrl}/api/gcal/webhook`,
      expiration: String(expiration),
    },
  });

  return {
    channelId: response.data.id || channelId,
    expiration: response.data.expiration || String(expiration),
  };
}

/**
 * Stop an existing webhook channel.
 */
export async function stopWebhook(channelId: string, resourceId: string): Promise<void> {
  const auth = await getAuthedClient();
  const calendar = google.calendar({ version: 'v3', auth });

  await calendar.channels.stop({
    requestBody: {
      id: channelId,
      resourceId,
    },
  });
}
