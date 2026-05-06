'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock3, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';
import { useQueueStore } from '@/lib/store';

export default function CreateQueuePage() {
  const router = useRouter();
  const createQueue = useQueueStore((state) => state.createQueue);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [estimatedWait, setEstimatedWait] = useState('10');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = createQueue({
      name: name.trim(),
      location: location.trim(),
      estimatedWait: Number(estimatedWait),
    });
    router.push(`/manage/${id}`);
  };

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
      </div>

      <div className="rounded-[2rem] border border-orange-400/20 bg-zinc-950 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-6">
        <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-orange-200">
          BUAT ANTRIAN BARU
        </span>
        <h1 className="mt-4 text-3xl font-black">Tambahkan layanan baru</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Isi nama layanan, lokasi, dan estimasi waktu per orang. Setelah dibuat, antrian langsung aktif.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-300">Nama antrian</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Misalnya: Kantor Lurah Kebayoran"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>

          <label className="block space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-300">
              <MapPin className="h-4 w-4 text-orange-300" />
              Lokasi / layanan
            </span>
            <input
              required
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Jl. Raya Cilandak, Jakarta Selatan"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>

          <label className="block space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium text-zinc-300">
              <Clock3 className="h-4 w-4 text-orange-300" />
              Estimasi waktu per orang (menit)
            </span>
            <input
              required
              type="number"
              min="1"
              value={estimatedWait}
              onChange={(event) => setEstimatedWait(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 font-semibold text-black transition hover:bg-orange-400"
          >
            <Plus className="h-4 w-4" />
            Simpan Antrian
          </button>
        </form>
      </div>
    </section>
  );
}
