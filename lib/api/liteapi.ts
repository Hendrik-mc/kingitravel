const LITE_API_BASE = process.env.LITEAPI_BASE_URL ?? 'https://api.liteapi.travel';

function assertLiteApiKey() {
  if (!process.env.LITEAPI_KEY) {
    throw new Error('LITEAPI_KEY is not configured. Provide a valid LiteAPI key to fetch live inventory.');
  }
}

async function request<T>(path: string, method: 'GET' | 'POST', body?: unknown): Promise<T> {
  assertLiteApiKey();

  const response = await fetch(`${LITE_API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.LITEAPI_KEY as string
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LiteAPI request failed at ${path}: ${response.status} ${errorText}`);
  }

  return response.json();
}

export interface LiteApiHotel {
  id?: string;
  hotelId?: string;
  name?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  stars?: number;
}

export const liteApi = {
  getHotels: (query: Record<string, string>) =>
    request<{ data?: LiteApiHotel[]; hotels?: LiteApiHotel[] }>(
      '/v3.0/data/hotels?' + new URLSearchParams(query).toString(),
      'GET'
    ),
  searchRates: (payload: unknown) => request<any>('/v3.0/hotels/rates', 'POST', payload),
  prebookRate: (payload: unknown) => request<any>('/v3.0/rates/prebook', 'POST', payload),
  bookRate: (payload: unknown) => request<any>('/v3.0/rates/book', 'POST', payload),
  cancelBooking: (payload: unknown) => request<any>('/v3.0/bookings/cancel', 'POST', payload)
};
