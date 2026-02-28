import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AppHeader } from '@/components/AppHeader';
import { SubscribeOverlay } from '@/components/SubscribeOverlay';

export default async function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionUser();
  if (!session) redirect('/signup');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, subscriptionStatus: true },
  });

  if (!user) redirect('/signup');

  const hasActiveSub = user.subscriptionStatus === 'active';

  return (
    <>
      <AppHeader userName={user.name || 'User'} />
      <div style={{ position: 'relative', minHeight: 'calc(100vh - 60px)' }}>
        <div
          style={{
            ...(hasActiveSub
              ? {}
              : {
                  filter: 'blur(5px)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  overflow: 'hidden',
                  maxHeight: 'calc(100vh - 60px)',
                }),
          }}
        >
          <main>{children}</main>
        </div>
        {!hasActiveSub && <SubscribeOverlay />}
      </div>
    </>
  );
}
