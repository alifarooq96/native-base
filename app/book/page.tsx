import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BookPageClient } from '@/components/BookPageClient';

export const metadata: Metadata = { title: 'Book a Call' };

export default async function BookPage() {
  const session = await getSessionUser();
  if (!session) redirect('/signup');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, email: true },
  });

  if (!user) redirect('/signup');

  return (
    <BookPageClient
      userName={user.name || ''}
      userEmail={user.email}
    />
  );
}
