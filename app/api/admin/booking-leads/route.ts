import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [leads, bookingEmails] = await Promise.all([
    prisma.bookingLead.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        description: true,
        source: true,
        createdAt: true,
      },
    }),
    prisma.booking.findMany({ select: { email: true } }),
  ]);

  const bookedEmailSet = new Set(bookingEmails.map((b) => b.email.toLowerCase()));

  const withBooked = leads.map((lead) => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    hasBooked: bookedEmailSet.has(lead.email.toLowerCase()),
  }));

  return NextResponse.json(withBooked);
}
