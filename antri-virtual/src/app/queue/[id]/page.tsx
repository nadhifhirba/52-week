'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock3, Ticket, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getEstimatedWait, getQueuePosition, progressFromPosition, useQueueStore } from '@/lib/store';

export default function QueuePage() {
  const params = useParams<{ id: string }>();
  const queueId = params?.id;
  const queue = useQueueStore((state) => state.queues.find((item) => item.id === queueId));
  const takeNumber = useQueueStore((state) => state.takeNumber);
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);
  const [status, setStatus] = useState('Belum mengambil nomor');

  useEffect(() => {
    if (!queueId) return;
    const stored = window.localStorage.getItem(`antri-ticket-${queueId}`);
    setTicketNumber(stored ? Number(stored) : null);
  }, [queueId]);

  useEffect(() => {
    if (!queue || !ticketNumber) return;
    const position = getQueuePosition(queue, ticketNumber);
    if (position === 0 && ticketNumber <= queue.currentNumber) {
      setStatus('Nomor kamu sudah dipanggil. Silakan menuju loket.');
      return;
    }
    if (position === 1) {
      setStatus('Kamu nomor berikutnya. Siap-siap ya.');
      return;
    }
    if (position > 1) {
      setStatus(`Ada ${position - 1} orang di depanmu.`);
      return;
    }
    setStatus('Nomor kamu sudah lewat. Silakan cek ulang di loket.');
  }, [queue, ticketNumber]);

  const handleTakeNumber = () => {
    if (!queue) return;
    const issued = takeNumber(queue.id);
    if (issued === null) return;
    window.localStorage.setItem(`antri-ticket-${queue.id}`, String(issued));
    setTicketNumber(issued);
  };

  const waitingMinutes = useMemo(() => (queue ? getEstimatedWait(queue, ticketNumber) : 0), [queue, ticketNumber]);
  const position = queue && ticketNumber ? getQueuePosition(queue, ticketNumber) : 0;
  const progress = queue ? progressFromPosition(queue, ticketNumber) : 0;

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

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <span className="rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200">
          TAKE A NUMBER
        </span>
      </div>

      <div className="rounded-[2rem] border border-orange-400/20 bg-zinc-950 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-6">
        <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-orange-200">
          {queue.location}
        </span>
        <h1 className="mt-4 text-3xl font-black leading-tight">{queue.name}</h1>
        <p className="mt-2 text-sm text-zinc-400">Ambil nomor, lihat posisi, dan pantau estimasi tunggu secara live.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-zinc-400">Nomor kamu</div>
            <div className="mt-2 text-6xl font-black leading-none text-orange-300">{ticketNumber ?? '--'}</div>
            <div className="mt-2 text-sm text-zinc-400">{status}</div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Users className="h-4 w-4" />
              Posisi di antrean
            </div>
            <div className="mt-2 text-6xl font-black leading-none text-white">{ticketNumber ? position : '--'}</div>
            <div className="mt-2 text-sm text-zinc-400">
              {ticketNumber ? `${Math.max(0, position - 1)} orang di depanmu` : 'Ambil nomor untuk melihat posisi'}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-black/20 p-5">
          <div className="flex items-center justify-between gap-3 text-sm text-zinc-400">
            <span>Progress menuju giliranmu</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-zinc-500">
                <Clock3 className="h-4 w-4 text-orange-300" />
                Estimasi tunggu
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{ticketNumber ? `${waitingMinutes} menit` : '--'}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-zinc-500">
                <Ticket className="h-4 w-4 text-orange-300" />
                Status antrean
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{queue.currentNumber}/{queue.lastNumber}</div>
            </div>
          </div>
        </div>

        <button
          onClick={handleTakeNumber}
          disabled={Boolean(ticketNumber)}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
        >
          <Ticket className="h-4 w-4" />
          {ticketNumber ? 'Nomor sudah diambil' : 'Ambil Nomor'}
        </button>
      </div>
    </section>
  );
}
