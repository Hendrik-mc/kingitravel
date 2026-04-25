import { RateQuote, Resort } from '@/lib/types';

const destinations = ['Bali', 'Costa Rica', 'Alps'];
const niches: Resort['niches'][] = [
  ['all-inclusive'],
  ['wellness'],
  ['family'],
  ['adults-only'],
  ['eco'],
  ['outdoor'],
  ['cool-climate'],
  ['remote-luxury']
];

export const resorts: Resort[] = Array.from({ length: 12 }).map((_, i) => {
  const niche = niches[i % niches.length];
  const destination = destinations[i % destinations.length];
  return {
    id: `resort-${i + 1}`,
    name: `${destination} ${niche[0]} retreat ${i + 1}`,
    slug: `${destination.toLowerCase()}-${niche[0]}-${i + 1}`,
    destinationName: destination,
    countryCode: destination === 'Bali' ? 'ID' : destination === 'Costa Rica' ? 'CR' : 'CH',
    starRating: 4 + (i % 2),
    boardBasisOptions: ['room-only', 'breakfast', 'all-inclusive'],
    adultsOnly: niche.includes('adults-only'),
    familyFriendly: niche.includes('family') || i % 3 === 0,
    wellnessTags: ['sleep-program', 'spa', 'mindfulness'],
    sustainabilityTags: ['plastic-free', 'local-sourcing'],
    adventureTags: ['hiking', 'diving'],
    privacyTags: ['quiet-zones', 'villa-only'],
    amenities: ['spa', 'pool', 'wifi', 'gym', 'kids-club'],
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e'],
    description: `Premium ${niche[0]} destination for thoughtful travelers in ${destination}.`,
    editorialSummary: `Editor pick for ${niche[0]} with strong inclusion transparency and policy confidence.`,
    rankingSignals: {
      value: 70 + (i % 15),
      quality: 75 + (i % 20),
      intent: 68 + (i % 20)
    },
    niches: niche
  };
});

export const rateQuotes: RateQuote[] = resorts.map((resort, i) => ({
  id: `rate-${i + 1}`,
  resortId: resort.id,
  liteApiOfferId: `offer-${i + 1}`,
  mealPlan: i % 2 === 0 ? 'All inclusive' : 'Breakfast',
  cancellationPolicy: i % 2 === 0 ? 'Free cancel 7 days before check-in' : 'Non-refundable',
  currency: 'USD',
  totalAmount: 1200 + i * 150,
  taxesAmount: 150 + i * 10,
  includedItemsJson: ['airport-transfer', 'wifi', 'daily-activities'],
  refundable: i % 2 === 0
}));

export const demoUsers = [
  { email: 'demo@kingi.travel', name: 'Demo Traveler', membership: 'active' },
  { email: 'family@kingi.travel', name: 'Family Planner', membership: 'none' }
];
