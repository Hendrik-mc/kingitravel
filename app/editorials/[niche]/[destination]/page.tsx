export default async function EditorialPage({ params }: { params: Promise<{ niche: string; destination: string }> }) {
  const { niche, destination } = await params;
  return <div className="mx-auto max-w-4xl px-4 py-8"><h1 className="text-3xl font-bold capitalize">Best {niche.replace('-', ' ')} resorts in {destination}</h1><p className="mt-3">Editorial landing page template optimized for SEO with destination + niche intent.</p></div>;
}
