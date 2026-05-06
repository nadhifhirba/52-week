import type { Metadata } from 'next';
import Link from 'next/link';
import { BellRing, BadgeInfo } from 'lucide-react';
import { seedLaundries } from '@/lib/seed';
import './globals.css';

export const metadata: Metadata = {
  title: 'Laundry Kiloan Optimizer',
  description: 'Real-time laundry capacity & booking untuk area Jakarta.',
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: `/booking/${seedLaundries[0].id}`, label: 'Booking' },
  { href: '/status', label: 'Status' },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen text-zinc-100">
          <header className="sticky top-0 z-50 border-b border-white/8 bg-zinc-950/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_24px_rgba(255,107,0,0.18)]">
                  <BellRing className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-orange-400/80">
                    LAUNDRY_OPTIMIZER
                  </p>
                  <p className="text-sm text-zinc-400">Real-time kapasitas & booking kiloan</p>
                </div>
              </div>

              <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 font-medium text-zinc-300 transition hover:bg-orange-500/15 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6 pb-12 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
              <BadgeInfo className="h-4 w-4 text-orange-400" />
              Jakarta • Mobile-first • Dark theme
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
