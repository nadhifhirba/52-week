import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Zen_Kaku_Gothic_New, Noto_Sans } from "next/font/google";
import Link from "next/link";
import { Calculator, FileText, Package, Receipt } from "lucide-react";

import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jastip Mate — Personal Shopper Tools",
  description:
    "Kalkulator bea cukai & manajer pesanan untuk personal shopper Indonesia",
};

const navItems = [
  { href: "/calculator", label: "Kalkulator", icon: Calculator },
  { href: "/orders", label: "Pesanan", icon: Package },
  { href: "/margin", label: "Margin", icon: Receipt },
  { href: "/summary", label: "Ringkasan", icon: FileText },
];

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${zenKaku.variable} ${notoSans.variable} bg-[#FAFAFA] text-[#1A1A1A] antialiased`}
      >
        <div className="min-h-screen">
          {/* Header — clean storefront bar */}
          <header className="sticky top-0 z-50 border-b border-[#E5E0D8] bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <Link href="/" className="group flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E60012] text-sm font-black text-white shadow-sm shadow-red-200 transition-transform group-hover:scale-105">
                  JM
                </span>
                <span className="hidden sm:block">
                  <span
                    className="block text-base font-black tracking-tight text-[#1A1A1A]"
                    style={{ fontFamily: "var(--font-zen-kaku)" }}
                  >
                    Jastip Mate
                  </span>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-[#999]">
                    Shopper Toolkit
                  </span>
                </span>
              </Link>

              <nav className="flex items-center gap-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-[#6B6B6B] transition-all hover:bg-[#F5F3EF] hover:text-[#1A1A1A] sm:px-4"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
            {children}
          </main>

          {/* Receipt-style footer */}
          <footer className="receipt-footer mt-16">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-center sm:px-6">
              <p className="text-[11px] leading-relaxed">
                PMK 34/2025 · Batas Bebas Bea Masuk USD 500 · Data tersimpan
                lokal di browser Anda
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#BBB]">
                JASTIP MATE v1.0 — Made for Indonesian Personal Shoppers
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
