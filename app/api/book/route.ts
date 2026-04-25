import { NextRequest, NextResponse } from 'next/server';
import { liteApi } from '@/lib/api/liteapi';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { prebookId, travelerDetails, bookingId } = await request.json();
    const liteResponse = await liteApi.bookRate({ prebookId, travelerDetails });
    const liteApiBookingId = liteResponse.bookingId ?? liteResponse.data?.bookingId;

    if (bookingId) {
      await db.booking.update({
        where: { id: bookingId },
        data: { liteApiBookingId, travelerDetailsJson: travelerDetails, status: 'confirmed' }
      });
    }

    return NextResponse.json({ bookingId, liteApiBookingId, status: 'confirmed' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Book failed' }, { status: 500 });
  }
}
