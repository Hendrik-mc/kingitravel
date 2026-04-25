import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const event = await request.json();
  const bookingId = event.bookingId ?? event.data?.bookingId;
  const status = event.status ?? event.type;

  if (bookingId && status) {
    await db.booking.updateMany({ where: { liteApiBookingId: bookingId }, data: { status: String(status).toLowerCase() } });
  }

  await db.eventLog.create({
    data: {
      eventType: event.type ?? 'liteapi.webhook',
      actorId: null,
      payloadJson: event
    }
  });

  return NextResponse.json({ received: true });
}
