import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Bike, Calculator, Home, MessagesSquare, Route } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'OJOL_TOOL_BELT',
  description: 'Toolkit untuk driver ride-hailing Indonesia: dashboard, rute, kalkulator, dan komunitas.',
};

const navItems = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/routes', label: 'Rute', icon: Route },
  { href: '/community', label: 'Komunitas', icon: MessagesSquare },
  { href: '/calculator', label: 'Kalkulator', icon: Calculator },
] as const;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
          <header className="sticky top-0 z-20 -mx-4 mb-6 border-b border-orange-500/15 bg-black/75 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex flex-col gap-4 rounded-3xl border border-orange-500/10 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgba(249,115,22,0.08)] sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 ring-1 ring-orange-500/30">
                  <Bike className="h-6 w-6 text-orange-300" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-orange-300/80">
                    OJOL_TOOL_BELT
                  </p>
                  <p className="text-sm text-orange-100/80">Toolkit praktis buat driver Indonesia</p>
                </div>
              </Link>

              <nav className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-orange-500/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-orange-50 transition active:scale-[0.99] hover:border-orange-400/40 hover:bg-orange-500/14"
                    >
                      <Icon className="h-4 w-4 text-orange-300" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-8 border-t border-white/10 pt-6 text-sm text-orange-100/60">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>Made for jalanan Jakarta — cepat, terang, dan gampang dipakai.</p>
              <p className="inline-flex items-center gap-2 text-orange-300">
                <Bike className="h-4 w-4" />
                Mobile-first, touch-friendly
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
