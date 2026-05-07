import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Outfit, Literata } from 'next/font/google';
import { WandSparkles } from 'lucide-react';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--font-outfit', display: 'swap',
});

const literata = Literata({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--font-literata', display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kost AI — AI Interior Design',
  description: 'Desain interior kos impian dengan bantuan AI. Generate, eksplorasi, beli produk.',
};

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/generate', label: 'Generate' },
  { href: '/inspirasi', label: 'Inspirasi' },
  { href: '/produk', label: 'Produk' },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${outfit.variable} ${literata.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
          <header className="mb-8 flex items-center justify-between rounded-2xl border border-[#E8E3DA] bg-white px-5 py-3 shadow-sm">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9CAF88] text-white">
                <WandSparkles size={18} />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-[#2D2A26]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Kost<span className="text-[#9CAF88]">AI</span>
                </h1>
                <p className="text-[10px] text-[#7A7268]">AI Interior Design</p>
              </div>
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[#7A7268] transition-all hover:bg-[#F5F2ED] hover:text-[#2D2A26]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
