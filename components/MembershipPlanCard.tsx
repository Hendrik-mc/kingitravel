export function MembershipPlanCard({ plan, price }: { plan: string; price: string }) {
  return <div className="rounded-xl border bg-white p-5"><h3 className="text-lg font-semibold">{plan}</h3><p className="mt-2 text-2xl font-bold">{price}</p><ul className="mt-3 text-sm"><li>Priority concierge support</li><li>Exclusive rate alerts</li><li>Flexible cancellation assistance</li></ul><button className="mt-4 rounded bg-brand-500 px-4 py-2 text-white">Choose plan</button></div>;
}
