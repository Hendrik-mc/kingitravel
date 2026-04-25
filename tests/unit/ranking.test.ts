import { describe, expect, it } from 'vitest';
import { rankResorts } from '@/lib/ranking/rankResorts';
import { resorts, rateQuotes } from '@/lib/fixtures/resorts';

describe('rankResorts', () => {
  it('returns sorted results with explanations', () => {
    const results = rankResorts(resorts, rateQuotes, { nicheTags: ['wellness'] });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
    expect(results[0].explanation.reasons.length).toBeGreaterThan(0);
  });
});
