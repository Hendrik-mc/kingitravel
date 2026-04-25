export function PartyBuilder() {
  return <div className="grid grid-cols-3 gap-2"><input type="number" min={1} defaultValue={2} aria-label="Adults" className="rounded border p-2"/><input type="number" min={0} defaultValue={0} aria-label="Children" className="rounded border p-2"/><input type="number" min={0} defaultValue={0} aria-label="Seniors" className="rounded border p-2"/></div>;
}
