import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TaskBoard } from '@/components/TaskBoard';

export default async function Board() {
  const session = await getSessionUser();
  if (!session) redirect('/signup');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  if (!user) redirect('/signup');

  const firstName = user.name?.split(' ')[0] || '';

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '2rem 1.5rem',
      }}
    >
      <h1
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1.5rem',
        }}
      >
        Welcome back{firstName ? `, ${firstName}` : ''}
      </h1>

      <TaskBoard userName={user.name || 'User'} />
    </div>
  );
}
