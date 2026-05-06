"use client";

import Link from "next/link";
import { Bookmark, BookmarkCheck, ExternalLink, MapPin, MessageCircle, Sparkles } from "lucide-react";

import { EventCard } from "@/components/event-card";
import { useEventStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/lib/seed";
import {
  buildWhatsAppShareText,
  categoryLabels,
  formatCategory,
  formatEventDate,
  formatEventTime,
  formatPrice,
} from "@/lib/event-utils";

type EventDetailViewProps = {
  event: EventItem;
  related: EventItem[];
};

export function EventDetailView({ event, related }: EventDetailViewProps) {
  const saved = useEventStore((state) => state.isSaved(event.id));
  const toggleSave = useEventStore((state) => state.toggleSave);
  const waLink = `https://wa.me/?text=${encodeURIComponent(buildWhatsAppShareText(event))}`;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 shadow-[10px_10px_0_0_rgba(255,107,0,0.16)]">
        <div
          className="relative min-h-[320px] border-b border-zinc-800 p-5 sm:p-8"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(24,24,27,0.18), rgba(24,24,27,0.88)), url(${event.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#FF6B00]">
                {formatCategory(event.category)}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-100">
                {formatPrice(event.price)}
              </span>
            </div>

            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-[#FF6B00]" />
                BESOK_LIBUR curated pick
              </div>
              <h1 className="text-4xl font-black tracking-tight text-zinc-50 sm:text-6xl">{event.title}</h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">{event.description}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoBlock label="Tanggal" value={formatEventDate(event.date)} />
              <InfoBlock label="Jam" value={formatEventTime(event.time)} />
              <InfoBlock label="Lokasi" value={event.location} />
              <InfoBlock label="Penyelenggara" value={event.organizer} />
            </div>
            <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 text-sm leading-7 text-zinc-300">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Deskripsi lengkap</p>
              <p>{event.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Tindakan cepat</p>
              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => toggleSave(event.id)}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold shadow-[4px_4px_0_0_rgba(255,107,0,0.14)] transition",
                    saved
                      ? "border-[#FF6B00] bg-[#FF6B00] text-zinc-950 hover:bg-[#ff7a1f]"
                      : "border-zinc-700 bg-zinc-900 text-zinc-50 hover:border-[#FF6B00] hover:text-[#FF6B00]",
                  )}
                >
                  {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  {saved ? "Tersimpan" : "Simpan Acara"}
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-bold text-zinc-50 transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Bagikan ke WhatsApp
                </a>
                <a
                  href={event.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-bold text-zinc-50 transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Buka Sumber
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-300">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">Info singkat</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B00]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#FF6B00]/40 text-[9px] font-black text-[#FF6B00]">
                    {categoryLabels[event.category].slice(0, 1)}
                  </span>
                  <span>{categoryLabels[event.category]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#FF6B00]">Rekomendasi lain</p>
            <h2 className="mt-2 text-2xl font-black text-zinc-50">Acara serupa yang mungkin kamu suka</h2>
          </div>
          <Link
            href="/"
            className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-bold text-zinc-100 transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
          >
            Lihat semua
          </Link>
        </div>

        {related.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <EventCard key={item.id} event={item} compact />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-zinc-700 bg-zinc-950/60 p-8 text-center text-zinc-300">
            Belum ada rekomendasi lain untuk kategori ini.
          </div>
        )}
      </section>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-zinc-800 bg-zinc-950/80 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-zinc-100">{value}</p>
    </div>
  );
}
