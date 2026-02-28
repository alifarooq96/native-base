import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clients = await prisma.user.findMany({
    where: { role: 'client' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      currentPlan: true,
      subscriptionStatus: true,
      createdAt: true,
      _count: { select: { tasks: true } },
    },
  });

  return NextResponse.json(clients);
}
