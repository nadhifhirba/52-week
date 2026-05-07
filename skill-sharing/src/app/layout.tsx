import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Bebas_Neue, Work_Sans } from 'next/font/google';
import { Shapes } from 'lucide-react';
import './globals.css';

const bebas = Bebas_Neue({
  subsets: ['latin'], weight: ['400'],
  variable: '--font-bebas', display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans', display: 'swap',
});

export const metadata: Metadata = {
  title: 'Skill Sharing — Creative Workshops',
  description: 'Temukan dan booking workshop kreatif di Jakarta.',
};

const navItems = [
  { href: '/', label: 'Jelajah' },
  { href: '/create', label: 'Buat Workshop' },
  { href: '/bookings', label: 'Booking Saya' },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${bebas.variable} ${workSans.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6">
          <header className="mb-8 flex items-center justify-between border-b-2 border-[#1A1A1A] pb-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[#E03131] text-white font-bold text-lg"
                style={{ fontFamily: "var(--font-bebas)" }}>
                SS
              </div>
              <div>
                <h1 className="text-xl tracking-tight" style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}>
                  SKILL<span className="text-[#E03131]">SHARING</span>
                </h1>
                <p className="text-[11px] text-[#555]">Creative Workshops</p>
              </div>
            </Link>
            <nav className="flex gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded px-4 py-2 text-sm font-semibold text-[#555] transition-all hover:bg-[#F5D000] hover:text-[#1A1A1A]"
                  style={{ fontFamily: "var(--font-work-sans)" }}
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
