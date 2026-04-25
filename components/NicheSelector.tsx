'use client';
import { Niche } from '@/lib/types';
const niches: Niche[] = ['all-inclusive', 'wellness', 'family', 'adults-only', 'eco', 'outdoor', 'cool-climate', 'remote-luxury'];

export function NicheSelector() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Niche selector">
      {niches.map((n) => (
        <button key={n} className="rounded-full border bg-white px-3 py-2 text-sm capitalize hover:bg-slate-100">{n.replace('-', ' ')}</button>
      ))}
    </div>
  );
}
