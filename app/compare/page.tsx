import { db } from '@/lib/db';

export default async function ComparePage() {
  const resorts = await db.resort.findMany({ include: { rateQuotes: { orderBy: { createdAt: 'desc' }, take: 1 } }, take: 4 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Compare resorts</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        {resorts.map((resort) => (
          <div key={resort.id} className="rounded-xl border bg-white p-4">
            <h2 className="font-semibold">{resort.name}</h2>
            <p className="text-sm">
              {resort.rateQuotes[0]?.currency ?? 'USD'} {resort.rateQuotes[0]?.totalAmount ?? 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
