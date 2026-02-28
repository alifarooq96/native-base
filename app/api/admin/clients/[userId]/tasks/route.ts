import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId } = await params;

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    include: {
      _count: { select: { comments: true, subtasks: true } },
      subtasks: { select: { status: true, credits: true } },
    },
  });

  const grouped: Record<string, typeof tasks> = {
    backlog: [],
    ready_for_dev: [],
    in_progress: [],
    complete: [],
  };

  for (const task of tasks) {
    const col = grouped[task.status];
    if (col) col.push(task);
  }

  return NextResponse.json(grouped);
}
