import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Lora, Crimson_Text } from "next/font/google";
import { ScrollText } from "lucide-react";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"], weight: ["400", "600", "700"],
  variable: "--font-lora", display: "swap",
});

const crimson = Crimson_Text({
  subsets: ["latin"], weight: ["400", "600", "700"],
  variable: "--font-crimson", display: "swap",
});

export const metadata: Metadata = {
  title: "Surat Menyurat — Template Surat Resmi Indonesia",
  description: "Buat surat resmi Indonesia dengan template yang elegan dan berwibawa.",
};

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/saved", label: "Tersimpan" },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${lora.variable} ${crimson.variable}`}>
        <div className="batik-bg min-h-screen">
          <header className="sticky top-0 z-40 border-b border-[#D4C4A8] bg-[#F9F0DD]/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="stamp shrink-0" style={{ width: 36, height: 36, fontSize: 6 }}>
                  SM
                </div>
                <div>
                  <h1 className="text-base font-bold tracking-tight text-[#3C2415]" style={{ fontFamily: "var(--font-lora)" }}>
                    Surat Menyurat
                  </h1>
                  <p className="text-[10px] text-[#A09080] uppercase tracking-[0.12em]">
                    Template Surat Resmi
                  </p>
                </div>
              </Link>
              <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-[#6B5540] transition-all hover:bg-[#D4A853]/10 hover:text-[#3C2415]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">{children}</main>
          <footer className="border-t border-[#D4C4A8] py-6 text-center text-[11px] text-[#A09080]">
            Surat Menyurat · Arsip Digital Surat Resmi Indonesia · 2026
          </footer>
        </div>
      </body>
    </html>
  );
}
