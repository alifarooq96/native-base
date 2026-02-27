import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createCalendarEvent } from '@/lib/gcal';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, startTime, endTime, date } = body;

    if (!name || !email || !startTime || !endTime || !date) {
      return NextResponse.json(
        { error: 'name, email, date, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    const slotStart = new Date(startTime);
    const slotEnd = new Date(endTime);
    const slotDate = new Date(date);

    if (isNaN(slotStart.getTime()) || isNaN(slotEnd.getTime()) || isNaN(slotDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date/time format' },
        { status: 400 }
      );
    }

    const overlap = await prisma.booking.findFirst({
      where: {
        startTime: { lt: slotEnd },
        endTime: { gt: slotStart },
      },
    });

    if (overlap) {
      return NextResponse.json(
        { error: 'This time slot is no longer available' },
        { status: 409 }
      );
    }

    const blocked = await prisma.blockedPeriod.findFirst({
      where: {
        startTime: { lt: slotEnd },
        endTime: { gt: slotStart },
      },
    });

    if (blocked) {
      return NextResponse.json(
        { error: 'This time slot is blocked' },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        company: company || null,
        date: slotDate,
        startTime: slotStart,
        endTime: slotEnd,
      },
    });

    // Create Google Calendar event (best-effort)
    let gcalEventId: string | null = null;
    try {
      gcalEventId = await createCalendarEvent({
        name: booking.name,
        email: booking.email,
        startTime: booking.startTime,
        endTime: booking.endTime,
      });

      if (gcalEventId) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { gcalEventId },
        });
      }
    } catch {
      // GCal not connected or failed — booking still succeeds
    }

    return NextResponse.json(
      { ...booking, gcalEventId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking failed:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create booking';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
