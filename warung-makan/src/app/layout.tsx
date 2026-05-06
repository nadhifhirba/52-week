import type { Metadata } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import { ChefHat, Compass, Info, PlusCircle } from "lucide-react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Warung Makan by Feeling",
  description: "Tag-based food discovery untuk cari warung sesuai mood.",
};

const navItems = [
  { href: "/", label: "Jelajah", icon: Compass },
  { href: "/add", label: "Tambah", icon: PlusCircle },
  { href: "/about", label: "Tentang", icon: Info },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-transparent text-zinc-50 antialiased">
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
          <header className="sticky top-0 z-40 mb-5 rounded-3xl border border-white/8 bg-zinc-950/75 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 text-zinc-950 shadow-[0_12px_36px_rgba(249,115,22,0.35)]">
                  <ChefHat className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300/90">Warung Makan</p>
                  <h1 className="text-lg font-black tracking-[0.18em] text-white sm:text-xl">WARUNG_MAKAN</h1>
                </div>
              </Link>

              <nav className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-white/8 bg-white/[0.04] px-3 py-2 text-sm font-medium text-zinc-200 transition hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-white"
                    >
                      <Icon className="h-4 w-4 text-orange-300" />
                      <span>{item.label}</span>
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
