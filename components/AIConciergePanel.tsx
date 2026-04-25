'use client';

export function AIConciergePanel() {
  return <aside className="rounded-xl border bg-white p-4"><h3 className="font-semibold">AI Concierge</h3><p className="mt-1 text-sm">Ask about inclusions, cancellation terms, and niche fit.</p><textarea className="mt-3 w-full rounded border p-2" rows={4} placeholder="Where should I stay for deep rest and cool climate?"/><button className="mt-2 rounded bg-slate-900 px-4 py-2 text-white">Send</button><button className="ml-2 mt-2 rounded border px-4 py-2">Talk to human advisor</button></aside>;
}
