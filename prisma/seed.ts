import { PrismaClient } from '@prisma/client';
import { liteApi } from '@/lib/api/liteapi';

const prisma = new PrismaClient();

async function main() {
  const destination = process.env.SEED_DESTINATION ?? 'Bali';
  const checkIn = process.env.SEED_CHECKIN ?? '2026-08-10';
  const checkOut = process.env.SEED_CHECKOUT ?? '2026-08-15';

  const hotelsResponse = await liteApi.getHotels({ city: destination, limit: '12' });
  const hotels = hotelsResponse.data ?? hotelsResponse.hotels ?? [];

  if (!hotels.length) {
    throw new Error(`No hotels returned from LiteAPI for destination ${destination}`);
  }

  const hotelIds = hotels.map((h: any) => String(h.hotelId ?? h.id));
  const ratesResponse = await liteApi.searchRates({
    hotelIds,
    checkIn,
    checkOut,
    occupancies: [{ rooms: 1, adults: 2, children: 0 }],
    currency: 'USD'
  });
  const rates = ratesResponse.data ?? ratesResponse.rates ?? ratesResponse.offers ?? [];

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@kingi.travel' },
    update: {},
    create: { email: 'demo@kingi.travel', name: 'Demo Traveler', hashedPassword: 'demo-hash', role: 'traveler' }
  });

  for (const hotel of hotels) {
    const liteApiHotelId = String(hotel.hotelId ?? hotel.id);
    const slug = String(hotel.name ?? liteApiHotelId).toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const resort = await prisma.resort.upsert({
      where: { liteApiHotelId },
      update: {
        name: hotel.name ?? 'Unnamed Resort',
        destinationName: hotel.city ?? destination,
        countryCode: (hotel.countryCode ?? hotel.country ?? 'UN').slice(0, 2).toUpperCase()
      },
      create: {
        liteApiHotelId,
        name: hotel.name ?? 'Unnamed Resort',
        slug,
        destinationName: hotel.city ?? destination,
        countryCode: (hotel.countryCode ?? hotel.country ?? 'UN').slice(0, 2).toUpperCase(),
        starRating: Number(hotel.stars ?? 4),
        boardBasisOptions: ['room-only', 'breakfast', 'all-inclusive'],
        adultsOnly: false,
        familyFriendly: true,
        wellnessTags: [],
        sustainabilityTags: [],
        adventureTags: [],
        privacyTags: [],
        amenities: hotel.amenities ?? [],
        images: hotel.images ?? [],
        description: hotel.description ?? `${hotel.name ?? 'Resort'} in ${destination}`,
        editorialSummary: 'Live inventory seeded from LiteAPI.',
        rankingSignals: { quality: 75, value: 70, intent: 70 }
      }
    });

    const rate = rates.find((r: any) => String(r.hotelId ?? r.propertyId ?? r.id) === liteApiHotelId);
    if (!rate) continue;

    await prisma.rateQuote.create({
      data: {
        resortId: resort.id,
        liteApiOfferId: String(rate.offerId ?? rate.rateId ?? `offer-${liteApiHotelId}`),
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        roomType: rate.roomType ?? 'Standard',
        cancellationPolicy: rate.cancellationPolicy ?? 'Check policy in rate details',
        mealPlan: rate.mealPlan ?? rate.boardBasis ?? 'Room only',
        occupancy: '2 adults',
        currency: rate.currency ?? 'USD',
        totalAmount: Number(rate.totalAmount ?? rate.price ?? 0),
        taxesAmount: Number(rate.taxesAmount ?? rate.taxes ?? 0),
        includedItemsJson: rate.includedItems ?? [],
        refundable: Boolean(rate.refundable)
      }
    });
  }

  await prisma.membership.upsert({
    where: { id: 'seed-membership-active' },
    update: { status: 'active' },
    create: {
      id: 'seed-membership-active',
      userId: demoUser.id,
      stripeCustomerId: 'cus_seed_live',
      stripeSubscriptionId: 'sub_seed_live',
      plan: 'monthly',
      status: 'active',
      renewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
  });
}

main().finally(() => prisma.$disconnect());
