import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ subtaskId: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { subtaskId } = await params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.status !== undefined) data.status = body.status;
  if (body.credits !== undefined) data.credits = body.credits != null ? parseInt(body.credits, 10) : null;
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const subtask = await prisma.subTask.update({
    where: { id: subtaskId },
    data,
  });

  return NextResponse.json(subtask);
}
