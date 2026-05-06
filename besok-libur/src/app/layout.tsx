import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist_Mono, Inter } from "next/font/google";
import Link from "next/link";
import { CalendarDays, Heart, House, Ticket } from "lucide-react";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "BESOK_LIBUR — Besok Libur Apa",
  description: "Temukan acara seru besok — atau kapan aja.",
};

const navItems = [
  { href: "/", label: "Feed", icon: House },
  { href: "/saved", label: "Tersimpan", icon: Heart },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} bg-zinc-950 text-zinc-50 antialiased`}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,107,0,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_20%)]">
          <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FF6B00]/50 bg-[#FF6B00] text-sm font-black text-zinc-950 shadow-[4px_4px_0_0_rgba(255,255,255,0.08)]">
                  BL
                </span>
                <span>
                  <span className="block text-lg font-black tracking-[0.28em] text-zinc-50">BESOK_LIBUR</span>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.34em] text-zinc-400">
                    Weekend event discovery
                  </span>
                </span>
              </Link>

              <nav className="flex items-center gap-2 sm:gap-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm font-bold text-zinc-100 transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>

          <footer className="border-t border-zinc-800/80 bg-zinc-950/90">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#FF6B00]" />
                <span>Curated weekend events for Jakarta and beyond.</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                <Ticket className="h-4 w-4 text-[#FF6B00]" />
                Neo-Industrial Brutalism
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
