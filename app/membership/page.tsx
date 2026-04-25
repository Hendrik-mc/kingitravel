import { MembershipPlanCard } from '@/components/MembershipPlanCard';

export default function MembershipPage() {
  return <div className="mx-auto max-w-5xl px-4 py-8"><h1 className="text-2xl font-bold">Membership</h1><div className="mt-4 grid gap-4 md:grid-cols-2"><MembershipPlanCard plan="Monthly" price="$29/mo" /><MembershipPlanCard plan="Annual" price="$290/yr" /></div></div>;
}
