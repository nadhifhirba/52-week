import type { Metadata } from 'next';
import Link from 'next/link';
import { Recycle } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'TRASH_TREASURE',
  description: 'TrashTreasure - Waste bank digitization',
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/setor', label: 'Setor' },
  { href: '/jemput', label: 'Jemput' },
  { href: '/edukasi', label: 'Edukasi' },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <div className="shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand" aria-label="TRASH_TREASURE">
                <span className="brand-mark">
                  <Recycle size={22} />
                </span>
                <span className="brand-title">
                  <span>TRASH_TREASURE</span>
                  <span>Waste bank digitization</span>
                </span>
              </Link>
              <nav className="nav" aria-label="Navigasi utama">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
