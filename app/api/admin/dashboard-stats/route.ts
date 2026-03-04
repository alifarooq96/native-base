import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

const DAYS = 7;

function getLast7DayRanges(): { dateStr: string; gte: Date; lt: Date }[] {
  const ranges: { dateStr: string; gte: Date; lt: Date }[] = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    d.setUTCHours(0, 0, 0, 0);
    const dateStr = d.toISOString().slice(0, 10);
    const gte = new Date(d);
    const lt = new Date(d);
    lt.setUTCDate(lt.getUTCDate() + 1);
    ranges.push({ dateStr, gte, lt });
  }
  return ranges;
}

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ranges = getLast7DayRanges();

  const [leadsByDay, bookingsByDay, tasksCreatedByDay, tasksCompletedByDay] = await Promise.all([
    prisma.bookingLead.findMany({
      where: {
        createdAt: {
          gte: ranges[0].gte,
          lt: ranges[ranges.length - 1].lt,
        },
      },
      select: { createdAt: true },
    }),
    prisma.booking.findMany({
      where: {
        createdAt: {
          gte: ranges[0].gte,
          lt: ranges[ranges.length - 1].lt,
        },
      },
      select: { createdAt: true },
    }),
    prisma.task.findMany({
      where: {
        createdAt: {
          gte: ranges[0].gte,
          lt: ranges[ranges.length - 1].lt,
        },
      },
      select: { createdAt: true },
    }),
    prisma.creditLedger.findMany({
      where: {
        type: 'task_completed',
        createdAt: {
          gte: ranges[0].gte,
          lt: ranges[ranges.length - 1].lt,
        },
      },
      select: { createdAt: true },
    }),
  ]);

  function bucketByDay(items: { createdAt: Date }[]): Record<string, number> {
    const buckets: Record<string, number> = {};
    for (const r of ranges) buckets[r.dateStr] = 0;
    for (const item of items) {
      const dateStr = item.createdAt.toISOString().slice(0, 10);
      if (dateStr in buckets) buckets[dateStr]++;
    }
    return buckets;
  }

  const leadsBuckets = bucketByDay(leadsByDay);
  const bookingsBuckets = bucketByDay(bookingsByDay);
  const tasksCreatedBuckets = bucketByDay(tasksCreatedByDay);
  const tasksCompletedBuckets = bucketByDay(tasksCompletedByDay);

  const days = ranges.map(({ dateStr }) => ({
    date: dateStr,
    leads: leadsBuckets[dateStr] ?? 0,
    opportunities: bookingsBuckets[dateStr] ?? 0,
    tasksCreated: tasksCreatedBuckets[dateStr] ?? 0,
    tasksCompleted: tasksCompletedBuckets[dateStr] ?? 0,
  }));

  return NextResponse.json({ days });
}
