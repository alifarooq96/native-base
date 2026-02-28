import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        const plan = session.metadata?.plan || null;
        const userId = session.metadata?.userId || null;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const periodEnd = subscription.items.data[0]?.current_period_end;

        const updateData = {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          subscriptionStatus: 'active',
          currentPlan: plan,
          subscriptionCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
        };

        // Try by stripeCustomerId first, fall back to userId from metadata
        let user = await prisma.user.findUnique({ where: { stripeCustomerId: customerId } });
        if (!user && userId) {
          user = await prisma.user.findUnique({ where: { id: userId } });
        }

        if (user) {
          await prisma.user.update({ where: { id: user.id }, data: updateData });
          console.log(`[webhook] checkout.session.completed: activated user ${user.id}`);
        } else {
          console.error(`[webhook] checkout.session.completed: no user found for customer=${customerId} userId=${userId}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const periodEnd = subscription.items.data[0]?.current_period_end;

        const user = await prisma.user.findUnique({ where: { stripeCustomerId: customerId } });
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: subscription.status,
              subscriptionCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            },
          });
          console.log(`[webhook] subscription.updated: user ${user.id} status=${subscription.status}`);
        } else {
          console.error(`[webhook] subscription.updated: no user found for customer=${customerId}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findUnique({ where: { stripeCustomerId: customerId } });
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: 'canceled',
              stripeSubscriptionId: null,
            },
          });
          console.log(`[webhook] subscription.deleted: user ${user.id} canceled`);
        } else {
          console.error(`[webhook] subscription.deleted: no user found for customer=${customerId}`);
        }
        break;
      }
    }
  } catch (err) {
    console.error(`[webhook] Error processing ${event.type}:`, err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
