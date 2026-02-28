import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TaskBoard } from '@/components/TaskBoard';

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
