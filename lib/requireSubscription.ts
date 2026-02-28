import { NextResponse } from 'next/server';
import { getSessionUser } from './auth';
import { prisma } from './prisma';

export async function requireActiveSubscription() {
  const session = await getSessionUser();
  if (!session) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), session: null };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { subscriptionStatus: true },
  });

  if (user?.subscriptionStatus !== 'active') {
    return {
      error: NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      ),
      session,
    };
  }

  return { error: null, session };
}
