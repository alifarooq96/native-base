import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireActiveSubscription } from '@/lib/requireSubscription';
import { PLAN_CONFIG } from '@/lib/credits';

export async function GET() {
  const { error, session } = await requireActiveSubscription();
  if (error) return error;
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      creditBalance: true,
      creditRollover: true,
      currentPlan: true,
      lastCreditRefresh: true,
      subscriptionCurrentPeriodEnd: true,
    },
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const planConfig = user.currentPlan ? PLAN_CONFIG[user.currentPlan] : null;

  const ledger = await prisma.creditLedger.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      amount: true,
      type: true,
      description: true,
      balanceAfter: true,
      createdAt: true,
    },
  });

  const usedThisCycle = await prisma.creditLedger.aggregate({
    where: {
      userId: session.userId,
      type: 'task_completed',
      createdAt: user.lastCreditRefresh ? { gte: user.lastCreditRefresh } : undefined,
    },
    _sum: { amount: true },
  });

  return NextResponse.json({
    balance: user.creditBalance,
    rollover: user.creditRollover,
    plan: user.currentPlan,
    monthlyAllowance: planConfig?.monthlyCredits ?? 0,
    maxRollover: planConfig?.maxRollover ?? 0,
    usedThisCycle: Math.abs(usedThisCycle._sum.amount ?? 0),
    lastRefresh: user.lastCreditRefresh,
    nextRefresh: user.subscriptionCurrentPeriodEnd,
    ledger,
  });
}
