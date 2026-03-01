import { prisma } from './prisma';

export const PLAN_CONFIG: Record<string, { monthlyCredits: number; maxRollover: number }> = {
  starter: { monthlyCredits: 10, maxRollover: 20 },
  pro: { monthlyCredits: 25, maxRollover: 50 },
};

/**
 * Issue monthly credits to a user. Rolls over unused credits (capped per plan),
 * then adds the fresh monthly allocation. Idempotent per billing period.
 */
export async function refreshCreditsForUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      currentPlan: true,
      creditBalance: true,
      creditRollover: true,
      lastCreditRefresh: true,
      subscriptionStatus: true,
      subscriptionCurrentPeriodEnd: true,
    },
  });

  if (!user || user.subscriptionStatus !== 'active' || !user.currentPlan) return null;

  const config = PLAN_CONFIG[user.currentPlan];
  if (!config) return null;

  const now = new Date();
  if (user.lastCreditRefresh) {
    const lastRefresh = new Date(user.lastCreditRefresh);
    const msSinceRefresh = now.getTime() - lastRefresh.getTime();
    const daysSinceRefresh = msSinceRefresh / (1000 * 60 * 60 * 24);
    if (daysSinceRefresh < 25) return null;
  }

  const rolledOver = Math.min(user.creditBalance, config.maxRollover);
  const newBalance = rolledOver + config.monthlyCredits;

  const [updatedUser] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        creditBalance: newBalance,
        creditRollover: rolledOver,
        lastCreditRefresh: now,
      },
    }),
    ...(rolledOver < user.creditBalance
      ? [
          prisma.creditLedger.create({
            data: {
              userId,
              amount: -(user.creditBalance - rolledOver),
              type: 'rollover_cap',
              description: `Excess credits expired (cap: ${config.maxRollover})`,
              balanceAfter: rolledOver,
            },
          }),
        ]
      : []),
    prisma.creditLedger.create({
      data: {
        userId,
        amount: config.monthlyCredits,
        type: 'monthly_refresh',
        description: `Monthly ${config.monthlyCredits} credits (${user.currentPlan} plan)`,
        balanceAfter: newBalance,
      },
    }),
  ]);

  return updatedUser;
}

/**
 * Issue initial credits when a user first subscribes.
 */
export async function issueInitialCredits(userId: string, plan: string) {
  const config = PLAN_CONFIG[plan];
  if (!config) return;

  const now = new Date();

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        creditBalance: config.monthlyCredits,
        creditRollover: 0,
        lastCreditRefresh: now,
      },
    }),
    prisma.creditLedger.create({
      data: {
        userId,
        amount: config.monthlyCredits,
        type: 'initial',
        description: `Initial ${config.monthlyCredits} credits (${plan} plan)`,
        balanceAfter: config.monthlyCredits,
      },
    }),
  ]);
}

/**
 * Consume credits when a task is marked as completed.
 * Returns the updated balance or throws if insufficient credits.
 */
export async function consumeCredits(userId: string, taskId: string, credits: number, taskTitle: string) {
  if (credits <= 0) return;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { creditBalance: true },
  });

  if (!user) throw new Error('User not found');
  if (user.creditBalance < credits) {
    throw new Error(`Insufficient credits: has ${user.creditBalance}, needs ${credits}`);
  }

  const newBalance = user.creditBalance - credits;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { creditBalance: newBalance },
    }),
    prisma.creditLedger.create({
      data: {
        userId,
        amount: -credits,
        type: 'task_completed',
        description: `Task completed: ${taskTitle}`,
        taskId,
        balanceAfter: newBalance,
      },
    }),
  ]);

  return newBalance;
}

/**
 * Refund credits when a task is moved back from completed.
 */
export async function refundCredits(userId: string, taskId: string, credits: number, taskTitle: string) {
  if (credits <= 0) return;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { creditBalance: true },
  });

  if (!user) throw new Error('User not found');

  const newBalance = user.creditBalance + credits;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { creditBalance: newBalance },
    }),
    prisma.creditLedger.create({
      data: {
        userId,
        amount: credits,
        type: 'refund',
        description: `Task reopened: ${taskTitle}`,
        taskId,
        balanceAfter: newBalance,
      },
    }),
  ]);

  return newBalance;
}
