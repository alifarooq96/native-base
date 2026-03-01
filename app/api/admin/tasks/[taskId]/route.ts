import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';
import { consumeCredits, refundCredits } from '@/lib/credits';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { taskId } = await params;

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      comments: {
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      },
      subtasks: {
        orderBy: { createdAt: 'asc' },
        include: {
          comments: {
            orderBy: { createdAt: 'asc' },
            include: { user: { select: { id: true, name: true, avatarUrl: true } } },
          },
        },
      },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json(task);
}

export async function PATCH(
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

  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
    select: { status: true, credits: true, userId: true, title: true },
  });
  if (!existingTask) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  const data: Record<string, unknown> = {};
  if (body.status !== undefined) data.status = body.status;
  if (body.priority !== undefined) data.priority = body.priority;
  if (body.credits !== undefined) data.credits = body.credits;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const newStatus = body.status as string | undefined;
  const wasComplete = existingTask.status === 'complete';
  const isNowComplete = newStatus === 'complete';

  if (!wasComplete && isNowComplete) {
    const creditsToCharge = existingTask.credits || 0;
    if (creditsToCharge > 0) {
      try {
        await consumeCredits(existingTask.userId, taskId, creditsToCharge, existingTask.title);
      } catch (err) {
        console.warn(`[credits] Could not charge ${creditsToCharge} credits for task ${taskId}: ${err instanceof Error ? err.message : err}`);
      }
    }
  } else if (wasComplete && newStatus && newStatus !== 'complete') {
    const creditsToRefund = existingTask.credits || 0;
    if (creditsToRefund > 0) {
      try {
        await refundCredits(existingTask.userId, taskId, creditsToRefund, existingTask.title);
      } catch {
        console.error(`Failed to refund credits for task ${taskId}`);
      }
    }
  }

  const task = await prisma.task.update({
    where: { id: taskId },
    data,
  });

  return NextResponse.json(task);
}
