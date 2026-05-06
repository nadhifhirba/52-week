"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Generator' },
  { href: '/inspirasi', label: 'Inspirasi' },
  { href: '/produk', label: 'Produk' },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Navigasi utama">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} data-active={active ? 'true' : 'false'}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
