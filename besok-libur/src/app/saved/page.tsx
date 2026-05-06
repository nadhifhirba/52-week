"use client";

import Link from "next/link";
import { Bookmark, SearchX } from "lucide-react";

import { EventCard } from "@/components/event-card";
import { useEventStore } from "@/lib/store";
import { sortBySoonest } from "@/lib/event-utils";

export default function SavedPage() {
  const events = useEventStore((state) => state.events);
  const savedIds = useEventStore((state) => state.saved);
  const savedEvents = sortBySoonest(events.filter((event) => savedIds.includes(event.id)));

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[2rem] border border-zinc-800 bg-zinc-900/95 p-6 shadow-[10px_10px_0_0_rgba(255,107,0,0.16)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-[#FF6B00]">
              <Bookmark className="h-4 w-4" />
              Tersimpan
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-50">Acara yang kamu simpan</h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-300">
              Semua bookmark kamu ada di sini. Buka lagi nanti, bagikan ke teman, atau hapus kalau jadwalnya berubah.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-300">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Jumlah tersimpan</span>
            <div className="mt-2 text-2xl font-black text-zinc-50">{savedEvents.length}</div>
          </div>
        </div>
      </section>

      {savedEvents.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {savedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-zinc-700 bg-zinc-950/70 px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
            <SearchX className="h-8 w-8" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-zinc-50">Belum ada bookmark</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-300">
            Simpan event dari feed dulu biar gampang dibuka lagi nanti.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-full border border-[#FF6B00] bg-[#FF6B00] px-5 py-3 text-sm font-black text-zinc-950 shadow-[4px_4px_0_0_rgba(255,107,0,0.14)]"
          >
            Jelajah event
          </Link>
        </div>
      )}
    </div>
  );
}
