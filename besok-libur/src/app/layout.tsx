import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo_Black, DM_Sans } from "next/font/google";
import Link from "next/link";
import { CalendarDays, Heart, House, Sparkles } from "lucide-react";

import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BESOK_LIBUR — Discover What's On",
  description: "Jakarta's best events. Curated. Every weekend.",
  openGraph: {
    title: "BESOK_LIBUR — Discover What's On",
    description: "Jakarta's best events. Curated. Every weekend.",
  },
};

const navItems = [
  { href: "/", label: "Discover", icon: Sparkles },
  { href: "/saved", label: "Saved", icon: Heart },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${dmSans.variable} bg-black text-white antialiased`}
      >
        <div className="glow-mesh min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl saturate-150">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-black text-white shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
                  BL
                </div>
                <div className="hidden sm:block">
                  <span
                    className="block text-lg font-black tracking-tight"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    BESOK_LIBUR
                  </span>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500">
                    Weekend Discovery
                  </span>
                </div>
              </Link>

              <nav className="flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] px-4 py-2 text-sm font-semibold text-zinc-300 transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-white/[0.04] bg-black/60 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-violet-500" />
                <span>Jakarta event discovery. Updated every Friday.</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Powered by the weekend
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
