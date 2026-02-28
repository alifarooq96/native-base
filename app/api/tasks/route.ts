import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { requireActiveSubscription } from '@/lib/requireSubscription';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId: session.userId },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    include: {
      _count: { select: { comments: true, subtasks: true } },
      subtasks: { select: { status: true } },
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

const FILE_PROXY_PATTERN = /^\/api\/files\/([a-f0-9-]+)$/i;

function extractAttachmentIds(node: Record<string, unknown>): string[] {
  const ids: string[] = [];

  if (node.type === 'image') {
    const src = (node.attrs as Record<string, unknown>)?.src;
    if (typeof src === 'string') {
      const match = src.match(FILE_PROXY_PATTERN);
      if (match) ids.push(match[1]);
    }
  }

  if (Array.isArray(node.marks)) {
    for (const mark of node.marks as Record<string, unknown>[]) {
      if (mark.type === 'link') {
        const href = (mark.attrs as Record<string, unknown>)?.href;
        if (typeof href === 'string') {
          const match = href.match(FILE_PROXY_PATTERN);
          if (match) ids.push(match[1]);
        }
      }
    }
  }

  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      ids.push(...extractAttachmentIds(child as Record<string, unknown>));
    }
  }
  return ids;
}

export async function POST(req: NextRequest) {
  const { error: subError, session } = await requireActiveSubscription();
  if (subError) return subError;
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, priority } = body;

  if (!title?.trim() || !description?.trim()) {
    return NextResponse.json(
      { error: 'Title and description are required' },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.task.aggregate({
    where: { userId: session.userId, status: 'backlog' },
    _max: { order: true },
  });

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description.trim(),
      priority: priority || null,
      order: (maxOrder._max.order ?? -1) + 1,
      userId: session.userId,
    },
  });

  try {
    const doc = JSON.parse(description);
    const attachmentIds = extractAttachmentIds(doc);
    if (attachmentIds.length > 0) {
      await prisma.attachment.updateMany({
        where: {
          id: { in: attachmentIds },
          userId: session.userId,
          taskId: null,
        },
        data: { taskId: task.id },
      });
    }
  } catch {
    // description might be plain text — ignore parse errors
  }

  return NextResponse.json(task, { status: 201 });
}
