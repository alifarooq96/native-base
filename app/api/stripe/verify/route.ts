import { NextResponse } from 'next/server';
import { getSessionUser, createSessionToken, sessionCookie } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      role: true,
      subscriptionStatus: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // If already active in DB, just refresh the token
  if (user.subscriptionStatus === 'active') {
    const token = await createSessionToken(user.id, user.role, 'active');
    const cookie = sessionCookie(token);
    const res = NextResponse.json({ subscriptionStatus: 'active', userId: user.id });
    res.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite,
      path: cookie.path,
      maxAge: cookie.maxAge,
    });
    return res;
  }

  // Not active in DB yet — check Stripe directly
  if (!user.stripeCustomerId) {
    return NextResponse.json({ subscriptionStatus: null });
  }

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      const sub = subscriptions.data[0];
      const periodEnd = sub.items.data[0]?.current_period_end;

      // Determine plan from price
      const priceId = sub.items.data[0]?.price?.id;
      let plan: string | null = null;
      if (priceId === process.env.STRIPE_STARTER_PRICE_ID) plan = 'starter';
      else if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = 'pro';

      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeSubscriptionId: sub.id,
          subscriptionStatus: 'active',
          currentPlan: plan,
          subscriptionCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
        },
      });

      const token = await createSessionToken(user.id, user.role, 'active');
      const cookie = sessionCookie(token);
      const res = NextResponse.json({ subscriptionStatus: 'active', userId: user.id });
      res.cookies.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        path: cookie.path,
        maxAge: cookie.maxAge,
      });
      return res;
    }
  } catch (err) {
    console.error('[stripe/verify] Error checking Stripe:', err);
  }

  return NextResponse.json({ subscriptionStatus: user.subscriptionStatus });
}
