import { NextRequest, NextResponse } from 'next/server';
import { liteApi } from '@/lib/api/liteapi';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { liteApiOfferId } = await request.json();
    const response = await liteApi.prebookRate({ offerId: liteApiOfferId });
    const prebookId = response.prebookId ?? response.data?.prebookId;

    if (!prebookId) {
      return NextResponse.json({ error: 'LiteAPI prebook did not return prebookId' }, { status: 502 });
    }

    await db.rateQuote.updateMany({
      where: { liteApiOfferId },
      data: { prebookId }
    });

    return NextResponse.json({ prebookId, status: 'created' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Prebook failed' }, { status: 500 });
  }
}
