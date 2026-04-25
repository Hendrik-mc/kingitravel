export function MatchExplanation({ explanation }: { explanation: { reasons: string[] } }) {
  return <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700" aria-label="Why this resort matches you">{explanation.reasons.map((r) => <li key={r}>{r}</li>)}</ul>;
}
