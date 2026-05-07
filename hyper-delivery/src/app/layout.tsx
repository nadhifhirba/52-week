import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Outfit, Fira_Code } from 'next/font/google';
import { Truck } from 'lucide-react';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-outfit', display: 'swap' });
const fira = Fira_Code({ subsets: ['latin'], weight: ['400','500'], variable: '--font-fira', display: 'swap' });

export const metadata: Metadata = { title: 'Hyper Delivery — Group Shipping', description: 'Patungan ongkir. Bikin grup belanja, split biaya kirim.' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${fira.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-4 sm:px-6">
          <header className="mb-6 flex items-center justify-between rounded-xl border border-[#2D3A5C]/30 bg-[#212840]/90 px-5 py-3 backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF6B35]/15 text-[#FF6B35]"><Truck size={18} /></div>
              <div><h1 className="text-sm font-bold tracking-tight text-[#E2E8F0]" style={{fontFamily:"var(--font-outfit)"}}>Hyper<span className="text-[#FF6B35]">Delivery</span></h1><p className="text-[10px] text-[#94A3B8]">Group Shipping</p></div>
            </Link>
            <nav className="flex gap-1.5">
              {[{href:'/',label:'Dashboard'},{href:'/history',label:'Riwayat'}].map(i=>(
                <Link key={i.href} href={i.href} className="rounded-full border border-[#2D3A5C]/30 px-4 py-2 text-xs font-medium text-[#94A3B8] transition-all hover:border-[#FF6B35]/30 hover:text-[#E2E8F0]">{i.label}</Link>
              ))}
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
