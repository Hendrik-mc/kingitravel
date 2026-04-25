import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/options';
import { db } from '@/lib/db';
import { SavedSearchCard } from '@/components/SavedSearchCard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) redirect('/login');

  const favoritesCount = await db.favorite.count({ where: { userId: user.id } });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">Saved searches & favorites</h1>
      <p className="mt-2 text-sm text-slate-600">Favorites saved: {favoritesCount}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SavedSearchCard />
        <SavedSearchCard />
      </div>
    </div>
  );
}
