import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SubTaskDetailView } from '@/components/SubTaskDetailView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; subtaskId: string }>;
}): Promise<Metadata> {
  const { subtaskId } = await params;
  const subtask = await prisma.subTask.findUnique({
    where: { id: subtaskId },
    select: { title: true },
  });
  return { title: subtask ? `Subtask — ${subtask.title}` : 'Subtask Details' };
}

export default async function BoardSubtaskPage({
  params,
}: {
  params: Promise<{ id: string; subtaskId: string }>;
}) {
  const { id: taskId, subtaskId } = await params;

  const session = await getSessionUser();
  if (!session) redirect('/signup');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });
  if (!user) redirect('/signup');

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <SubTaskDetailView
        taskId={taskId}
        subtaskId={subtaskId}
        taskTitle=""
        backHref={`/board/${taskId}`}
        firstBreadcrumb={{ label: 'Board', href: '/board' }}
        isAdmin={false}
        userName={user.name || 'User'}
      />
    </div>
  );
}
