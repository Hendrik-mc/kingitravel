import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const { resortIds } = await request.json();

  const resorts = await db.resort.findMany({
    where: { id: { in: (resortIds as string[]).slice(0, 4) } },
    include: { rateQuotes: { orderBy: { createdAt: 'desc' }, take: 1 } }
  });

  const compare = resorts.map((resort) => ({
    resort,
    rate: resort.rateQuotes[0] ?? null
  }));

  return NextResponse.json({ compare });
}
