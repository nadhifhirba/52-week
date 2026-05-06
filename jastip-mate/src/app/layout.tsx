import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jastip Mate",
  description: "Kalkulator bea cukai & manajer pesanan untuk personal shopper Indonesia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen antialiased">
        <header className="scanline border-b border-zinc-800 bg-zinc-950 px-4 py-3">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <a href="/" className="font-mono text-sm font-bold tracking-wider text-accent">
              JASTIP<span className="text-zinc-500">_MATE</span>
            </a>
            <nav className="flex gap-4 font-mono text-xs text-zinc-400">
              <a href="/calculator" className="hover:text-accent transition-colors">Kalkulator</a>
              <a href="/orders" className="hover:text-accent transition-colors">Pesanan</a>
              <a href="/margin" className="hover:text-accent transition-colors">Margin</a>
              <a href="/summary" className="hover:text-accent transition-colors">Ringkasan</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
