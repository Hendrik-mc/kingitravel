export function AmenityBadgeGroup({ amenities }: { amenities: string[] }) {
  return <div className="mt-3 flex flex-wrap gap-2">{amenities.map((a) => <span key={a} className="rounded-full bg-slate-100 px-3 py-1 text-xs">{a}</span>)}</div>;
}
