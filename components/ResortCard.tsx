import Link from 'next/link';
import { SearchResult } from '@/lib/types';
import { MatchExplanation } from './MatchExplanation';
import { CancellationPolicyBox } from './CancellationPolicyBox';
import { PriceCard } from './PriceCard';

export function ResortCard({ result }: { result: SearchResult }) {
  return (
    <article className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{result.resort.name}</h3>
        <Link href={`/resorts/${result.resort.slug}`} className="text-brand-700 underline">View</Link>
      </div>
      <p className="mt-1 text-sm text-slate-600">{result.resort.destinationName}</p>
      <MatchExplanation explanation={result.explanation} />
      <PriceCard rate={result.rate} />
      <CancellationPolicyBox policy={result.rate.cancellationPolicy} refundable={result.rate.refundable} />
    </article>
  );
}
