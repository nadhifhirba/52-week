'use client';

import Link from 'next/link';
import { ArrowRight, Bike, Clock3, MapPinned, NotebookPen, Sparkles, TrendingUp } from 'lucide-react';
import { useOjolStore } from '@/lib/store';
import { formatRupiah } from '@/lib/format';

export default function HomePage() {
  const trips = useOjolStore((s) => s.trips);
  const earnings = trips.reduce((s,t) => s + t.earnings, 0);
  const todayTrips = trips.filter(t => { const d = new Date(t.date); const now = new Date(); return d.toDateString() === now.toDateString(); });
  const todayEarnings = todayTrips.reduce((s,t) => s + t.earnings, 0);

  return (
    <div className="space-y-8">
      {/* Earnings hero */}
      <section className="driver-card green-glow p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00AA13]/10 px-3 py-1 text-xs font-bold text-[#00AA13]">
              <TrendingUp size={12} /> Hari Ini
            </span>
            <div>
              <div className="text-xs text-[#A0A0A0] uppercase tracking-[0.12em]">Pendapatan Hari Ini</div>
              <div className="mt-1 text-4xl font-black text-[#00AA13]" style={{fontFamily:"var(--font-space-mono)"}}>
                {formatRupiah(todayEarnings)}
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-[#A0A0A0]">{todayTrips.length} trip</span>
              <span className="text-[#A0A0A0]">Total: {formatRupiah(earnings)}</span>
            </div>
          </div>
          <div className="flex items-end justify-end gap-3">
            <Link href="/calculator" className="rounded-full bg-[#00AA13] px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-green-400">
              <Sparkles size={14} className="inline mr-1.5" />Kalkulator Rute
            </Link>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label:'Total Trip', value:trips.length, icon:Bike, color:'#00AA13' },
          { label:'Rata / Trip', value:formatRupiah(trips.length?earnings/trips.length:0), icon:TrendingUp, color:'#F5A623' },
          { label:'Trip Hari Ini', value:todayTrips.length, icon:Clock3, color:'#3B82F6' },
        ].map(s=>{const I=s.icon;return(
          <div key={s.label} className="driver-card text-center">
            <I size={20} className="mx-auto mb-2" style={{color:s.color}} />
            <div className="text-2xl font-bold" style={{fontFamily:"var(--font-space-mono)"}}>{s.value}</div>
            <div className="text-[10px] text-[#A0A0A0] uppercase tracking-[0.1em] mt-1">{s.label}</div>
          </div>
        )})}
      </div>

      {/* Recent trips */}
      <section>
        <h2 className="mb-3 text-lg font-bold" style={{fontFamily:"var(--font-be-vietnam)"}}>
          <Clock3 size={14} className="inline mr-2 text-[#00AA13]" />Trip Terbaru
        </h2>
        <div className="space-y-2">
          {trips.slice(0,5).map(t=>(
            <div key={t.id} className="driver-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00AA13]/10">
                  <MapPinned size={14} className="text-[#00AA13]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.from} → {t.to}</p>
                  <p className="text-[10px] text-[#A0A0A0]">{t.date} · {t.distance}km</p>
                </div>
              </div>
              <span className="text-sm font-bold text-[#00AA13]" style={{fontFamily:"var(--font-space-mono)"}}>
                {formatRupiah(t.earnings)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
