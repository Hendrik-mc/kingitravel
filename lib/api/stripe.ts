import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_dev', {
  apiVersion: '2025-03-31.basil'
});

export async function createCheckoutSession(input: {
  mode: 'payment' | 'subscription';
  amountCents?: number;
  planPriceId?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  return stripe.checkout.sessions.create({
    mode: input.mode,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: input.metadata,
    line_items:
      input.mode === 'payment'
        ? [
            {
              quantity: 1,
              price_data: {
                currency: 'usd',
                unit_amount: input.amountCents ?? 100000,
                product_data: { name: 'KingiTravel Resort Booking' }
              }
            }
          ]
        : [{ quantity: 1, price: input.planPriceId ?? process.env.STRIPE_MEMBERSHIP_MONTHLY_PRICE_ID }]
  });
}
