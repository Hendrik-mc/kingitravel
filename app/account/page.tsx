import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/options';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">Account</h1>
      <p className="mt-2">Welcome, {session.user?.name ?? session.user?.email}.</p>
      <p className="mt-2">Manage profile, bookings, and payment preferences.</p>
    </div>
  );
}
