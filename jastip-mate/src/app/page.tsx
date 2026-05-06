"use client";

import { Calculator, Package, DollarSign, FileText } from "lucide-react";

const cards = [
  { href: "/calculator", icon: Calculator, title: "Kalkulator Bea Cukai", desc: "Hitung pajak impor barang jastip real-time. Pantau batas $500." },
  { href: "/orders", icon: Package, title: "Manajer Pesanan", desc: "Lacak semua pesanan pelanggan dalam satu tempat. Ganti dari chat WhatsApp." },
  { href: "/margin", icon: DollarSign, title: "Kalkulator Margin", desc: "Tentukan harga jual dari target keuntungan. Hitung mundur yang smart." },
  { href: "/summary", icon: FileText, title: "Ringkasan Perjalanan", desc: "Generate ringkasan pesanan per pelanggan. Siap kirim WhatsApp." },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="scanline rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="font-mono text-2xl font-bold tracking-tight">
          <span className="text-accent">Jastip Mate</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Tools lengkap buat personal shopper Indonesia. Hitung bea cukai, kelola pesanan, 
          dan atur margin — semua gratis, offline-first.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="group rounded-lg border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-accent/50 hover:bg-zinc-900/80"
          >
            <c.icon className="mb-3 h-8 w-8 text-accent" />
            <h3 className="font-mono text-sm font-bold text-zinc-200">{c.title}</h3>
            <p className="mt-1 text-xs text-zinc-500">{c.desc}</p>
          </a>
        ))}
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-center font-mono text-xs text-zinc-600">
          PMK 34/2025 • Batas Bebas Bea Masuk USD 500 • Data tersimpan lokal di browser Anda
        </p>
      </div>
    </div>
  );
}
