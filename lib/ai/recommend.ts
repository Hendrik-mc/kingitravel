import { SearchResult } from '@/lib/types';

export function buildRecommendationSummary(results: SearchResult[]) {
  return results.slice(0, 3).map((r) => ({
    resortId: r.resort.id,
    slug: r.resort.slug,
    summary: `${r.resort.name} fits due to ${r.explanation.reasons.join(', ')}.`,
    guardrail: 'Pricing and policies shown from latest rate snapshot only.'
  }));
}
