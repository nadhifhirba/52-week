import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Clock3 } from 'lucide-react';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk', display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'], weight: ['400', '500', '700', '800'],
  variable: '--font-jetbrains', display: 'swap',
});

export const metadata: Metadata = {
  title: 'ANTRI — Virtual Queue System',
  description: 'Sistem manajemen antrean modern. Nomor besar, jelas, real-time.',
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/create', label: 'Buat Antrian' },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrains.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
          <header className="sticky top-3 z-40 mb-6 flex items-center justify-between rounded-2xl border border-[#1E3A5F]/50 bg-[#162032]/90 px-5 py-3 backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F59E0B] text-sm font-black text-[#0F1729]">
                A
              </div>
              <div>
                <h1
                  className="text-base font-bold tracking-tight text-[#F1F5F9]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  ANTRI<span className="text-[#F59E0B]">.</span>
                </h1>
                <p className="text-[10px] text-[#64748B] uppercase tracking-[0.2em]">Queue System</p>
              </div>
            </Link>
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-[#1E3A5F]/50 px-4 py-2 text-sm font-medium text-[#94A3B8] transition-all hover:border-[#F59E0B]/30 hover:text-[#F1F5F9]"
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
