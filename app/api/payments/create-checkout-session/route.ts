import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/api/stripe';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await createCheckoutSession({
    mode: body.membershipPlanId ? 'subscription' : 'payment',
    amountCents: body.amountCents,
    planPriceId: body.membershipPlanId,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/booking`,
    metadata: { bookingDraftId: body.bookingDraftId ?? '', membershipPlanId: body.membershipPlanId ?? '' }
  });

  return NextResponse.json({ id: session.id, url: session.url });
}
