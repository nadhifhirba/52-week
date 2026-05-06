import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteNav } from '@/components/site-nav';
import './globals.css';

export const metadata: Metadata = {
  title: 'KOST.AI',
  description: 'AI interior design untuk ruang kecil dengan gaya modern dan hemat tempat.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <header className="topbar">
          <div className="shell topbar-inner">
            <a href="/" className="brand" aria-label="KOST.AI beranda">
              <span className="brand-badge" aria-hidden="true" />
              <span>KOST_AI</span>
            </a>
            <SiteNav />
          </div>
        </header>
        {children}
        <footer className="footer shell">KOST.AI — ide desain kos yang lebih cepat, lebih rapi, lebih hemat tempat.</footer>
      </body>
    </html>
  );
}
