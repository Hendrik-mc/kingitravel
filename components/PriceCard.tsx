import { RateQuote } from '@/lib/types';

export function PriceCard({ rate }: { rate: RateQuote }) {
  return <div className="mt-3 rounded-lg bg-slate-100 p-3"><p className="font-semibold">{rate.currency} {rate.totalAmount.toLocaleString()}</p><p className="text-sm text-slate-600">Taxes {rate.currency} {rate.taxesAmount}</p><p className="text-sm">{rate.mealPlan}</p></div>;
}
