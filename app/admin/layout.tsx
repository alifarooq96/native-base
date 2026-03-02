import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AppHeader } from '@/components/AppHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();
  if (!session || session.role !== 'admin') redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  if (!user) redirect('/login');

  return (
    <>
      <AppHeader userName={user.name || 'Admin'} homeHref="/admin" hasSubscription />
      <main>{children}</main>
    </>
  );
}
