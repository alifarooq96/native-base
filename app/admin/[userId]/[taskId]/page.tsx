import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TaskBoard } from '@/components/TaskBoard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string; taskId: string }>;
}): Promise<Metadata> {
  const { userId, taskId } = await params;
  const [client, task] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { name: true, email: true } }),
    prisma.task.findUnique({ where: { id: taskId }, select: { title: true } }),
  ]);
  const clientLabel = client?.name || client?.email || 'Client';
  const taskLabel = task?.title || 'Task';
  return { title: `Admin — ${clientLabel} — ${taskLabel}` };
}

export default async function AdminClientTask({
  params,
}: {
  params: Promise<{ userId: string; taskId: string }>;
}) {
  const { userId, taskId } = await params;

  const session = await getSessionUser();
  if (!session || session.role !== 'admin') redirect('/login');

  const client = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });

  if (!client) redirect('/admin');

  const adminUser = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '2rem 1.5rem',
      }}
    >
      <TaskBoard
        isAdmin
        forUserId={userId}
        clientName={client.name || client.email}
        initialTaskId={taskId}
        userName={adminUser?.name || 'Admin'}
      />
    </div>
  );
}
