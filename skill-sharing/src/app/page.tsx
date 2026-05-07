'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Search, Star, Users } from 'lucide-react';
import { useSkillStore } from '@/lib/store';

const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const dateFmt = new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

const sorts = [
  { value: 'date-asc', label: 'Terdekat' },
  { value: 'price-asc', label: 'Termurah' },
  { value: 'price-desc', label: 'Termahal' },
] as const;

export default function HomePage() {
  const workshops = useSkillStore((s) => s.workshops);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Semua');
  const [sort, setSort] = useState<(typeof sorts)[number]['value']>('date-asc');

  const cats = useMemo(() => ['Semua', ...new Set(workshops.map((w) => w.category))], [workshops]);

  const filtered = useMemo(() => {
    let list = [...workshops];
    if (cat !== 'Semua') list = list.filter((w) => w.category === cat);
    if (q.trim()) list = list.filter((w) => w.title.toLowerCase().includes(q.toLowerCase()));
    if (sort === 'date-asc') list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [workshops, cat, q, sort]);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative border-2 border-[#1A1A1A] bg-[#1E40AF] p-8 text-white sm:p-12">
        <div className="absolute right-6 top-6 h-24 w-24 geo-circle bg-[#E03131]/40" />
        <div className="absolute bottom-6 right-32 h-16 w-16 geo-circle bg-[#F5D000]/30" />
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="inline-block border-2 border-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-bebas)" }}>
            Creative Workshop
          </span>
          <h1 className="text-4xl leading-[1.05] sm:text-5xl" style={{ fontFamily: "var(--font-bebas)" }}>
            Belajar skill baru dari{" "}
            <span style={{ color: "#F5D000" }}>kreator</span> terbaik
          </h1>
          <p className="text-sm text-blue-100">Temukan workshop kreatif di Jakarta. Booking langsung, belajar langsung.</p>
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Cari workshop..."
              className="w-full rounded border-2 border-white bg-white py-2.5 pl-10 pr-4 text-sm text-[#1A1A1A] placeholder:text-[#999] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`bauhaus-pill ${cat === c ? 'active' : ''}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Sort + count */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {sorts.map((s) => (
            <button key={s.value} onClick={() => setSort(s.value)} className={`bauhaus-pill text-xs ${sort === s.value ? 'active' : ''}`}>
              {s.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-[#555]">{filtered.length} workshop</span>
      </div>

      {/* Workshop grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((w) => (
          <Link key={w.id} href={`/workshop/${w.id}`} className="bauhaus-card group flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <span className="border-2 border-[#1A1A1A] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-bebas)" }}>
                {w.category}
              </span>
              <span className="flex items-center gap-1 text-sm font-bold">
                <Star size={12} fill="#F5D000" color="#F5D000" /> {w.rating.toFixed(1)}
              </span>
            </div>
            <h3 className="text-lg font-bold leading-tight" style={{ fontFamily: "var(--font-bebas)" }}>
              {w.title}
            </h3>
            <div className="flex flex-wrap gap-3 text-xs text-[#555]">
              <span className="flex items-center gap-1"><CalendarDays size={11} />{dateFmt.format(new Date(w.date))}</span>
              <span className="flex items-center gap-1"><MapPin size={11} />{w.location || 'Jakarta'}</span>
            </div>
            <div className="mt-auto flex items-center justify-between pt-2 border-t-2 border-[#1A1A1A]">
              <span className="text-lg font-bold">{currency.format(w.price)}</span>
              <span className="flex items-center gap-1 text-xs font-bold text-[#E03131] opacity-0 transition-opacity group-hover:opacity-100">
                Detail <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
