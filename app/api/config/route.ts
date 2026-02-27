import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let config = await prisma.bookingConfig.findUnique({
      where: { id: 'default' },
    });

    if (!config) {
      config = await prisma.bookingConfig.create({
        data: { id: 'default' },
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to fetch config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch config' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const allowedFields = [
      'timezone',
      'slotDurationMin',
      'startHour',
      'endHour',
      'workingDays',
      'minNoticeHours',
      'instantBookStart',
      'instantBookEnd',
      'bufferMinutes',
    ];

    const data: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    const config = await prisma.bookingConfig.upsert({
      where: { id: 'default' },
      update: data,
      create: { id: 'default', ...data },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to update config:', error);
    return NextResponse.json(
      { error: 'Failed to update config' },
      { status: 500 }
    );
  }
}
