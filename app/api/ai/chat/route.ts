import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { conversation, userContext } = await request.json();
  const latest = conversation?.[conversation.length - 1]?.content ?? '';
  const highIntent = /book|reserve|honeymoon|anniversary/i.test(latest);
  return NextResponse.json({
    answer: 'I can help compare inclusions, policy flexibility, and resort niche fit using current rate snapshots.',
    guardrail: 'I only present latest fetched pricing/policies.',
    handoff: highIntent || userContext?.tripBudget > 8000 ? 'recommended' : 'not_required'
  });
}
