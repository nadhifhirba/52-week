"use client";

import { Calculator, Package, DollarSign, FileText, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    href: "/calculator",
    icon: Calculator,
    bg: "#FFF0F0",
    color: "#E60012",
    title: "Kalkulator Bea Cukai",
    desc: "Hitung pajak impor barang jastip real-time. Pantau batas $500 dan bea masuk otomatis.",
    stat: "PMK 34/2025",
  },
  {
    href: "/orders",
    icon: Package,
    bg: "#F0F7F6",
    color: "#00857C",
    title: "Manajer Pesanan",
    desc: "Lacak semua pesanan pelanggan dalam satu tempat. Tidak perlu lagi chat WhatsApp berantakan.",
    stat: "Offline-first",
  },
  {
    href: "/margin",
    icon: DollarSign,
    bg: "#FFF8F0",
    color: "#E67E00",
    title: "Kalkulator Margin",
    desc: "Tentukan harga jual dari target keuntungan. Hitung mundur yang smart dan akurat.",
    stat: "Real-time",
  },
  {
    href: "/summary",
    icon: FileText,
    bg: "#F0F4FF",
    color: "#3B6FE6",
    title: "Ringkasan Perjalanan",
    desc: "Generate ringkasan pesanan per pelanggan. Format rapi, siap kirim ke WhatsApp.",
    stat: "One tap share",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#E5E0D8] sm:p-12">
        <div className="relative z-10 max-w-2xl space-y-5">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F0] px-3 py-1 text-xs font-bold text-[#E60012]">
            <Sparkles className="h-3 w-3" />
            Gratis · Offline-First
          </span>

          {/* Title */}
          <h1
            className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-zen-kaku)" }}
          >
            Tools lengkap untuk{" "}
            <span className="text-[#E60012]">personal shopper</span> Indonesia
          </h1>

          <p className="text-base leading-relaxed text-[#6B6B6B] sm:text-lg">
            Hitung bea cukai, kelola pesanan, atur margin — semua dalam satu
            tempat. Tanpa daftar, tanpa server. Data Anda tetap di browser.
          </p>

          {/* Quick CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-full bg-[#E60012] px-6 py-3 text-sm font-bold text-white shadow-sm shadow-red-200 transition-all hover:bg-[#CC0010] hover:shadow-md"
            >
              <Calculator className="h-4 w-4" />
              Mulai Hitung Bea Cukai
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E0D8] bg-white px-6 py-3 text-sm font-bold text-[#1A1A1A] transition-all hover:bg-[#F5F3EF] hover:shadow-sm"
            >
              <Package className="h-4 w-4" />
              Kelola Pesanan
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-4 pt-4 text-xs text-[#999]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00857C]" />
              Data Tersimpan Lokal
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00857C]" />
              PMK 34/2025 Compliant
            </span>
          </div>
        </div>

        {/* Decorative element — barcode */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="flex gap-[3px]">
            {[4, 2, 6, 1, 3, 5, 2, 8, 4, 1, 3, 7, 2, 5, 1, 4, 3, 6, 2, 2].map(
              (w, i) => (
                <div
                  key={i}
                  className="bg-[#E5E0D8]"
                  style={{ width: `${w * 2}px`, height: "120px", borderRadius: "1px" }}
                />
              )
            )}
          </div>
          <p className="mt-2 text-center font-mono text-[10px] tracking-[0.2em] text-[#CCC]">
            4 901234 567890
          </p>
        </div>
      </section>

      {/* ── Tool Grid ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2
            className="text-lg font-black tracking-tight"
            style={{ fontFamily: "var(--font-zen-kaku)" }}
          >
            Pilih Tools
          </h2>
          <span className="rounded-full bg-[#F5F3EF] px-2.5 py-0.5 text-[11px] font-bold text-[#999]">
            {tools.length}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="shelf-card group flex flex-col gap-4 p-6"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="tool-icon-circle"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: tool.color }}
                    />
                  </div>
                  <span className="rounded-full bg-[#F5F3EF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#BBB]">
                    {tool.stat}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3
                    className="text-base font-black leading-tight tracking-tight"
                    style={{ fontFamily: "var(--font-zen-kaku)" }}
                  >
                    {tool.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6B6B6B]">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-[#BBB] transition-colors group-hover:text-[#E60012]">
                  <span>Buka</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Barcode Divider ── */}
      <div className="barcode-divider" />

      {/* ── Bottom Info ── */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="shelf-card p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#BBB]">
            Tanpa Daftar
          </p>
          <p className="mt-1 text-sm text-[#6B6B6B]">
            Langsung pakai. Tidak perlu akun.
          </p>
        </div>
        <div className="shelf-card p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#BBB]">
            Offline-First
          </p>
          <p className="mt-1 text-sm text-[#6B6B6B]">
            Data Anda tetap di browser lokal.
          </p>
        </div>
        <div className="shelf-card p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#BBB]">
            Selalu Gratis
          </p>
          <p className="mt-1 text-sm text-[#6B6B6B]">
            Tools untuk komunitas jastip Indonesia.
          </p>
        </div>
      </section>
    </div>
  );
}
