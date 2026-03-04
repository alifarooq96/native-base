import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, description, source } = body;

    if (!name || !email || typeof name !== 'string' || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'name and email are required' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedName || !trimmedEmail) {
      return NextResponse.json(
        { error: 'name and email are required' },
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
