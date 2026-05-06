'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, Clock3, Search } from 'lucide-react';
import { SectionHeading, StatusPill } from '@/components/parking-ui';
import { formatRupiah, useParkingStore } from '@/lib/store';

const statusOptions = ['Semua', 'Menunggu', 'Dikonfirmasi', 'Selesai', 'Dibatalkan'] as const;

export default function BookingsPage() {
  const bookings = useParkingStore((state) => state.bookings);
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>('Semua');
  const [query, setQuery] = useState('');

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus = statusFilter === 'Semua' ? true : booking.status === statusFilter;
      const matchesQuery =
        query.trim().length === 0 ||
        booking.spotName.toLowerCase().includes(query.toLowerCase()) ||
        booking.renterName.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [bookings, query, statusFilter]);

  const totalValue = useMemo(
    () => bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    [bookings],
  );

  return (
    <div className="space-y-8 pb-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <SectionHeading
          eyebrow="Bookings"
          title="Daftar booking kamu"
          description="Pantau status booking, total pembayaran, dan detail jam parkir dari satu halaman."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Total booking</p>
            <p className="mt-2 text-3xl font-semibold text-white">{bookings.length}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Nilai transaksi</p>
            <p className="mt-2 text-3xl font-semibold text-orange-300">{formatRupiah(totalValue)}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Filter aktif</p>
            <p className="mt-2 text-3xl font-semibold text-white">{statusFilter}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-white"><Search className="h-4 w-4 text-orange-300" />Cari booking</span>
            <input
              className="mt-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nama spot atau penyewa"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-full border px-4 py-2 text-sm transition ${statusFilter === status ? 'border-orange-500/40 bg-orange-500 text-white' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-white'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {filteredBookings.map((booking) => (
          <article key={booking.id} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-white">{booking.spotName}</h3>
                  <StatusPill status={booking.status} />
                </div>
                <p className="text-sm text-slate-300">Penyewa: {booking.renterName}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-orange-300" />{booking.date}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-orange-300" />{booking.startTime} • {booking.durationHours} jam</span>
                </div>
              </div>
              <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 px-5 py-4 text-right">
                <p className="text-xs uppercase tracking-[0.24em] text-orange-200/70">Total</p>
                <p className="mt-2 text-2xl font-semibold text-white">{formatRupiah(booking.totalPrice)}</p>
              </div>
            </div>
          </article>
        ))}

        {filteredBookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-slate-300">
            Tidak ada booking dengan filter ini.
          </div>
        ) : null}
      </section>
    </div>
  );
}
