import { prisma } from './prisma';

export type Slot = {
  date: string;
  startTime: string;
  endTime: string;
};

type TimeRange = { start: Date; end: Date };

function rangesOverlap(a: TimeRange, b: TimeRange): boolean {
  return a.start < b.end && a.end > b.start;
}

/**
 * Build the list of wall-clock hours to iterate for a day.
 * Handles cross-midnight windows (e.g. startHour=15, endHour=1 → [15,16,...,23,0]).
 */
function getHourRange(startHour: number, endHour: number): number[] {
  const hours: number[] = [];
  if (startHour < endHour) {
    for (let h = startHour; h < endHour; h++) hours.push(h);
  } else {
    for (let h = startHour; h < 24; h++) hours.push(h);
    for (let h = 0; h < endHour; h++) hours.push(h);
  }
  return hours;
}

export async function getAvailableSlots(
  fromDate: Date,
  toDate: Date
): Promise<Slot[]> {
  const config = await prisma.bookingConfig.findUnique({
    where: { id: 'default' },
  });

  if (!config) {
    throw new Error('BookingConfig not found. Run the seed script first.');
  }

  const {
    timezone,
    slotDurationMin,
    startHour,
    endHour,
    workingDays,
    minNoticeHours,
    instantBookStart,
    instantBookEnd,
    bufferMinutes,
  } = config;

  const crossesMidnight = startHour >= endHour;

  const queryFrom = new Date(fromDate);
  queryFrom.setDate(queryFrom.getDate() - 1);
  const queryTo = new Date(toDate);
  queryTo.setDate(queryTo.getDate() + 1);

  const [bookings, blockedPeriods] = await Promise.all([
    prisma.booking.findMany({
      where: {
        startTime: { lte: queryTo },
        endTime: { gte: queryFrom },
      },
      select: { startTime: true, endTime: true },
    }),
    prisma.blockedPeriod.findMany({
      where: {
        startTime: { lte: queryTo },
        endTime: { gte: queryFrom },
      },
      select: { startTime: true, endTime: true },
    }),
  ]);

  const busyRanges: TimeRange[] = [
    ...bookings.map((b) => ({ start: b.startTime, end: b.endTime })),
    ...blockedPeriods.map((b) => ({ start: b.startTime, end: b.endTime })),
  ];

  const now = new Date();
  const noticeThreshold = new Date(
    now.getTime() + minNoticeHours * 60 * 60 * 1000
  );

  const slots: Slot[] = [];
  const stepMinutes = slotDurationMin + bufferMinutes;
  const hours = getHourRange(startHour, endHour);
  const effectiveEndHour = endHour;
  const tzOffsetMs = getTimezoneOffsetMs(timezone);

  const current = new Date(fromDate);
  while (current <= toDate) {
    const dayOfWeek = current.getDay() === 0 ? 7 : current.getDay();

    if (!workingDays.includes(dayOfWeek)) {
      current.setDate(current.getDate() + 1);
      continue;
    }

    const dateStr = current.toISOString().split('T')[0];

    for (const hour of hours) {
      const isNextDay = crossesMidnight && hour < startHour;
      let slotDateStr = dateStr;
      if (isNextDay) {
        const nextDay = new Date(current);
        nextDay.setDate(nextDay.getDate() + 1);
        slotDateStr = nextDay.toISOString().split('T')[0];
      }

      for (let min = 0; min < 60; min += stepMinutes) {
        // Build the wall-clock time as a UTC Date, then shift by timezone offset
        const [y, m, d] = slotDateStr.split('-').map(Number);
        const wallClockUtcMs = Date.UTC(y, m - 1, d, hour, min, 0);
        const slotStartUtc = new Date(wallClockUtcMs - tzOffsetMs);
        const slotEndUtc = new Date(
          slotStartUtc.getTime() + slotDurationMin * 60 * 1000
        );

        // Ensure slot ends within the working window
        if (!crossesMidnight) {
          const slotEndWallMinutes = hour * 60 + min + slotDurationMin;
          if (slotEndWallMinutes > effectiveEndHour * 60) continue;
        }
        if (crossesMidnight && isNextDay) {
          if (hour === effectiveEndHour - 1 && min + slotDurationMin > 60) continue;
          if (hour >= effectiveEndHour) continue;
        }

        if (slotStartUtc < noticeThreshold) {
          const inInstantWindow =
            instantBookStart != null &&
            instantBookEnd != null &&
            isHourInWindow(hour, instantBookStart, instantBookEnd);

          if (!inInstantWindow) continue;
          if (slotStartUtc < now) continue;
        }

        const candidate: TimeRange = { start: slotStartUtc, end: slotEndUtc };

        const isBlocked = busyRanges.some((busy) =>
          rangesOverlap(candidate, busy)
        );
        if (isBlocked) continue;

        slots.push({
          date: dateStr,
          startTime: slotStartUtc.toISOString(),
          endTime: slotEndUtc.toISOString(),
        });
      }
    }

    current.setDate(current.getDate() + 1);
  }

  return slots;
}

function isHourInWindow(hour: number, windowStart: number, windowEnd: number): boolean {
  if (windowStart < windowEnd) {
    return hour >= windowStart && hour < windowEnd;
  }
  return hour >= windowStart || hour < windowEnd;
}

/**
 * Get the UTC offset in milliseconds for a timezone.
 * Uses Intl.DateTimeFormat.formatToParts to reliably extract parts
 * without the hour-24 bug that affects format().
 */
function getTimezoneOffsetMs(tz: string): number {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const get = (type: string) => {
    const part = parts.find((p) => p.type === type);
    return part ? parseInt(part.value, 10) : 0;
  };

  const year = get('year');
  const month = get('month');
  const day = get('day');
  let hour = get('hour');
  if (hour === 24) hour = 0;
  const minute = get('minute');
  const second = get('second');

  const tzAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  const utcMs = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );

  return tzAsUtc - utcMs;
}
