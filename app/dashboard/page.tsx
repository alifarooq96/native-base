import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Dashboard() {
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
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        backgroundColor: 'var(--bg)',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text)',
        }}
      >
        Welcome{firstName ? `, ${firstName}` : ''}
      </h1>
    </div>
  );
}
