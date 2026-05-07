import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Public_Sans, DM_Mono } from 'next/font/google';
import { CircleParking, CalendarDays, ListPlus, MapPinned } from 'lucide-react';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans', display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'], weight: ['400', '500'],
  variable: '--font-dm-mono', display: 'swap',
});

export const metadata: Metadata = {
  title: 'PARKIR — Smart Parking Finder',
  description: 'Temukan, booking, dan sewakan spot parkir di Jakarta. Real-time availability.',
};

const navItems = [
  { href: '/', label: 'Cari Spot', icon: MapPinned },
  { href: '/list', label: 'Pasang Spot', icon: ListPlus },
  { href: '/bookings', label: 'Booking Saya', icon: CalendarDays },
] as const;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${publicSans.variable} ${dmMono.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
          <header className="sticky top-3 z-40 mb-6 rounded-xl border border-[#3B4A60]/30 bg-[#263244]/90 px-5 py-3 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/15 text-[#2563EB]">
                  <CircleParking size={20} />
                </div>
                <div>
                  <h1 className="text-sm font-bold uppercase tracking-[0.15em] text-[#F3F4F6]">
                    PARKIR<span className="text-[#2563EB]">.</span>
                  </h1>
                  <p className="text-[10px] text-[#9CA3AF]">Smart Parking Jakarta</p>
                </div>
              </Link>
              <nav className="flex gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-full border border-[#3B4A60]/30 px-4 py-2 text-xs font-medium text-[#9CA3AF] transition-all hover:border-[#2563EB]/30 hover:text-[#F3F4F6]"
                    >
                      <Icon size={14} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
