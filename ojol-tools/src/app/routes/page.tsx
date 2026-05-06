'use client';

import { Compass, MapPin, Navigation2, Route as RouteIcon, Sparkles, ShieldCheck } from 'lucide-react';
import { useOjolStore } from '@/lib/store';

function SpotCard({
  name,
  area,
  rating,
  notes,
  peakHours,
  tags,
}: {
  name: string;
  area: string;
  rating: number;
  notes: string;
  peakHours: string;
  tags: string[];
}) {
  return (
    <article className="rounded-[1.75rem] border border-orange-500/12 bg-white/[0.04] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300/70">Spot populer</p>
          <h3 className="mt-1 text-2xl font-bold text-white">{name}</h3>
          <p className="mt-1 text-sm text-orange-100/65">{area}</p>
        </div>
        <div className="rounded-2xl bg-orange-500/10 px-4 py-2 text-center ring-1 ring-orange-500/20">
          <p className="text-sm text-orange-100/60">Rating</p>
          <p className="text-xl font-black text-orange-300">{rating.toFixed(1)}</p>
        </div>
      </div>

      <p className="mt-4 text-base leading-7 text-orange-50/80">{notes}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-sm text-orange-100/60">Jam rame</p>
          <p className="mt-1 font-semibold text-white">{peakHours}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-sm text-orange-100/60">Cocok buat</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-orange-500/10 px-3 py-1 text-sm text-orange-100 ring-1 ring-orange-500/15">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function RoutesPage() {
  const { waitingSpots, communityTips } = useOjolStore();
  const hotZones = [
    'Pusat transportasi: Gambir, Dukuh Atas, dan Stasiun Sudirman bikin order pagi lebih cepat muter.',
    'Koridor bandara: Soetta sering stabil saat cuaca kurang bagus dan jadwal penerbangan padat.',
    'Area mall besar: Kota Kasablanka, Blok M, dan Kelapa Gading ramai saat jam makan serta weekend.',
  ];

  return (
    <div className="space-y-6 pb-10">
      <section className="rounded-[2rem] border border-orange-500/15 bg-gradient-to-br from-orange-500/18 via-black to-black p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
              <RouteIcon className="h-4 w-4" />
              Rute panas dan titik tunggu favorit di Jakarta
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Cari spot tunggu yang lebih efektif.</h1>
            <p className="text-base leading-7 text-orange-50/75 sm:text-lg">
              Lihat lokasi yang sering kasih order, cek jam ramai, lalu geser ke titik yang paling masuk akal buat shift berikutnya.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/35 p-4 text-orange-100/80">
            <div className="flex items-center gap-2 text-orange-300">
              <Compass className="h-5 w-5" />
              <span className="font-semibold">Fokus: efisiensi waktu</span>
            </div>
            <p className="mt-2 max-w-sm text-sm leading-6">
              Hindari nunggu terlalu lama di spot yang sepi. Pindah saat jam ramai berganti biar arus order tetap hidup.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {hotZones.map((zone) => (
          <div key={zone} className="rounded-3xl border border-orange-500/12 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3 text-orange-300">
              <Sparkles className="h-5 w-5" />
              <p className="font-semibold">Hot zone</p>
            </div>
            <p className="mt-3 text-base leading-7 text-orange-50/80">{zone}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {waitingSpots.map((spot) => (
          <SpotCard
            key={spot.id}
            name={spot.name}
            area={spot.area}
            rating={spot.rating}
            notes={spot.notes}
            peakHours={spot.peakHours}
            tags={spot.tags}
          />
        ))}
      </section>

      <section className="rounded-[2rem] border border-orange-500/12 bg-white/[0.03] p-5">
        <div className="flex items-center gap-3">
          <Navigation2 className="h-5 w-5 text-orange-300" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300/70">Saran komunitas</p>
            <h2 className="text-2xl font-bold text-white">Tips singkat dari driver lain</h2>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {communityTips.slice(0, 6).map((tip) => (
            <div key={tip.id} className="rounded-3xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{tip.author}</p>
                  <p className="text-sm text-orange-100/60">{tip.role} · {tip.location}</p>
                </div>
                <div className="rounded-2xl bg-orange-500/10 px-3 py-2 text-sm text-orange-300 ring-1 ring-orange-500/20">
                  {tip.likes} suka
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-orange-50/80">{tip.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-3xl border border-orange-500/10 bg-orange-500/5 p-4 text-orange-100/80">
          <div className="flex items-center gap-2 text-orange-300">
            <ShieldCheck className="h-5 w-5" />
            <p className="font-semibold">Catatan aman</p>
          </div>
          <p className="mt-2 text-sm leading-6">
            Prioritaskan area terang, akses keluar yang jelas, dan titik tunggu yang tidak mengganggu arus kendaraan.
          </p>
        </div>
      </section>
    </div>
  );
}
