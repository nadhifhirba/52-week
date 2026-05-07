import type { ReactNode } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'CARI_KOS — Premium Boarding House Finder',
  description: 'Find your perfect kos with style. Swipe through curated listings in Jakarta.',
  openGraph: {
    title: 'CARI_KOS — Premium Boarding House Finder',
    description: 'Find your perfect kos with style.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable}`}>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
