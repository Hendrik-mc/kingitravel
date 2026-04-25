'use client';

import { useQuery } from '@tanstack/react-query';
import { FilterDrawer } from '@/components/FilterDrawer';
import { FilterRail } from '@/components/FilterRail';
import { ResortCard } from '@/components/ResortCard';
import { CompareTray } from '@/components/CompareTray';

interface SearchResponse {
  results: any[];
  error?: string;
  hint?: string;
}

async function fetchLiveResults(): Promise<SearchResponse> {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      destination: 'Bali',
      checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10),
      checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 35).toISOString().slice(0, 10),
      rooms: 1,
      adults: 2,
      children: 0,
      currency: 'USD',
      nicheTags: ['wellness']
    })
  });
  return response.json();
}

export function SearchResultsClient() {
  const { data, isLoading, isError } = useQuery({ queryKey: ['live-search-default'], queryFn: fetchLiveResults });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="sticky top-16 z-20 mb-4 rounded-xl border bg-white p-3">Sticky search bar · Destination · Dates · Guests</div>
      <FilterDrawer />
      <div className="grid gap-4 md:grid-cols-[260px_1fr]">
        <FilterRail />
        <section className="space-y-4">
          {isLoading && (
            <div className="space-y-3" aria-label="loading state">
              <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
              <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
            </div>
          )}

          {!isLoading && isError && <p className="rounded-xl border bg-white p-4">Search failed. Please try again.</p>}

          {!isLoading && !isError && data?.error && (
            <p className="rounded-xl border bg-amber-50 p-4 text-amber-900">
              {data.error}. {data.hint}
            </p>
          )}

          {!isLoading && !isError && !data?.error && (data?.results?.length ?? 0) === 0 && (
            <p className="rounded-xl border bg-white p-4">No results. Try nearby dates or broader niche filters.</p>
          )}

          {!isLoading && !isError && !data?.error && data?.results?.map((r: any) => <ResortCard key={r.resort.id} result={r} />)}
          <CompareTray />
        </section>
      </div>
    </div>
  );
}
