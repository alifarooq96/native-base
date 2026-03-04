import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AppHeader } from '@/components/AppHeader';
import { AdminSidebar } from '@/components/AdminSidebar';

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
      <AppHeader userName={user.name || 'Admin'} homeHref="/admin/dashboard" hasSubscription />
      <div
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 57px)',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            minHeight: 'calc(100vh - 57px)',
          }}
        >
          <AdminSidebar />
          <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
        </div>
      </div>
    </>
  );
}
