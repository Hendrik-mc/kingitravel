import { HeroSearch } from '@/components/HeroSearch';
import { NicheSelector } from '@/components/NicheSelector';
import { AIConciergePanel } from '@/components/AIConciergePanel';

export default function HomePage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <section className="space-y-6">
        <HeroSearch />
        <div>
          <h2 className="mb-3 text-xl font-semibold">Explore by niche</h2>
          <NicheSelector />
        </div>
      </section>
      <AIConciergePanel />
    </div>
  );
}
