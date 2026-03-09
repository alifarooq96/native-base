import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function inferNameFromEmail(email: string) {
  const localPart = email.split('@')[0] ?? '';
  const cleaned = localPart
    .replace(/[._-]+/g, ' ')
    .replace(/\d+/g, ' ')
    .trim();

  if (!cleaned) return 'Automation Audit Lead';

  return cleaned
    .split(/\s+/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, description, source } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'email is required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName =
      typeof name === 'string' && name.trim()
        ? name.trim()
        : inferNameFromEmail(trimmedEmail);

    if (!trimmedEmail) {
      return NextResponse.json(
        { error: 'email is required' },
        { status: 400 }
      );
    }

    const lead = await prisma.bookingLead.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        company: company && typeof company === 'string' ? company.trim() || null : null,
        description: description && typeof description === 'string' ? description.trim() || null : null,
        source: source && typeof source === 'string' ? source : null,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Booking lead failed:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to save details';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
