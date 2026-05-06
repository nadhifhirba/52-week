'use client';

import { useMemo, useState } from 'react';
import { Calculator as CalculatorIcon, Fuel, ParkingCircle, ReceiptText, TrendingUp } from 'lucide-react';
import { formatRupiah } from '@/lib/format';

export default function CalculatorPage() {
  const [trips, setTrips] = useState(16);
  const [avgEarnings, setAvgEarnings] = useState(42000);
  const [fuelCost, setFuelCost] = useState(65000);
  const [rentalCost, setRentalCost] = useState(0);

  const result = useMemo(() => {
    const gross = trips * avgEarnings;
    const net = gross - fuelCost - rentalCost;
    const perTrip = trips > 0 ? net / trips : 0;
    return { gross, net, perTrip };
  }, [trips, avgEarnings, fuelCost, rentalCost]);

  const summaryTone = result.net >= 0 ? 'text-orange-300' : 'text-red-300';

  return (
    <div className="space-y-6 pb-10">
      <section className="rounded-[2rem] border border-orange-500/15 bg-gradient-to-br from-orange-500/18 via-black to-black p-5 sm:p-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
            <CalculatorIcon className="h-4 w-4" />
            Kalkulator profit cepat
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Hitung untung bersih dalam hitungan detik.</h1>
          <p className="text-base leading-7 text-orange-50/75 sm:text-lg">
            Masukkan jumlah trip, rata-rata pendapatan per trip, lalu kurangi bensin dan biaya sewa. Cocok buat cek target shift harian.
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-orange-500/12 bg-white/[0.03] p-5">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-orange-100/75">Jumlah trip</span>
              <input
                type="number"
                min={0}
                value={trips}
                onChange={(e) => setTrips(Number(e.target.value || 0))}
                className="min-h-14 w-full rounded-2xl border border-orange-500/15 bg-black/35 px-4 text-lg text-white outline-none transition placeholder:text-orange-100/30 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-orange-100/75">Rata-rata earnings per trip</span>
              <input
                type="number"
                min={0}
                step={1000}
                value={avgEarnings}
                onChange={(e) => setAvgEarnings(Number(e.target.value || 0))}
                className="min-h-14 w-full rounded-2xl border border-orange-500/15 bg-black/35 px-4 text-lg text-white outline-none transition focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-orange-100/75">Biaya bensin</span>
              <input
                type="number"
                min={0}
                step={5000}
                value={fuelCost}
                onChange={(e) => setFuelCost(Number(e.target.value || 0))}
                className="min-h-14 w-full rounded-2xl border border-orange-500/15 bg-black/35 px-4 text-lg text-white outline-none transition focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-orange-100/75">Biaya rental / sewa</span>
              <input
                type="number"
                min={0}
                step={5000}
                value={rentalCost}
                onChange={(e) => setRentalCost(Number(e.target.value || 0))}
                className="min-h-14 w-full rounded-2xl border border-orange-500/15 bg-black/35 px-4 text-lg text-white outline-none transition focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4 rounded-[2rem] border border-orange-500/12 bg-white/[0.03] p-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300/70">Hasil hitung</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Ringkasan profit</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <p className="text-sm text-orange-100/60">Gross revenue</p>
            <p className="mt-2 text-3xl font-black text-white">{formatRupiah(result.gross)}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
            <p className="text-sm text-orange-100/60">Net profit</p>
            <p className={`mt-2 text-4xl font-black ${summaryTone}`}>{formatRupiah(result.net)}</p>
            <p className="mt-2 text-sm text-orange-100/60">Setelah dikurangi bensin dan sewa.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 text-orange-300">
                <Fuel className="h-4 w-4" />
                <p className="text-sm font-semibold">Sisa setelah bensin</p>
              </div>
              <p className="mt-2 text-2xl font-black text-white">{formatRupiah(result.gross - fuelCost)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-2 text-orange-300">
                <ParkingCircle className="h-4 w-4" />
                <p className="text-sm font-semibold">Net per trip</p>
              </div>
              <p className="mt-2 text-2xl font-black text-white">{formatRupiah(result.perTrip)}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-orange-500/5 p-4">
            <div className="flex items-center gap-2 text-orange-300">
              <TrendingUp className="h-5 w-5" />
              <p className="font-semibold">Saran cepat</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-orange-50/80">
              Kalau profit mulai tipis, naikkan fokus ke area yang order-nya cepat muter atau kurangi jarak kosong antar trip.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-black/25 p-4 text-sm text-orange-100/70">
            <ReceiptText className="h-4 w-4 text-orange-300" />
            Kalkulator ini bisa dipakai cepat sebelum shift dimulai atau saat istirahat singkat.
          </div>
        </div>
      </section>
    </div>
  );
}
