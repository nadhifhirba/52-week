import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'CARI_KOS',
  description: 'Cari kos reimagined, swipe-style dan mobile-first.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>
        <main className="app-shell">
          <div className="phone-frame">{children}</div>
        </main>
      </body>
    </html>
  );
}
