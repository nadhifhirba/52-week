"use client";

import { useMemo, useState } from "react";
import { Filter, Sparkles, SearchX } from "lucide-react";

import { EventCard } from "@/components/event-card";
import { useEventStore } from "@/lib/store";
import { categoryPills, sortBySoonest } from "@/lib/event-utils";
import type { EventCategory } from "@/lib/seed";

const heroStats = [
  { label: "Event tersimpan", value: "bookmark sekali tap" },
  { label: "Fokus kota", value: "Jakarta & sekitarnya" },
  { label: "Gaya", value: "neo-industrial brutalism" },
];

export default function HomePage() {
  const events = useEventStore((state) => state.events);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");

  const filteredEvents = useMemo(() => {
    const shortlist = selectedCategory === "all" ? events : events.filter((event) => event.category === selectedCategory);
    return sortBySoonest(shortlist);
  }, [events, selectedCategory]);

  return (
    <div className="space-y-8 pb-10">
      <section className="grid gap-6 rounded-[2rem] border border-zinc-800 bg-zinc-900/95 p-6 shadow-[10px_10px_0_0_rgba(255,107,0,0.16)] lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-[#FF6B00]">
            <Sparkles className="h-4 w-4" />
            Weekend event discovery
          </div>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-zinc-50 sm:text-6xl">
              Temukan acara seru besok — atau kapan aja.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              BESOK_LIBUR ngumpulin event lokal yang enak dilihat, gampang disimpan, dan siap dibagikan ke grup WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-[1.25rem] border border-zinc-800 bg-zinc-950/80 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">{stat.label}</p>
                <p className="mt-2 text-sm font-semibold text-zinc-100">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-[1.75rem] border border-zinc-800 bg-zinc-950/80 p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
            <Filter className="h-4 w-4 text-[#FF6B00]" />
            Pilih kategori
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryPills.map((pill) => (
              <button
                key={pill.key}
                type="button"
                onClick={() => setSelectedCategory(pill.key)}
                className={
                  selectedCategory === pill.key
                    ? "rounded-full border border-[#FF6B00] bg-[#FF6B00] px-4 py-2 text-sm font-bold text-zinc-950 shadow-[4px_4px_0_0_rgba(255,107,0,0.14)]"
                    : "rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-100 transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
                }
              >
                {pill.label}
              </button>
            ))}
          </div>
          <div className="rounded-[1.25rem] border border-dashed border-zinc-700 bg-zinc-900/40 p-4 text-sm leading-6 text-zinc-400">
            Filter aktif akan menyaring feed secara real-time. Simpan yang kamu suka, lalu cek halaman Tersimpan.
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#FF6B00]">Feed acara</p>
            <h2 className="mt-2 text-2xl font-black text-zinc-50">{filteredEvents.length} acara ditemukan</h2>
          </div>
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-100 transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
          >
            Reset filter
          </button>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-zinc-700 bg-zinc-950/70 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
              <SearchX className="h-8 w-8" />
            </div>
            <h3 className="mt-5 text-2xl font-black text-zinc-50">Tidak ada event yang cocok</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-300">
              Coba ganti kategori, atau reset filter untuk melihat semua acara yang tersedia.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="mt-6 rounded-full border border-[#FF6B00] bg-[#FF6B00] px-5 py-3 text-sm font-black text-zinc-950 shadow-[4px_4px_0_0_rgba(255,107,0,0.14)]"
            >
              Lihat semua acara
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
