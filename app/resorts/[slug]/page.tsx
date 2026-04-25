import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { AmenityBadgeGroup } from '@/components/AmenityBadgeGroup';
import { InclusionMatrix } from '@/components/InclusionMatrix';
import { RatingBreakdown } from '@/components/RatingBreakdown';
import { StickyMobileBookBar } from '@/components/StickyMobileBookBar';

export default async function ResortDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resort = await db.resort.findUnique({ where: { slug }, include: { rateQuotes: { orderBy: { createdAt: 'desc' }, take: 1 } } });
  if (!resort) notFound();

  const latestRate = resort.rateQuotes[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">{resort.name}</h1>
      <p className="mt-2 text-slate-600">{resort.editorialSummary}</p>
      <AmenityBadgeGroup amenities={(resort.amenities as string[]) ?? []} />
      <InclusionMatrix items={(latestRate?.includedItemsJson as string[]) ?? []} />
      <div className="mt-5 rounded-xl border bg-white p-4">
        <h3 className="font-semibold">Why this property ranks well</h3>
        <RatingBreakdown signals={(resort.rankingSignals as Record<string, number>) ?? { quality: 0, value: 0, intent: 0 }} />
      </div>
      <StickyMobileBookBar price={latestRate?.totalAmount ?? 0} />
    </div>
  );
}
