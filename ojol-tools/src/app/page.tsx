'use client';

import Link from 'next/link';
import { ArrowRight, BadgeInfo, Bike, Clock3, MapPinned, NotebookPen, Sparkles } from 'lucide-react';
import { useOjolStore } from '@/lib/store';
import { formatRupiah } from '@/lib/format';

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof Bike;
}) {
  return (
    <div className="rounded-3xl border border-orange-500/12 bg-white/[0.04] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-orange-100/70">{label}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/12 text-orange-300 ring-1 ring-orange-500/20">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="text-3xl font-black tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm text-orange-100/60">{hint}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { earningsEntries } = useOjolStore();
  const latest = [...earningsEntries].sort((a, b) => b.date.localeCompare(a.date))[0];
  const totalNet = latest.earnings + latest.tips - latest.expenses;
  const completion = Math.min(100, Math.round((latest.trips / 18) * 100));
  const recent = [...earningsEntries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <div className="space-y-6 pb-10">
      <section className="overflow-hidden rounded-[2rem] border border-orange-500/15 bg-gradient-to-br from-orange-500/20 via-black to-black p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
              <Sparkles className="h-4 w-4" />
              Dashboard harian untuk driver aktif
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                Pantau setoran, trip, dan target harian tanpa ribet.
              </h1>
              <p className="max-w-xl text-base leading-7 text-orange-50/75 sm:text-lg">
                Lihat pendapatan hari ini, cek ritme trip, lalu pindah cepat ke rute panas atau kalkulator.
                Dirancang untuk layar kecil dan tangan yang sibuk.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:min-w-[280px]">
            <Link
              href="/calculator"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 text-base font-semibold text-black transition hover:bg-orange-400"
            >
              Hitung Profit
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/routes"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-orange-500/20 bg-white/[0.04] px-5 py-4 text-base font-semibold text-orange-50 transition hover:border-orange-400/50 hover:bg-orange-500/12"
            >
              Buka Rute Populer
              <MapPinned className="h-5 w-5 text-orange-300" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pendapatan hari ini"
          value={formatRupiah(latest.earnings + latest.tips)}
          hint={`Setoran bersih setelah bensin: ${formatRupiah(totalNet)}`}
          icon={Bike}
        />
        <StatCard label="Total trip" value={`${latest.trips} trip`} hint="Fokus ke trip yang cepat balik modal" icon={Clock3} />
        <StatCard label="Pengeluaran" value={formatRupiah(latest.expenses)} hint="Bensin, parkir, dan biaya kecil lain" icon={BadgeInfo} />
        <StatCard label="Target tercapai" value={`${completion}%`} hint="Semakin dekat target trip, semakin mantap" icon={NotebookPen} />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[2rem] border border-orange-500/12 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-300/70">Catatan hari ini</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Ringkasan setoran</h2>
            </div>
            <div className="rounded-2xl bg-orange-500/10 px-4 py-2 text-sm text-orange-200 ring-1 ring-orange-500/20">
              {latest.date}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-orange-100/60">Earnings + tips</p>
              <p className="mt-2 text-3xl font-black text-white">{formatRupiah(latest.earnings + latest.tips)}</p>
              <p className="mt-2 text-sm text-orange-100/60">Total masuk sebelum biaya keluar.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-orange-100/60">Net profit</p>
              <p className="mt-2 text-3xl font-black text-orange-300">{formatRupiah(totalNet)}</p>
              <p className="mt-2 text-sm text-orange-100/60">Setelah dikurangi pengeluaran hari ini.</p>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-orange-500/10 bg-orange-500/5 p-4">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-200/70">Catatan lapangan</p>
            <p className="mt-2 text-base leading-7 text-orange-50/85">{latest.notes}</p>
          </div>
        </div>

        <div className="space-y-4 rounded-[2rem] border border-orange-500/12 bg-white/[0.03] p-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300/70">Aksi cepat</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Langsung jalan</h2>
          </div>

          <div className="grid gap-3">
            <Link
              href="/calculator"
              className="inline-flex min-h-14 items-center justify-between rounded-2xl border border-orange-400/20 bg-orange-500/10 px-4 py-4 text-base font-semibold text-orange-50 transition hover:bg-orange-500/18"
            >
              <span>Hitung profit harian</span>
              <ArrowRight className="h-5 w-5 text-orange-300" />
            </Link>
            <Link
              href="/routes"
              className="inline-flex min-h-14 items-center justify-between rounded-2xl border border-orange-400/20 bg-white/[0.04] px-4 py-4 text-base font-semibold text-orange-50 transition hover:bg-orange-500/12"
            >
              <span>Cek spot paling rame</span>
              <MapPinned className="h-5 w-5 text-orange-300" />
            </Link>
            <Link
              href="/community"
              className="inline-flex min-h-14 items-center justify-between rounded-2xl border border-orange-400/20 bg-white/[0.04] px-4 py-4 text-base font-semibold text-orange-50 transition hover:bg-orange-500/12"
            >
              <span>Baca tips komunitas</span>
              <Sparkles className="h-5 w-5 text-orange-300" />
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
            <p className="text-sm text-orange-100/60">Riwayat 4 hari terakhir</p>
            <div className="mt-3 space-y-3">
              {recent.map((entry) => (
                <div key={entry.date} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">{entry.date}</p>
                    <p className="text-sm text-orange-100/60">{entry.trips} trip · {entry.notes}</p>
                  </div>
                  <p className="text-sm font-bold text-orange-300">{formatRupiah(entry.earnings + entry.tips - entry.expenses)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
