'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Forward, RotateCcw, SkipForward } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useQueueStore } from '@/lib/store';

export default function ManageQueuePage() {
  const params = useParams<{ id: string }>();
  const queueId = params?.id;
  const queue = useQueueStore((state) => state.queues.find((item) => item.id === queueId));
  const nextCustomer = useQueueStore((state) => state.nextCustomer);
  const skipCustomer = useQueueStore((state) => state.skipCustomer);
  const resetQueue = useQueueStore((state) => state.resetQueue);
  const [flash, setFlash] = useState('');

  const waiting = useMemo(() => (queue ? Math.max(0, queue.lastNumber - queue.currentNumber) : 0), [queue]);

  if (!queue) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-6 text-center">
        <h1 className="text-2xl font-bold">Antrian tidak ditemukan</h1>
        <Link href="/" className="mt-4 inline-flex items-center gap-2 text-orange-300 transition hover:text-orange-200">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke dashboard
        </Link>
      </section>
    );
  }

  const handleAction = (action: () => void, message: string) => {
    action();
    setFlash(message);
    window.setTimeout(() => setFlash(''), 1800);
  };

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <span className="rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200">
          ADMIN VIEW
        </span>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black">{queue.name}</h1>
          <p className="text-sm text-zinc-400">{queue.location}</p>
        </div>

        {flash ? (
          <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            {flash}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-zinc-400">Sedang dipanggil</div>
            <div className="mt-2 text-5xl font-black text-orange-300">{queue.currentNumber}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-zinc-400">Nomor terakhir</div>
            <div className="mt-2 text-5xl font-black text-white">{queue.lastNumber}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-zinc-400">Sisa antrean</div>
            <div className="mt-2 text-5xl font-black text-white">{waiting}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => handleAction(() => nextCustomer(queue.id), 'Nomor berikutnya sudah dipanggil.')}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 font-semibold text-black transition hover:bg-orange-400"
          >
            <Forward className="h-4 w-4" />
            Next Customer
          </button>
          <button
            onClick={() => handleAction(() => skipCustomer(queue.id), 'Satu nomor dilewati.')}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200"
          >
            <SkipForward className="h-4 w-4" />
            Skip
          </button>
          <button
            onClick={() => handleAction(() => resetQueue(queue.id), 'Antrian direset ke awal.')}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3.5 font-semibold text-red-200 transition hover:bg-red-500/20"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Queue
          </button>
        </div>
      </div>
    </section>
  );
}
