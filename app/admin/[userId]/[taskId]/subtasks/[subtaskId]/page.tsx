import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SubTaskDetailView } from '@/components/SubTaskDetailView';

export default async function AdminSubtaskPage({
  params,
}: {
  params: Promise<{ userId: string; taskId: string; subtaskId: string }>;
}) {
  const { userId, taskId, subtaskId } = await params;

  const session = await getSessionUser();
  if (!session || session.role !== 'admin') redirect('/login');

  const adminUser = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });
  if (!adminUser) redirect('/login');

  const client = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });
  if (!client) redirect('/admin');

  const clientName = client.name || client.email;
  const taskHref = `/admin/${userId}/${taskId}`;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <SubTaskDetailView
        taskId={taskId}
        subtaskId={subtaskId}
        taskTitle=""
        backHref={taskHref}
        firstBreadcrumb={{ label: 'Clients', href: '/admin' }}
        isAdmin
        userName={adminUser.name || 'Admin'}
      />
    </div>
  );
}
