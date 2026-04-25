import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchPage from '@/app/search/page';
import { QueryProvider } from '@/components/QueryProvider';

describe('Search page', () => {
  it('renders sticky search shell', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => ({ results: [] }) }));
    render(
      <QueryProvider>
        <SearchPage />
      </QueryProvider>
    );
    expect(screen.getByText(/Sticky search bar/i)).toBeInTheDocument();
  });
});
