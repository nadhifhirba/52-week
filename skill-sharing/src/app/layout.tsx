import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'SKILL_SHARING',
  description: 'Marketplace booking workshop untuk belajar langsung dari mentor lokal.',
};

const navItems = [
  { href: '/', label: 'Jelajah' },
  { href: '/create', label: 'Jadi Mentor' },
  { href: '/bookings', label: 'Booking Saya' },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <div className="app-shell">
          <header className="topbar">
            <div className="brand-lockup">
              <div className="brand-mark">S</div>
              <div>
                <p className="eyebrow">Workshop booking platform</p>
                <h1 className="brand-title">SKILL_SHARING</h1>
              </div>
            </div>
            <nav className="nav-row" aria-label="Navigasi utama">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="page-container">{children}</main>
        </div>
      </body>
    </html>
  );
}
