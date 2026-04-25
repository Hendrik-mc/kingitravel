import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { QueryProvider } from '@/components/QueryProvider';

export const metadata: Metadata = {
  title: 'KingiTravel Resort Discovery',
  description: 'AI-native resort discovery and booking platform.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
              <Link href="/" className="font-semibold text-brand-700">KingiTravel</Link>
              <div className="flex gap-4 text-sm">
                <Link href="/search">Search</Link>
                <Link href="/membership">Membership</Link>
                <Link href="/dashboard">Dashboard</Link>
              </div>
            </nav>
          </header>
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
