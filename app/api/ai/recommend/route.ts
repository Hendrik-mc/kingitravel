import { NextRequest, NextResponse } from 'next/server';
import { rankResorts } from '@/lib/ranking/rankResorts';
import { buildRecommendationSummary } from '@/lib/ai/recommend';

export async function POST(request: NextRequest) {
  const { travelerProfile, candidates, rates } = await request.json();

  if (!Array.isArray(candidates) || !Array.isArray(rates)) {
    return NextResponse.json({ error: 'candidates and rates are required arrays from live search data.' }, { status: 400 });
  }

  const ranked = rankResorts(candidates, rates, {
    nicheTags: travelerProfile?.preferredNiches ?? [],
    adultsOnly: travelerProfile?.adultsOnly,
    familyFriendly: travelerProfile?.familyFriendly,
    maxPrice: travelerProfile?.maxPrice
  });

  return NextResponse.json({ recommendations: buildRecommendationSummary(ranked) });
}
