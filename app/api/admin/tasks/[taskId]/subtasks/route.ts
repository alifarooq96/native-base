import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { taskId } = await params;
  const body = await req.json();
  const { title, credits } = body;

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const task = await prisma.task.findUnique({ where: { id: taskId }, select: { id: true } });
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  const subtask = await prisma.subTask.create({
    data: {
      title: title.trim(),
      credits: credits != null ? parseInt(credits, 10) : null,
      taskId,
    },
  });

  return NextResponse.json(subtask, { status: 201 });
}
