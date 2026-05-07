import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Amatic_SC, Cabin } from 'next/font/google';
import { Recycle, Sprout } from 'lucide-react';
import './globals.css';

const amatic = Amatic_SC({
  subsets: ['latin'], weight: ['400', '700'],
  variable: '--font-amatic', display: 'swap',
});

const cabin = Cabin({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--font-cabin', display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trash Treasure — Waste Bank Digital',
  description: 'Sampah punya nilai. Setor, kumpulkan poin, lindungi bumi.',
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/setor', label: 'Setor' },
  { href: '/jemput', label: 'Jemput' },
  { href: '/edukasi', label: 'Edukasi' },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${amatic.variable} ${cabin.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
          <header className="sticky top-3 z-40 mb-6 rounded-2xl border border-[#EDF2E8] bg-white/90 px-5 py-3 shadow-sm backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#166534] text-white shadow-md shadow-green-200">
                  <Recycle size={20} />
                </span>
                <div>
                  <h1 className="text-lg font-black tracking-tight text-[#1A1F14]" style={{ fontFamily: "var(--font-amatic)", fontSize: "1.6rem" }}>
                    Trash Treasure
                  </h1>
                  <p className="text-[10px] text-[#9BA88A] uppercase tracking-[0.12em]">Waste bank digital</p>
                </div>
              </Link>
              <nav className="flex flex-wrap gap-1.5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-[#5C6B4E] transition-all hover:bg-[#F5F1E8] hover:text-[#166534]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
