export function CancellationPolicyBox({ policy, refundable }: { policy: string; refundable: boolean }) {
  return <div className="mt-3 rounded-lg border-l-4 border-brand-500 bg-brand-50 p-3 text-sm"><p className="font-medium">Cancellation policy</p><p>{policy}</p><p className="mt-1">{refundable ? 'Refundable rate' : 'Non-refundable'}</p></div>;
}
