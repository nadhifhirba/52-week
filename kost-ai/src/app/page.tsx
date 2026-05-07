"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BedDouble, CookingPot, Sofa, Sparkles, WandSparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDesignStore } from '@/lib/store';

const roomTypes = ['Kamar Tidur', 'Ruang Tamu', 'Dapur Mini', 'Kamar Mandi', 'Area Kerja'] as const;
const dimensions = ['3x3', '3x4', '4x4', 'custom'] as const;
const styles = ['Minimalis', 'Japandi', 'Industrial', 'Skandinavia', 'Bohemian', 'Modern'] as const;
const colors = ['Netral hangat', 'Putih bersih', 'Kayu alami', 'Abu gelap', 'Pastel lembut', 'Hitam elegan'] as const;

const iconMap: Record<string, typeof BedDouble> = {
  'Kamar Tidur': BedDouble, 'Ruang Tamu': Sofa, 'Dapur Mini': CookingPot,
  'Kamar Mandi': Sparkles, 'Area Kerja': WandSparkles,
};

const fmt = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

export default function HomePage() {
  const router = useRouter();
  const designs = useDesignStore((s) => s.designs);
  const [roomType, setRoomType] = useState<(typeof roomTypes)[number]>('Kamar Tidur');
  const [dim, setDim] = useState<(typeof dimensions)[number]>('3x3');
  const [style, setStyle] = useState<(typeof styles)[number]>('Japandi');
  const [color, setColor] = useState<(typeof colors)[number]>('Netral hangat');

  const RoomIcon = iconMap[roomType] ?? Sparkles;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="rounded-2xl border border-[#E8E3DA] bg-white p-8 sm:p-12">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9CAF88]/10 px-3 py-1 text-xs font-semibold text-[#5C4033]">
            <WandSparkles size={12} /> AI-Powered Design
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ fontFamily: "var(--font-outfit)" }}>
            Desain interior kos impian,{" "}
            <span style={{ color: "#9CAF88" }}>dengan AI</span>
          </h1>
          <p className="text-[#7A7268] leading-relaxed max-w-lg">
            Pilih tipe ruangan, gaya, dan warna. AI akan generate desain interior yang sesuai — lengkap dengan rekomendasi produk.
          </p>
        </div>
      </section>

      {/* Design form */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Room type */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2D2A26]">Tipe Ruangan</label>
          <div className="grid grid-cols-2 gap-2">
            {roomTypes.map((t) => {
              const Icon = iconMap[t] ?? Sparkles;
              return (
                <button
                  key={t}
                  onClick={() => setRoomType(t)}
                  className={`style-card flex flex-col items-center gap-1.5 py-3 ${roomType === t ? 'selected' : ''}`}
                >
                  <Icon size={18} className={roomType === t ? 'text-[#9CAF88]' : 'text-[#C4B5A5]'} />
                  <span className="text-[11px] font-medium">{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Style */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2D2A26]">Gaya</label>
          <div className="flex flex-wrap gap-1.5">
            {styles.map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  style === s
                    ? 'border-[#9CAF88] bg-[#9CAF88]/10 text-[#5C4033]'
                    : 'border-[#E8E3DA] text-[#7A7268] hover:border-[#C4B5A5]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#2D2A26]">Warna</label>
          <div className="flex flex-wrap gap-1.5">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  color === c
                    ? 'border-[#9CAF88] bg-[#9CAF88]/10 text-[#5C4033]'
                    : 'border-[#E8E3DA] text-[#7A7268] hover:border-[#C4B5A5]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Generate CTA */}
        <div className="flex flex-col justify-end">
          <Link
            href={`/generate?room=${roomType}&dim=${dim}&style=${style}&color=${color}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5C4033] px-6 py-4 text-sm font-bold text-white transition-all hover:bg-[#3D2A22] hover:shadow-lg"
          >
            <WandSparkles size={16} />
            Generate Desain
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Dimension */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-[#2D2A26]">Ukuran:</span>
        {dimensions.map((d) => (
          <button
            key={d}
            onClick={() => setDim(d)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              dim === d
                ? 'border-[#9CAF88] bg-[#9CAF88]/10 text-[#5C4033]'
                : 'border-[#E8E3DA] text-[#7A7268] hover:border-[#C4B5A5]'
            }`}
          >
            {d === 'custom' ? 'Custom' : `${d} m`}
          </button>
        ))}
      </div>

      {/* Saved designs */}
      {designs.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
            Desain Tersimpan
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {designs.slice(0, 3).map((d) => (
              <Link key={d.id} href={`/design/${d.id}`} className="room-card group">
                <div className="aspect-[4/3] bg-[#F5F2ED] flex items-center justify-center">
                  <RoomIcon size={40} className="text-[#C4B5A5]" />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-semibold text-[#2D2A26]">{d.title || `${d.roomType} ${d.style}`}</h3>
                  <p className="text-sm text-[#7A7268]">{d.style} · {d.colorPalette}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
