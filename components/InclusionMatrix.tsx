export function InclusionMatrix({ items }: { items: string[] }) {
  return <div className="mt-4 rounded-lg border p-3"><h4 className="font-medium">Rate inclusions</h4><ul className="mt-2 text-sm">{items.map((i) => <li key={i}>• {i}</li>)}</ul></div>;
}
