import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AppHeader } from '@/components/AppHeader';

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();
  if (!session) redirect('/signup');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  if (!user) redirect('/signup');

  return (
    <>
      <AppHeader userName={user.name || 'User'} />
      <main>{children}</main>
    </>
  );
}
