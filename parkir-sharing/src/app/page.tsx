'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Filter, Layers3, MapPin, MoveDown, SlidersHorizontal } from 'lucide-react';
import {
  availabilityLabel,
  availabilityTone,
  distanceFromMonas,
  formatDistance,
  priceLevel,
  SectionHeading,
  SpotCard,
  StatCard,
  isAvailableNow,
} from '@/components/parking-ui';
import { formatRupiah, useParkingStore } from '@/lib/store';

const filterOpts = [
  { value: 'all', label: 'Semua' },
  { value: 'available', label: 'Tersedia' },
  { value: '24h', label: '24 Jam' },
] as const;

export default function HomePage() {
  const spots = useParkingStore((state) => state.spots);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [maxDist, setMaxDist] = useState(20);
  const [avail, setAvail] = useState<(typeof filterOpts)[number]['value']>('all');

  const metrics = useMemo(() => {
    const availableCount = spots.filter((s) => isAvailableNow(s.availableHours)).length;
    const cheapest = [...spots].sort((a, b) => a.pricePerHour - b.pricePerHour)[0];
    return { availableCount, cheapest };
  }, [spots]);

  const filtered = useMemo(() => {
    return spots
      .map((spot) => ({ spot, distance: distanceFromMonas(spot) }))
      .filter(({ spot, distance }) => {
        const byPrice = spot.pricePerHour <= maxPrice;
        const byDist = distance <= maxDist;
        const byAvail = avail === 'all' ? true : avail === 'available' ? isAvailableNow(spot.availableHours) : spot.availableHours.toLowerCase().includes('24');
        return byPrice && byDist && byAvail;
      })
      .sort((a, b) => a.distance - b.distance);
  }, [avail, maxDist, maxPrice, spots]);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl border border-[#3B4A60]/30 bg-[#263244] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/10 px-3 py-1.5 text-xs font-semibold text-[#BFDBFE]">
              <Filter size={13} />
              Smart Parking Jakarta
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#F3F4F6] sm:text-4xl">
                Temukan parkir{" "}
                <span className="text-[#2563EB]">terdekat</span>, cepat, aman.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">
                Filter harga, jarak, dan jam tersedia langsung dari mobile.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/list" className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-600">
                Pasang Spot <MoveDown size={14} className="-rotate-90" />
              </Link>
              <Link href="/bookings" className="transit-pill">
                Booking Saya
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="transit-card text-center">
                <div className="data-mono text-2xl font-bold text-[#F3F4F6]">{spots.length}</div>
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.12em] mt-1">Total Spots</div>
              </div>
              <div className="transit-card text-center">
                <div className="data-mono text-2xl font-bold text-[#22C55E]">{metrics.availableCount}</div>
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.12em] mt-1">Available</div>
              </div>
              <div className="transit-card text-center">
                <div className="data-mono text-2xl font-bold text-[#F3F4F6]">{formatRupiah(metrics.cheapest.pricePerHour)}</div>
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.12em] mt-1">Mulai dari</div>
              </div>
            </div>
          </div>

          {/* Mini map */}
          <div className="rounded-xl border border-[#3B4A60]/30 bg-[#1F2937] p-4">
            <p className="mb-3 text-xs font-semibold text-[#9CA3AF] uppercase tracking-[0.15em]">
              <Layers3 size={12} className="inline mr-1.5" />
              Peta Spot — Jakarta Pusat
            </p>
            <div className="relative h-[280px] overflow-hidden rounded-lg bg-[#1F2937] bg-[linear-gradient(rgba(59,74,96,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,74,96,0.2)_1px,transparent_1px)] bg-[size:40px_40px]">
              {filtered.slice(0, 8).map(({ spot }, i) => {
                const x = 15 + (i % 4) * 22;
                const y = 15 + Math.floor(i / 4) * 40;
                return (
                  <Link
                    key={spot.id}
                    href={`/spot/${spot.id}`}
                    className="group absolute flex flex-col items-center"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span className={`block h-4 w-4 rounded-full border-2 border-white shadow-md ${availabilityTone(spot.availableHours)}`} />
                    <span className="mt-1 data-mono text-[9px] text-[#9CA3AF] group-hover:text-[#F3F4F6]">
                      {formatRupiah(spot.pricePerHour)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl border border-[#3B4A60]/30 bg-[#263244] p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[#9CA3AF]">Harga max</span>
              <span className="data-mono text-[#2563EB]">{formatRupiah(maxPrice)}</span>
            </div>
            <input type="range" min={8000} max={40000} step={1000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[#2563EB]" />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[#9CA3AF]">Jarak max</span>
              <span className="data-mono text-[#2563EB]">{maxDist} km</span>
            </div>
            <input type="range" min={1} max={25} step={1} value={maxDist} onChange={(e) => setMaxDist(+e.target.value)} className="w-full accent-[#2563EB]" />
          </div>
          <div>
            <div className="mb-2 text-xs text-[#9CA3AF]">Status</div>
            <div className="flex gap-1.5">
              {filterOpts.map((o) => (
                <button key={o.value} onClick={() => setAvail(o.value)} className={`transit-pill text-xs ${avail === o.value ? 'active' : ''}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#F3F4F6]">Spot Parkir Tersedia</h2>
          <span className="data-mono text-xs text-[#9CA3AF]">{filtered.length} ditemukan</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(({ spot }) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#3B4A60]/50 p-10 text-center">
            <MapPin size={28} className="mx-auto mb-3 text-[#6B7280]" />
            <p className="text-[#9CA3AF]">Tidak ada spot dengan filter ini.</p>
          </div>
        )}
      </section>
    </div>
  );
}
