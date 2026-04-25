import { describe, expect, it, vi } from 'vitest';
import { liteApi } from '@/lib/api/liteapi';

describe('liteApi wrapper', () => {
  it('calls endpoint', async () => {
    process.env.LITEAPI_KEY = 'test_key';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }));
    const data = await liteApi.searchRates({ hotels: [] });
    expect(data).toEqual({ ok: true });
  });
});
