import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Be_Vietnam_Pro, Space_Mono } from 'next/font/google';
import { Bike } from 'lucide-react';
import './globals.css';

const be = Be_Vietnam_Pro({ subsets:['latin'],weight:['400','500','600','700','800'],variable:'--font-be-vietnam',display:'swap' });
const mono = Space_Mono({ subsets:['latin'],weight:['400','700'],variable:'--font-space-mono',display:'swap' });

export const metadata: Metadata = { title: 'Ojol Tools — Driver Dashboard', description: 'Dashboard pengemudi ojek online. Lacak penghasilan, rute, komunitas.' };

export default function RootLayout({ children }:Readonly<{children:ReactNode}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${be.variable} ${mono.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-4 sm:px-6">
          <header className="mb-6 flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#1A1A1A]/90 px-5 py-3 backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00AA13]/15 text-[#00AA13] green-glow"><Bike size={18} /></div>
              <div><h1 className="text-sm font-bold tracking-tight text-[#F5F5F5]" style={{fontFamily:"var(--font-be-vietnam)"}}>Ojol<span className="text-[#00AA13]">Tools</span></h1><p className="text-[10px] text-[#A0A0A0]">Driver Dashboard</p></div>
            </Link>
            <nav className="flex gap-1.5">
              {[{href:'/',label:'Dashboard'},{href:'/community',label:'Komunitas'},{href:'/routes',label:'Rute'}].map(i=>(
                <Link key={i.href} href={i.href} className="rounded-full border border-white/[0.06] px-4 py-2 text-xs font-medium text-[#A0A0A0] transition-all hover:border-[#00AA13]/30 hover:text-[#F5F5F5]">{i.label}</Link>
              ))}
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
