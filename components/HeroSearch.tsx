'use client';
import { useState } from 'react';

export function HeroSearch() {
  const [destination, setDestination] = useState('Bali');
  return (
    <section className="rounded-2xl bg-brand-900 p-6 text-white">
      <h1 className="text-3xl font-bold">Find your next restorative resort stay</h1>
      <p className="mt-2 text-brand-100">Search by niche, destination, and policy confidence.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <input aria-label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="rounded-lg p-3 text-slate-900" />
        <input type="date" aria-label="Check-in" className="rounded-lg p-3 text-slate-900" />
        <input type="date" aria-label="Check-out" className="rounded-lg p-3 text-slate-900" />
        <button className="rounded-lg bg-brand-500 p-3 font-semibold">Search resorts</button>
      </div>
    </section>
  );
}
