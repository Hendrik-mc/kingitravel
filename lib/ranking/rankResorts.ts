import { RateQuote, Resort, SearchResult } from '@/lib/types';

interface SearchInput {
  nicheTags?: string[];
  adultsOnly?: boolean;
  familyFriendly?: boolean;
  maxPrice?: number;
}

export function rankResorts(resorts: Resort[], rates: RateQuote[], input: SearchInput): SearchResult[] {
  const rateByResort = new Map(rates.map((r) => [r.resortId, r]));

  return resorts
    .filter((resort) => {
      if (input.adultsOnly && !resort.adultsOnly) return false;
      if (input.familyFriendly && !resort.familyFriendly) return false;
      const rate = rateByResort.get(resort.id);
      if (!rate) return false;
      if (input.maxPrice && rate.totalAmount > input.maxPrice) return false;
      return true;
    })
    .map((resort) => {
      const rate = rateByResort.get(resort.id)!;
      const valueScore = Math.max(0, 100 - rate.totalAmount / 40);
      const nicheScore = input.nicheTags?.some((tag) => resort.niches.includes(tag as any)) ? 95 : 60;
      const climateScore = resort.niches.includes('cool-climate') ? 88 : 72;
      const qualityScore = resort.rankingSignals.quality;
      const policyScore = rate.refundable ? 90 : 55;
      const intentScore = resort.rankingSignals.intent;
      const score = valueScore * 0.2 + nicheScore * 0.25 + climateScore * 0.1 + qualityScore * 0.2 + policyScore * 0.15 + intentScore * 0.1;

      return {
        resort,
        rate,
        score,
        explanation: {
          reasons: [
            `Strong ${input.nicheTags?.[0] ?? 'traveler'} fit`,
            `Policy confidence: ${rate.refundable ? 'refundable' : 'limited refund'}`,
            `Value score ${Math.round(valueScore)}/100`
          ],
          signals: {
            valueScore,
            nicheScore,
            climateScore,
            qualityScore,
            policyScore,
            intentScore
          }
        }
      };
    })
    .sort((a, b) => b.score - a.score);
}
