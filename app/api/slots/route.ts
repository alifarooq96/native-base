import { NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/slots';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');

  const from = fromParam ? new Date(fromParam) : new Date();
  const to = toParam
    ? new Date(toParam)
    : new Date(from.getTime() + 14 * 24 * 60 * 60 * 1000);

  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    return NextResponse.json(
      { error: 'Invalid date format. Use YYYY-MM-DD.' },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(from, to);
    return NextResponse.json(slots);
  } catch (error) {
    console.error('Failed to fetch slots:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to fetch slots';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
