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

const filterOptions = [
  { value: 'all', label: 'Semua' },
  { value: 'available', label: 'Tersedia sekarang' },
  { value: '24h', label: '24 jam' },
] as const;

export default function HomePage() {
  const spots = useParkingStore((state) => state.spots);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [maxDistance, setMaxDistance] = useState(20);
  const [availability, setAvailability] = useState<(typeof filterOptions)[number]['value']>('all');

  const metrics = useMemo(() => {
    const availableCount = spots.filter((spot) => isAvailableNow(spot.availableHours)).length;
    const averageRating = spots.reduce((sum, spot) => sum + spot.rating, 0) / spots.length;
    const cheapest = [...spots].sort((a, b) => a.pricePerHour - b.pricePerHour)[0];
    return { availableCount, averageRating, cheapest };
  }, [spots]);

  const filteredSpots = useMemo(() => {
    return spots
      .map((spot) => ({ spot, distance: distanceFromMonas(spot) }))
      .filter(({ spot, distance }) => {
        const byPrice = spot.pricePerHour <= maxPrice;
        const byDistance = distance <= maxDistance;
        const byAvailability =
          availability === 'all'
            ? true
            : availability === 'available'
              ? isAvailableNow(spot.availableHours)
              : spot.availableHours.toLowerCase().includes('24');

        return byPrice && byDistance && byAvailability;
      })
      .sort((a, b) => a.distance - b.distance);
  }, [availability, maxDistance, maxPrice, spots]);

  const bounds = useMemo(() => {
    const lats = filteredSpots.length ? filteredSpots.map(({ spot }) => spot.lat) : spots.map((spot) => spot.lat);
    const lngs = filteredSpots.length ? filteredSpots.map(({ spot }) => spot.lng) : spots.map((spot) => spot.lng);
    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [filteredSpots, spots]);

  const mapPoints = (filteredSpots.length ? filteredSpots : spots.map((spot) => ({ spot, distance: distanceFromMonas(spot) }))).map(({ spot, distance }) => {
    const width = bounds.maxLng - bounds.minLng || 1;
    const height = bounds.maxLat - bounds.minLat || 1;
    const x = ((spot.lng - bounds.minLng) / width) * 100;
    const y = 100 - ((spot.lat - bounds.minLat) / height) * 100;
    return { spot, distance: distance ?? distanceFromMonas(spot), x, y };
  });

  return (
    <div className="space-y-8 pb-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-200">
              <Filter className="h-4 w-4" />
              Cari parkir harian di Jakarta
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Temukan spot parkir terdekat, cepat, dan terasa aman.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                PARKIR_SHARING menghubungkan pemilik lahan dengan pengemudi yang butuh parkir fleksibel.
                Filter harga, jarak, dan jam tersedia langsung dari mobile.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/list" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
                Pasang spot
                <MoveDown className="h-4 w-4 rotate-[-90deg]" />
              </Link>
              <Link href="/bookings" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-500/30 hover:bg-orange-500/10">
                Lihat booking
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Spot aktif" value={`${spots.length}`} hint="Semua seed spot terverifikasi" />
              <StatCard label="Siap dipakai" value={`${metrics.availableCount}`} hint="Tersedia untuk hari ini" />
              <StatCard label="Harga mulai" value={formatRupiah(metrics.cheapest.pricePerHour)} hint="Termurah di jaringan ini" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-500/20 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between pb-4 text-sm text-slate-300">
              <div>
                <p className="font-medium text-white">Peta spot parkir</p>
                <p className="text-slate-400">Layout sederhana berbasis grid kota</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-orange-200">
                <Layers3 className="h-3.5 w-3.5" />
                Jakarta Selatan + Pusat
              </span>
            </div>
            <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18),transparent_55%)]" />
              {mapPoints.map(({ spot, distance, x, y }) => (
                <Link
                  key={spot.id}
                  href={`/spot/${spot.id}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className={`block h-4 w-4 rounded-full border-2 border-white shadow-lg shadow-black/30 ${availabilityTone(spot.availableHours)}`} />
                  <span className="absolute left-1/2 top-5 min-w-44 -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 text-left opacity-100 shadow-xl shadow-black/30 backdrop-blur transition group-hover:border-orange-500/30">
                    <span className="block text-[11px] uppercase tracking-[0.24em] text-slate-500">{priceLevel(spot.pricePerHour)} • {formatDistance(distance)}</span>
                    <span className="block text-sm font-medium text-white">{spot.ownerName}</span>
                    <span className="block text-xs text-slate-400">{availabilityLabel(spot.availableHours)}</span>
                  </span>
                </Link>
              ))}
              <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 text-sm text-slate-200 backdrop-blur">
                <p className="font-medium text-white">Arahkan ke titik</p>
                <p className="text-slate-400">Harga, jarak, dan jam tersedia muncul langsung di pin.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <SectionHeading
          eyebrow="Filter"
          title="Saring spot sesuai kebutuhan"
          description="Atur batas harga, jarak dari pusat Jakarta, dan status ketersediaan sebelum booking."
        />
        <div className="grid gap-4 lg:grid-cols-4">
          <label className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/65 p-4 text-sm text-slate-200 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-white">Harga maksimum</span>
              <span className="text-orange-300">{formatRupiah(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={8000}
              max={40000}
              step={1000}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="w-full accent-orange-500"
            />
            <p className="text-xs text-slate-400">Gunakan slider untuk mencari parkir hemat atau premium.</p>
          </label>

          <label className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/65 p-4 text-sm text-slate-200 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-white">Radius jarak</span>
              <span className="text-orange-300">{maxDistance.toFixed(0)} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={1}
              value={maxDistance}
              onChange={(event) => setMaxDistance(Number(event.target.value))}
              className="w-full accent-orange-500"
            />
            <p className="text-xs text-slate-400">Semakin kecil radius, semakin dekat dari Monas.</p>
          </label>

          <div className="rounded-2xl border border-white/10 bg-slate-950/65 p-4 lg:col-span-2">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <SlidersHorizontal className="h-4 w-4 text-orange-300" />
              Status ketersediaan
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAvailability(option.value)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${availability === option.value ? 'border-orange-500/40 bg-orange-500 text-white' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-white'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Hasil aktif: {filteredSpots.length} spot dari {spots.length} spot.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Rekomendasi"
            title="Spot parkir yang cocok buat kamu"
            description="Klik kartu untuk masuk ke halaman detail, lihat foto, lalu booking dalam hitungan detik."
          />
          <p className="hidden text-sm text-slate-400 md:block">Hasil diurutkan berdasarkan jarak terdekat.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredSpots.map(({ spot }) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>

        {filteredSpots.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-slate-300">
            Tidak ada spot yang cocok dengan filter saat ini. Coba naikkan radius atau harga maksimum.
          </div>
        ) : null}
      </section>
    </div>
  );
}
