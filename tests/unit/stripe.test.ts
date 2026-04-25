import { describe, expect, it, vi } from 'vitest';
import { createCheckoutSession } from '@/lib/api/stripe';
import { stripe } from '@/lib/api/stripe';

describe('stripe checkout', () => {
  it('creates payment checkout session', async () => {
    vi.spyOn(stripe.checkout.sessions, 'create').mockResolvedValue({ id: 'cs_123', url: 'https://checkout' } as any);
    const session = await createCheckoutSession({ mode: 'payment', amountCents: 50000, successUrl: 'http://x/success', cancelUrl: 'http://x/cancel' });
    expect(session.id).toBe('cs_123');
  });
});
