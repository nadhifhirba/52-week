import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "SURAT_MENYURAT",
  description: "Surat Menyurat Helper - template surat resmi Indonesia",
};

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/#templates", label: "Template" },
  { href: "/saved", label: "Tersimpan" },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${geistMono.variable}`}>
      <body>
        <div className="app-shell">
          <header className="topbar">
            <div className="brand">
              <div className="brand-mark">SM</div>
              <div className="brand-title">
                <strong>SURAT_MENYURAT</strong>
                <span>Pembuat template surat resmi Indonesia</span>
              </div>
            </div>
            <nav className="nav" aria-label="Navigasi utama">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
