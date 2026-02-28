import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      comments: {
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      },
      subtasks: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  if (task.userId !== session.userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(task);
}
