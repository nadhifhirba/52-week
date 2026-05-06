'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Clock3, MapPinHouse, PlusCircle, Users } from 'lucide-react';
import { formatRupiah, useHyperDeliveryStore, calculateSplit } from '@/lib/store';

export default function HomePage() {
  const router = useRouter();
  const groups = useHyperDeliveryStore((state) => state.groups);
  const createGroup = useHyperDeliveryStore((state) => state.createGroup);
  const joinGroup = useHyperDeliveryStore((state) => state.joinGroup);

  const [createName, setCreateName] = useState('');
  const [createLocation, setCreateLocation] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [joinGroupId, setJoinGroupId] = useState('');
  const [joinName, setJoinName] = useState('');
  const [notice, setNotice] = useState('');

  const metrics = useMemo(() => {
    const activeOrders = groups.filter((group) => group.activeOrder).length;
    const members = groups.reduce((sum, group) => sum + group.members.length, 0);
    const openGroups = groups.filter((group) => !group.activeOrder).length;
    const totalDeliveryFees = groups.reduce((sum, group) => sum + (group.activeOrder?.deliveryFee ?? 0), 0);
    return { activeOrders, members, openGroups, totalDeliveryFees };
  }, [groups]);

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = createGroup({
      name: createName.trim(),
      location: createLocation.trim(),
      creator: creatorName.trim(),
    });
    setCreateName('');
    setCreateLocation('');
    setCreatorName('');
    setNotice(`Grup baru dibuat: ${id}`);
    router.push(`/group/${id}`);
  };

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    joinGroup(joinGroupId.trim(), joinName.trim());
    setNotice(`Gabung ke grup ${joinGroupId.trim()} sebagai ${joinName.trim()}`);
    setJoinGroupId('');
    setJoinName('');
  };

  return (
    <div className="space-y-8 pb-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-200">
              <MapPinHouse className="h-4 w-4" />
              Koordinasi delivery dalam komplek dan kos
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Patungan ongkir jadi rapi, hemat, dan gampang dibagi.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                HYPER_DELIVERY bantu satu grup kompleks buat pesen bareng, hitung ongkir rata, dan kirim ringkasan WhatsApp sekali klik.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              <Stat label="Grup aktif" value={`${groups.length}`} hint="Semua lingkungan tersimpan" />
              <Stat label="Pesanan berjalan" value={`${metrics.activeOrders}`} hint="Ada ongkir yang sedang dibagi" />
              <Stat label="Total anggota" value={`${metrics.members}`} hint="Tetangga yang sudah join" />
              <Stat label="Ongkir terkumpul" value={formatRupiah(metrics.totalDeliveryFees)} hint="Gabungan pesanan aktif" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-500/20 bg-slate-950/80 p-5">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <div>
                <p className="font-medium text-white">Ringkasan cepat</p>
                <p className="text-slate-400">Lihat grup yang sedang jalan</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-orange-200">
                Community first
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {groups.map((group) => {
                const split = group.activeOrder ? calculateSplit(group.activeOrder) : null;
                return (
                  <Link
                    key={group.id}
                    href={`/group/${group.id}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-orange-500/30 hover:bg-orange-500/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-white">{group.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{group.location}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${group.activeOrder ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/5 text-slate-300'}`}>
                        {group.activeOrder ? 'Ada pesanan' : 'Siap buka'}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1">
                        <Users className="h-3.5 w-3.5 text-orange-300" />
                        {group.members.length} anggota
                      </span>
                      {group.activeOrder ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1">
                          <Clock3 className="h-3.5 w-3.5 text-orange-300" />
                          {split?.participants.length ?? 0} peserta
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-orange-300" />
                          Belum ada order
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="buat-grup" className="grid gap-5 lg:grid-cols-2">
        <form onSubmit={handleCreate} className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Buat Grup</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Mulai koordinasi pesanan baru</h2>
            <p className="mt-2 text-sm text-slate-400">Cocok untuk kos, blok, tower, atau komplek kecil yang sering order bareng.</p>
          </div>
          <div className="grid gap-3">
            <input
              value={createName}
              onChange={(event) => setCreateName(event.target.value)}
              placeholder="Nama grup, mis. Kos Melati Lt. 2"
              className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
            />
            <input
              value={createLocation}
              onChange={(event) => setCreateLocation(event.target.value)}
              placeholder="Lokasi singkat, mis. Jl. Melati No. 22"
              className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
            />
            <input
              value={creatorName}
              onChange={(event) => setCreatorName(event.target.value)}
              placeholder="Nama kamu"
              className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            Buat grup
            <PlusCircle className="h-4 w-4" />
          </button>
        </form>

        <form onSubmit={handleJoin} className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Gabung Grup</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Masuk ke grup yang sudah ada</h2>
            <p className="mt-2 text-sm text-slate-400">Pakai ID grup yang ada di halaman detail, lalu tambah nama anggota baru.</p>
          </div>
          <div className="grid gap-3">
            <input
              value={joinGroupId}
              onChange={(event) => setJoinGroupId(event.target.value)}
              placeholder="Group ID, mis. kos-melati-lt-2"
              className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
            />
            <input
              value={joinName}
              onChange={(event) => setJoinName(event.target.value)}
              placeholder="Nama anggota baru"
              className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-500/30 hover:bg-orange-500/10"
          >
            Gabung grup
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Kenapa dipakai</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Satu pesanan, ongkir dibagi rata, semua orang tahu bagiannya</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Setiap grup bisa isi total ongkir, tambah item per orang, lalu HYPER_DELIVERY otomatis hitung siapa bayar berapa.
          </p>
        </div>
        {notice ? <p className="mt-4 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-100">{notice}</p> : null}
      </section>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{hint}</p>
    </div>
  );
}
