'use client';

import Link from 'next/link';
import { ArrowRight, Bike, Clock3, MapPin, Star, Zap } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { useLaundryStore } from '@/lib/store';
import { type Laundry } from '@/lib/seed';

const userLocation = { lat: -6.2088, lng: 106.8456 };

type SortKey = 'distance' | 'price' | 'rating';
type StatusFilter = 'all' | 'open' | 'busy' | 'full';

const statusMeta: Record<Laundry['status'], { label: string; tone: string }> = {
  open: { label: 'Tersedia', tone: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  busy: { label: 'Padat', tone: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  full: { label: 'Penuh', tone: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
};

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.sqrt(a));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDistance(value: number) {
  return `${value < 1 ? value * 1000 : value.toFixed(1)}${value < 1 ? ' m' : ' km'}`;
}

export default function DashboardPage() {
  const laundries = useLaundryStore((state) => state.laundries);
  const [sortBy, setSortBy] = useState<SortKey>('distance');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const enrichedLaundries = useMemo(
    () =>
      laundries.map((laundry) => {
        const distanceKm = haversineKm(userLocation.lat, userLocation.lng, laundry.lat, laundry.lng);
        const utilization = Math.round((laundry.current_load_kg / laundry.capacity_kg) * 100);
        return { ...laundry, distanceKm, utilization };
      }),
    [laundries],
  );

  const filtered = useMemo(() => {
    const list = enrichedLaundries.filter((laundry) => {
      if (statusFilter === 'all') return true;
      return laundry.status === statusFilter;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'price') return a.price_per_kg - b.price_per_kg;
      return b.rating - a.rating;
    });
  }, [enrichedLaundries, sortBy, statusFilter]);

  const openCount = laundries.filter((item) => item.status === 'open').length;
  const busyCount = laundries.filter((item) => item.status === 'busy').length;
  const fullCount = laundries.filter((item) => item.status === 'full').length;
  const averageRating = laundries.reduce((sum, item) => sum + item.rating, 0) / laundries.length;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">
              <Zap className="h-3.5 w-3.5" />
              Real-time capacity monitor
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Cari laundry kiloan terbaik di Jakarta, lalu booking dalam hitungan detik.
              </h1>
              <p className="max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
                Pantau okupansi, bandingkan harga per kg, dan pilih laundry terdekat dengan rating paling stabil.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Siap diproses" value={`${openCount}`} hint="Laundry open" />
              <Stat label="Sedang ramai" value={`${busyCount}`} hint="Butuh antrian" />
              <Stat label="Hampir penuh" value={`${fullCount}`} hint="Waspada load" />
              <Stat label="Rata-rata rating" value={averageRating.toFixed(1)} hint="Dari 5.0" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300 sm:min-w-[260px]">
            <div className="flex items-center gap-2 text-orange-300">
              <Bike className="h-4 w-4" />
              Area aktif
            </div>
            <p className="mt-3 text-2xl font-bold text-white">Jakarta Selatan & sekitarnya</p>
            <p className="mt-2 text-zinc-400">Hitung jarak dari Monas sebagai titik referensi supaya urutan lebih relevan.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-zinc-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Urutkan & filter</p>
          <p className="text-xs text-zinc-500">Prioritaskan jarak, harga, atau rating sesuai kebutuhan pelanggan.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['distance', 'price', 'rating'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSortBy(option)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                sortBy === option
                  ? 'border-orange-500/40 bg-orange-500/15 text-orange-200'
                  : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {option === 'distance' ? 'Jarak' : option === 'price' ? 'Harga' : 'Rating'}
            </button>
          ))}
          {(['all', 'open', 'busy', 'full'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatusFilter(option)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                statusFilter === option
                  ? 'border-orange-500/40 bg-orange-500/15 text-orange-200'
                  : 'border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {option === 'all' ? 'Semua' : option === 'open' ? 'Open' : option === 'busy' ? 'Busy' : 'Full'}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        {filtered.map((laundry) => {
          const barColor =
            laundry.utilization < 50
              ? 'bg-emerald-400'
              : laundry.utilization < 80
                ? 'bg-amber-400'
                : 'bg-rose-400';

          return (
            <article
              key={laundry.id}
              className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusMeta[laundry.status].tone}`}>
                      {statusMeta[laundry.status].label}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300">
                      {formatDistance(laundry.distanceKm)} dari kamu
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300">
                      {laundry.open_hours}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">{laundry.name}</h2>
                    <div className="mt-2 flex items-start gap-2 text-sm text-zinc-400">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                      <span>{laundry.address}</span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <InfoCard label="Harga/kg" value={formatCurrency(laundry.price_per_kg)} icon={<Clock3 className="h-4 w-4" />} />
                    <InfoCard label="Rating" value={laundry.rating.toFixed(1)} icon={<Star className="h-4 w-4" />} />
                    <InfoCard label="Kapasitas" value={`${laundry.current_load_kg} / ${laundry.capacity_kg} kg`} icon={<Bike className="h-4 w-4" />} />
                  </div>
                </div>

                <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Okupansi</span>
                    <span className="font-semibold text-white">{laundry.utilization}%</span>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-zinc-800">
                    <div className={`h-3 rounded-full ${barColor}`} style={{ width: `${Math.min(laundry.utilization, 100)}%` }} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {laundry.utilization < 50
                      ? 'Masih longgar. Cocok untuk booking cepat.'
                      : laundry.utilization < 80
                        ? 'Load cukup ramai, tapi masih aman untuk slot harian.'
                        : 'Mendekati penuh. Booking sebaiknya segera.'}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/booking/${laundry.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
                    >
                      Booking
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/status"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
                    >
                      Status
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-zinc-400">{hint}</p>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-zinc-500">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
