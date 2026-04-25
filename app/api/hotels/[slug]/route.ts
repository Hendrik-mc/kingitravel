import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { liteApi } from '@/lib/api/liteapi';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const hotel = await db.resort.findUnique({ where: { slug } });
    if (!hotel) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const url = new URL(request.url);
    const checkIn = url.searchParams.get('checkIn');
    const checkOut = url.searchParams.get('checkOut');
    const currency = url.searchParams.get('currency') ?? 'USD';

    let latestRates = null;
    if (checkIn && checkOut) {
      latestRates = await liteApi.searchRates({
        hotelIds: [hotel.liteApiHotelId],
        checkIn,
        checkOut,
        occupancies: [{ rooms: 1, adults: 2, children: 0 }],
        currency
      });
    }

    return NextResponse.json({ hotel, latestRates });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to fetch hotel' }, { status: 500 });
  }
}
