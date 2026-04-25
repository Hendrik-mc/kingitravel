import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { liteApi } from '@/lib/api/liteapi';
import { rankResorts } from '@/lib/ranking/rankResorts';
import { db } from '@/lib/db';
import { RateQuote, Resort } from '@/lib/types';

const SearchInput = z.object({
  destination: z.string().min(2),
  checkIn: z.string(),
  checkOut: z.string(),
  rooms: z.number().int().min(1).default(1),
  adults: z.number().int().min(1).default(2),
  children: z.number().int().min(0).default(0),
  currency: z.string().default('USD'),
  nicheTags: z.array(z.string()).default([]),
  filters: z
    .object({
      adultsOnly: z.boolean().optional(),
      familyFriendly: z.boolean().optional(),
      maxPrice: z.number().optional()
    })
    .optional()
});

function normalizeHotels(raw: any[], destination: string): Resort[] {
  return raw.map((hotel, index) => {
    const liteApiHotelId = String(hotel.hotelId ?? hotel.id ?? `unknown-${index}`);
    return {
      id: liteApiHotelId,
      name: hotel.name ?? 'Unnamed Resort',
      slug: (hotel.name ?? liteApiHotelId).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      destinationName: hotel.city ?? destination,
      countryCode: (hotel.countryCode ?? hotel.country ?? 'UN').toString().slice(0, 2).toUpperCase(),
      starRating: Number(hotel.stars ?? 4),
      boardBasisOptions: ['room-only', 'breakfast', 'all-inclusive'],
      adultsOnly: Boolean(hotel.adultsOnly),
      familyFriendly: hotel.familyFriendly !== false,
      wellnessTags: hotel.wellnessTags ?? [],
      sustainabilityTags: hotel.sustainabilityTags ?? [],
      adventureTags: hotel.adventureTags ?? [],
      privacyTags: hotel.privacyTags ?? [],
      amenities: hotel.amenities ?? [],
      images: hotel.images ?? [],
      description: hotel.description ?? `${hotel.name ?? 'Resort'} in ${destination}`,
      editorialSummary: 'Live LiteAPI inventory result.',
      rankingSignals: { quality: Number(hotel.rating ?? 75), intent: 70, value: 70 },
      niches: []
    };
  });
}

function normalizeRates(raw: any[], fallbackCurrency: string): RateQuote[] {
  return raw.map((offer, index) => ({
    id: String(offer.rateId ?? offer.offerId ?? `rate-${index}`),
    resortId: String(offer.hotelId ?? offer.propertyId ?? offer.id),
    liteApiOfferId: String(offer.offerId ?? offer.rateId ?? `offer-${index}`),
    mealPlan: offer.mealPlan ?? offer.boardBasis ?? 'Room only',
    cancellationPolicy: offer.cancellationPolicy ?? 'Check latest cancellation policy before booking',
    currency: offer.currency ?? fallbackCurrency,
    totalAmount: Number(offer.totalAmount ?? offer.price ?? 0),
    taxesAmount: Number(offer.taxesAmount ?? offer.taxes ?? 0),
    includedItemsJson: offer.includedItems ?? [],
    refundable: Boolean(offer.refundable)
  }));
}

export async function POST(request: NextRequest) {
  try {
    const body = SearchInput.parse(await request.json());

    const hotelResponse = await liteApi.getHotels({ city: body.destination, limit: '30' });
    const hotelsRaw = hotelResponse.data ?? hotelResponse.hotels ?? [];

    if (!hotelsRaw.length) {
      return NextResponse.json({ results: [], rankingVersion: 'v2-live-liteapi' });
    }

    const hotels = normalizeHotels(hotelsRaw, body.destination);
    const hotelIds = hotels.map((h) => h.id);

    const ratesResponse = await liteApi.searchRates({
      hotelIds,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      occupancies: [{ rooms: body.rooms, adults: body.adults, children: body.children }],
      currency: body.currency
    });

    const ratesRaw = ratesResponse.data ?? ratesResponse.rates ?? ratesResponse.offers ?? [];
    const rates = normalizeRates(ratesRaw, body.currency);

    const enrichedResorts = await Promise.all(
      hotels.map(async (resort) => {
        const existing = await db.resort.findUnique({ where: { liteApiHotelId: resort.id } }).catch(() => null);
        if (!existing) return resort;
        return {
          ...resort,
          slug: existing.slug,
          editorialSummary: existing.editorialSummary,
          rankingSignals: (existing.rankingSignals as Record<string, number>) ?? resort.rankingSignals,
          niches: []
        };
      })
    );

    const results = rankResorts(enrichedResorts, rates, {
      nicheTags: body.nicheTags,
      adultsOnly: body.filters?.adultsOnly,
      familyFriendly: body.filters?.familyFriendly,
      maxPrice: body.filters?.maxPrice
    });

    await db.searchSession
      .create({
        data: {
          query: `${body.destination} ${body.nicheTags.join(' ')}`.trim(),
          destination: body.destination,
          checkIn: new Date(body.checkIn),
          checkOut: new Date(body.checkOut),
          rooms: body.rooms,
          adults: body.adults,
          children: body.children,
          filtersJson: body.filters ?? {},
          rankingVersion: 'v2-live-liteapi',
          resultsSnapshotJson: results as any
        }
      })
      .catch(() => undefined);

    return NextResponse.json({ results, rankingVersion: 'v2-live-liteapi' });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Search failed',
        hint: 'Provide LITEAPI_KEY to run live resort inventory search.'
      },
      { status: 500 }
    );
  }
}
