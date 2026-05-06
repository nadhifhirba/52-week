"use client";

import Link from "next/link";
import { Bookmark, BookmarkCheck, CalendarDays, MapPin, Ticket } from "lucide-react";

import { useEventStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  formatCategory,
  formatEventDateBadge,
  formatEventTime,
  formatPrice,
  sortBySoonest,
} from "@/lib/event-utils";
import type { EventItem } from "@/lib/seed";

type EventCardProps = {
  event: EventItem;
  compact?: boolean;
  className?: string;
};

export function EventCard({ event, compact = false, className }: EventCardProps) {
  const saved = useEventStore((state) => state.isSaved(event.id));
  const toggleSave = useEventStore((state) => state.toggleSave);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-zinc-800 bg-zinc-900/95 text-zinc-50 shadow-[8px_8px_0_0_rgba(255,107,0,0.16)] transition duration-200 hover:-translate-y-1 hover:border-[#FF6B00]/60 hover:shadow-[10px_10px_0_0_rgba(255,107,0,0.28)]",
        className,
      )}
    >
      <Link href={`/event/${event.id}`} className="absolute inset-0 z-10" aria-label={`Buka acara ${event.title}`} />

      <div className="relative z-20 flex h-full flex-col">
        <div
          className={cn("relative overflow-hidden border-b border-zinc-800", compact ? "h-40" : "h-56")}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(24,24,27,0.15), rgba(24,24,27,0.82)), url(${event.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            <div className="w-fit rounded-xl border border-white/10 bg-zinc-950/90 px-3 py-2 text-left shadow-[4px_4px_0_0_rgba(255,255,255,0.08)] backdrop-blur">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">Tanggal</p>
              <p className="mt-1 whitespace-pre-line text-sm font-black tracking-[0.15em] text-[#FF6B00]">
                {formatEventDateBadge(event.date)}
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-100 backdrop-blur">
              <CalendarDays className="h-3.5 w-3.5 text-[#FF6B00]" />
              {formatEventTime(event.time)}
            </div>
          </div>
          <button
            type="button"
            onClick={(eventMouse) => {
              eventMouse.preventDefault();
              eventMouse.stopPropagation();
              toggleSave(event.id);
            }}
            className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/90 text-zinc-100 shadow-[4px_4px_0_0_rgba(255,107,0,0.16)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#FF6B00] hover:text-[#FF6B00]"
            aria-label={saved ? "Hapus dari tersimpan" : "Simpan acara"}
          >
            {saved ? <BookmarkCheck className="h-5 w-5 fill-[#FF6B00]" /> : <Bookmark className="h-5 w-5" />}
          </button>
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-3">
            <span className="inline-flex w-fit items-center rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF6B00]">
              {formatCategory(event.category)}
            </span>
            <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-zinc-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-100 backdrop-blur">
              {formatPrice(event.price)}
            </span>
          </div>
        </div>

        <div className={cn("relative z-20 flex flex-1 flex-col gap-4 p-4", compact ? "p-4" : "p-5")}>
          <div className="space-y-2">
            <h3 className={cn("font-black tracking-tight text-zinc-50", compact ? "text-lg" : "text-xl")}>
              {event.title}
            </h3>
            {!compact ? <p className="line-clamp-2 text-sm leading-6 text-zinc-300">{event.description}</p> : null}
          </div>

          <div className="mt-auto flex items-start justify-between gap-4">
            <div className="space-y-1 text-sm text-zinc-300">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B00]" />
                <span className="line-clamp-2">{event.location}</span>
              </div>
              {!compact ? (
                <div className="flex items-start gap-2 text-xs text-zinc-400">
                  <Ticket className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
                  <span>{event.organizer}</span>
                </div>
              ) : null}
            </div>
            <div className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-zinc-200 transition group-hover:border-[#FF6B00] group-hover:text-[#FF6B00]">
              Buka
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function EventGrid({ events }: { events: EventItem[] }) {
  const sorted = sortBySoonest(events);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {sorted.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
