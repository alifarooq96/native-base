import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser, createSessionToken, sessionCookie } from '@/lib/auth';

export async function POST() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, role: true, subscriptionStatus: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const token = await createSessionToken(user.id, user.role, user.subscriptionStatus);
  const cookie = sessionCookie(token);

  const res = NextResponse.json({ ok: true, subscriptionStatus: user.subscriptionStatus });
  res.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    sameSite: cookie.sameSite,
    path: cookie.path,
    maxAge: cookie.maxAge,
  });

  return res;
}
