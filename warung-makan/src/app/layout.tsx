import type { Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { Cormorant_Garamond, Proza_Libre } from "next/font/google";
import { ChefHat, Compass, Info, PlusCircle } from "lucide-react";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const proza = Proza_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-proza",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warung Makan — Discover by Feeling",
  description: "Tag-based food discovery untuk cari warung sesuai mood di Jakarta.",
  openGraph: {
    title: "Warung Makan — Discover by Feeling",
    description: "Find warung by mood, not just location.",
  },
};

const navItems = [
  { href: "/", label: "Jelajah", icon: Compass },
  { href: "/add", label: "Tambah", icon: PlusCircle },
  { href: "/about", label: "Tentang", icon: Info },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${proza.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-12 pt-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="sticky top-3 z-40 mb-8 rounded-2xl border border-[#E8E0D5] bg-white/90 px-5 py-3 shadow-sm backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C62828] text-white shadow-sm">
                  <ChefHat className="h-5 w-5" />
                </span>
                <div>
                  <h1
                    className="text-xl font-bold leading-none tracking-tight text-[#2D2D2D]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    Warung Makan
                  </h1>
                  <p className="text-[11px] text-[#A3A0A0] uppercase tracking-[0.15em]">
                    Discover by feeling
                  </p>
                </div>
              </Link>

              <nav className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-center gap-2 rounded-full border border-[#E8E0D5] px-4 py-2 text-sm font-medium text-[#6B6B6B] transition-all hover:border-[#C62828] hover:bg-[#FFF8F0] hover:text-[#2D2D2D]"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="mt-16 border-t border-[#E8E0D5] pt-6 text-center text-xs text-[#A3A0A0]">
            <p>Warung Makan · Made with love for Indonesian food explorers · © 2026</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
