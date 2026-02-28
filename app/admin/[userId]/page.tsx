import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TaskBoard } from '@/components/TaskBoard';

export default async function AdminClientBoard({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

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
        userName={adminUser?.name || 'Admin'}
      />
    </div>
  );
}
