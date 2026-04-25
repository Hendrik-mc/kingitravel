export function RatingBreakdown({ signals }: { signals: Record<string, number> }) {
  return <div className="grid gap-2 sm:grid-cols-2">{Object.entries(signals).map(([k,v]) => <p key={k} className="text-sm capitalize">{k}: {Math.round(v)}</p>)}</div>;
}
