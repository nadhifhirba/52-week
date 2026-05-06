import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ClipboardList, Home, NotebookPen, ShoppingBag } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'HYPER_DELIVERY',
  description: 'Hyper-local Delivery Coordinator untuk kompleks dan kos.',
};

const navItems = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/#buat-grup', label: 'Buat Grup', icon: NotebookPen },
  { href: '/history', label: 'Pesanan Saya', icon: ClipboardList },
] as const;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
          <header className="sticky top-0 z-20 -mx-4 mb-6 border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/15 ring-1 ring-orange-500/30">
                  <ShoppingBag className="h-6 w-6 text-orange-300" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.34em] text-orange-300/80">HYPER_DELIVERY</p>
                  <p className="text-sm text-slate-300">Bagi ongkir, pesen bareng, lebih hemat</p>
                </div>
              </Link>

              <nav className="flex flex-wrap gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-white"
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

          <footer className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 HYPER_DELIVERY — koordinasi pesanan kompleks jadi lebih rapi.</p>
              <p className="inline-flex items-center gap-2 text-orange-300">
                <ShoppingBag className="h-4 w-4" />
                Komunitas kos dan komplek
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
