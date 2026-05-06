import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'ANTRI_VIRTUAL',
  description: 'Sistem manajemen antrean modern untuk layanan publik dan bisnis.',
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/create', label: 'Buat Antrian' },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body className="text-zinc-50">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
          <header className="sticky top-0 z-20 mb-5 rounded-3xl border border-white/10 bg-zinc-950/85 px-4 py-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-300 text-xl font-black text-black shadow-lg shadow-orange-500/20">
                  A
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-[0.35em] text-orange-300">ANTRI_VIRTUAL</div>
                  <div className="text-sm text-zinc-400">Queue management system</div>
                </div>
              </Link>

              <nav className="hidden gap-2 sm:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Antre rapi. Layanan cepat. Fokus mobile.</span>
            <span>Dark orange Indonesian UI</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
