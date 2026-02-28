import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SubTaskDetailView } from '@/components/SubTaskDetailView';

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
