import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { startTime: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      date: true,
      startTime: true,
      endTime: true,
      createdAt: true,
    },
  });

  const withStrings = bookings.map((b) => ({
    ...b,
    date: b.date.toISOString().split('T')[0],
    startTime: b.startTime.toISOString(),
    endTime: b.endTime.toISOString(),
    createdAt: b.createdAt.toISOString(),
  }));

  return NextResponse.json(withStrings);
}
