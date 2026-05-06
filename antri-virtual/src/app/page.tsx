'use client';

import Link from 'next/link';
import { BellRing, ChevronRight, Clock3, Users } from 'lucide-react';
import { useQueueStore } from '@/lib/store';

export default function DashboardPage() {
  const queues = useQueueStore((state) => state.queues);
  const activeQueues = queues.filter((queue) => queue.isActive);

  return (
    <section className="space-y-5">
      <div className="rounded-[2rem] border border-orange-400/20 bg-gradient-to-br from-zinc-950 via-zinc-950 to-orange-950/40 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.4)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-orange-200">
              DASHBOARD ANTRIAN
            </span>
            <div>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl">Kelola antrean dengan nomor besar dan jelas.</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                Lihat antrean aktif, estimasi tunggu, dan masuk ke nomor antrian dengan satu tap.
              </p>
            </div>
          </div>
          <div className="hidden rounded-3xl border border-orange-400/20 bg-orange-500/10 p-4 text-right sm:block">
            <div className="text-xs text-orange-200/80">Antrian aktif</div>
            <div className="mt-1 text-4xl font-black text-orange-300">{activeQueues.length}</div>
          </div>
        </div>
      </div>

      {activeQueues.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500/10 text-orange-300">
            <BellRing className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Belum ada antrian aktif</h2>
          <p className="mt-2 text-sm text-zinc-400">Buat antrian baru untuk mulai melayani pelanggan.</p>
          <Link
            href="/create"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400"
          >
            Buat Antrian
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {activeQueues.map((queue) => {
            const waiting = Math.max(0, queue.lastNumber - queue.currentNumber);
            const eta = waiting * queue.estimatedWait;

            return (
              <article
                key={queue.id}
                className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-xl font-bold text-white sm:text-2xl">{queue.name}</h2>
                      <p className="text-sm text-zinc-400">{queue.location}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="text-xs text-zinc-400">Sedang dipanggil</div>
                        <div className="mt-1 text-3xl font-black text-orange-300">{queue.currentNumber}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="text-xs text-zinc-400">Nomor terakhir</div>
                        <div className="mt-1 text-3xl font-black text-white">{queue.lastNumber}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Clock3 className="h-3.5 w-3.5" />
                          Estimasi tunggu
                        </div>
                        <div className="mt-1 text-2xl font-black text-white">{eta} menit</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <Users className="h-3.5 w-3.5" />
                          Sisa antrean
                        </div>
                        <div className="mt-1 text-2xl font-black text-white">{waiting} orang</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Aktif
                    </span>
                    <Link
                      href={`/queue/${queue.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400"
                    >
                      Ambil Nomor
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
