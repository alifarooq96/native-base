import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';
import { issueInitialCredits, PLAN_CONFIG } from '@/lib/credits';

/**
 * POST: Issue/refresh credits for a user (admin only).
 * Body: { userId: string }
 * Useful for users who subscribed before the credit system was deployed.
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currentPlan: true, creditBalance: true, lastCreditRefresh: true, subscriptionStatus: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!user.currentPlan || !PLAN_CONFIG[user.currentPlan]) {
    return NextResponse.json({ error: 'User has no recognized plan' }, { status: 400 });
  }

  if (!user.lastCreditRefresh) {
    await issueInitialCredits(userId, user.currentPlan);
  }

  const updated = await prisma.user.findUnique({
    where: { id: userId },
    select: { creditBalance: true, creditRollover: true, lastCreditRefresh: true },
  });

  return NextResponse.json({ ok: true, ...updated });
}
