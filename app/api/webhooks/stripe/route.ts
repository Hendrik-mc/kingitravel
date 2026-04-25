import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/api/stripe';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing webhook signature configuration' }, { status: 400 });
  }

  const payload = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingDraftId;
      if (bookingId) {
        await db.booking.update({
          where: { id: bookingId },
          data: { status: 'paid', stripeCheckoutSessionId: session.id }
        });
      }
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;
      const bookingId = intent.metadata?.bookingDraftId;
      if (bookingId) {
        await db.booking.update({
          where: { id: bookingId },
          data: { status: 'payment_confirmed', stripePaymentIntentId: intent.id }
        });
      }
    }

    if (event.type === 'invoice.paid') {
      const invoice = event.data.object;
      const userId = invoice.metadata?.userId;
      if (userId) {
        await db.membership.updateMany({
          where: { userId },
          data: { status: 'active' }
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Webhook error' }, { status: 400 });
  }
}
