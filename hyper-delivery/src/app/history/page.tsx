'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { ArchiveRestore, CalendarClock, History, MapPinned, ReceiptText, Users } from 'lucide-react';
import { calculateSplit, formatRupiah, useHyperDeliveryStore } from '@/lib/store';

export default function HistoryPage() {
  const history = useHyperDeliveryStore((state) => state.history);
  const groups = useHyperDeliveryStore((state) => state.groups);

  const stats = useMemo(() => {
    const totalOrders = history.length;
    const totalFees = history.reduce((sum, order) => sum + order.deliveryFee, 0);
    const totalItems = history.reduce((sum, order) => sum + order.items.length, 0);
    return { totalOrders, totalFees, totalItems };
  }, [history]);

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Pesanan Saya</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Riwayat pesanan grup yang sudah selesai</h1>
            <p className="mt-2 text-sm text-slate-400">Lihat ongkir, item, dan pembagian terakhir dari tiap pesanan komunitas.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Order selesai" value={`${stats.totalOrders}`} />
            <Stat label="Total ongkir" value={formatRupiah(stats.totalFees)} />
            <Stat label="Item tercatat" value={`${stats.totalItems}`} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {history.map((order) => {
          const group = groups.find((entry) => entry.id === order.groupId);
          const split = calculateSplit(order);
          return (
            <article key={order.id} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Order selesai</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{order.store}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-300">
                    <Badge icon={<MapPinned className="h-4 w-4" />} label={order.groupName} />
                    <Badge icon={<Users className="h-4 w-4" />} label={`${split.participants.length} peserta`} />
                    <Badge icon={<ReceiptText className="h-4 w-4" />} label={formatRupiah(split.grandTotal)} />
                    <Badge icon={<CalendarClock className="h-4 w-4" />} label={new Date(order.completedAt).toLocaleString('id-ID')} />
                  </div>
                </div>

                {group ? (
                  <Link href={`/group/${group.id}`} className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
                    Buka grup lagi
                    <ArchiveRestore className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm font-medium text-white">Item pesanan</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-300">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
                        <span>
                          {item.name} <span className="text-slate-500">• {item.person}</span>
                        </span>
                        <span className="text-orange-300">{formatRupiah(item.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm font-medium text-white">Pembagian akhir</p>
                  <div className="mt-3 space-y-2">
                    {split.breakdown.map((row) => (
                      <div key={row.person} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-300">
                        <div className="flex items-center justify-between gap-3">
                          <span>{row.person}</span>
                          <span className="text-orange-300">{formatRupiah(row.total)}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          Item {formatRupiah(row.itemTotal)} + ongkir {formatRupiah(row.deliveryShare)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {!history.length ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-sm text-slate-400">
            Belum ada riwayat pesanan.
          </div>
        ) : null}
      </section>
    </div>
  );
}

function Badge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
      {icon}
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
