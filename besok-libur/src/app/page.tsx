"use client";

import { useMemo, useState } from "react";
import { Calendar, Filter, Flame, MapPin, Sparkles, Star, Ticket, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useEventStore } from "@/lib/store";
import { categoryPills, sortBySoonest } from "@/lib/event-utils";
import type { EventCategory } from "@/lib/seed";

const categoryColors: Record<EventCategory | "all", string> = {
  all: "from-violet-500 to-pink-500",
  music: "from-pink-500 to-rose-500",
  art: "from-cyan-500 to-blue-500",
  food: "from-amber-500 to-orange-500",
  sports: "from-emerald-500 to-green-500",
  family: "from-amber-500 to-yellow-500",
  nightlife: "from-fuchsia-500 to-purple-500",
};

const monthNames = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function formatEventDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getDate(),
    month: monthNames[d.getMonth()],
    weekday: d.toLocaleDateString("id-ID", { weekday: "long" }),
    time: d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function HomePage() {
  const events = useEventStore((state) => state.events);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");

  const filteredEvents = useMemo(() => {
    const shortlist =
      selectedCategory === "all"
        ? events
        : events.filter((event) => event.category === selectedCategory);
    return sortBySoonest(shortlist);
  }, [events, selectedCategory]);

  const featuredEvent = filteredEvents[0];

  return (
    <div className="space-y-12 pb-16">
      {/* ── Featured Hero ── */}
      {featuredEvent && (
        <section className="relative overflow-hidden rounded-3xl">
          {/* Background image with gradient overlay */}
          <div className="relative aspect-[21/9] min-h-[380px] w-full overflow-hidden rounded-3xl bg-zinc-900 sm:min-h-[480px]">
            {featuredEvent.imageUrl ? (
              <>
                <Image
                  src={featuredEvent.imageUrl}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="hero-gradient absolute inset-0" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-black to-pink-900" />
            )}

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
              <div className="max-w-2xl space-y-4">
                {/* Category badge */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  <Flame className="h-3 w-3 text-pink-400" />
                  {featuredEvent.category}
                </span>

                {/* Title */}
                <h1
                  className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "var(--font-archivo-black)" }}
                >
                  {featuredEvent.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-violet-400" />
                    {formatEventDate(featuredEvent.date).weekday},{" "}
                    {formatEventDate(featuredEvent.date).day}{" "}
                    {formatEventDate(featuredEvent.date).month}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-pink-400" />
                    {formatEventDate(featuredEvent.date).time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                    {featuredEvent.location || "Jakarta"}
                  </span>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    href={`/event/${featuredEvent.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
                  >
                    <Ticket className="h-4 w-4" />
                    Get Tickets
                  </Link>
                  <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10">
                    <Star className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Date badge — top right */}
            <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
              <div className="date-badge rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-center backdrop-blur-xl">
                <div className="text-3xl font-black leading-none text-white sm:text-4xl">
                  {formatEventDate(featuredEvent.date).day}
                </div>
                <div className="text-xs font-bold tracking-[0.15em] text-violet-400">
                  {formatEventDate(featuredEvent.date).month}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Category Strip ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-zinc-500" />
          <h2
            className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500"
          >
            Browse by vibe
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`category-pill inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
              selectedCategory === "all"
                ? "active border-violet-500 bg-violet-500 text-white"
                : "border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            All Events
          </button>
          {categoryPills.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key as EventCategory)}
              className={`category-pill inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                selectedCategory === cat.key
                  ? "active border-violet-500 bg-violet-500 text-white"
                  : "border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Event Grid — Festival Lineup Style ── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2
            className="text-2xl font-black tracking-tight sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {selectedCategory === "all" ? "This Weekend" : selectedCategory}
          </h2>
          <span className="text-sm text-zinc-500">
            {filteredEvents.length} events
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <Calendar className="h-12 w-12 text-zinc-700" />
            <p className="text-lg font-medium text-zinc-500">
              No events found in this category
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-sm font-bold text-violet-400 hover:text-violet-300"
            >
              View all events →
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, i) => {
              const date = formatEventDate(event.date);
              return (
                <Link
                  key={event.id}
                  href={`/event/${event.id}`}
                  className="event-card group relative flex flex-col border border-white/[0.06] bg-[#0A0A0A]"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="event-card-glow" />

                  {/* Image area */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-[20px] bg-zinc-900">
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${categoryColors[event.category] || "from-violet-900 to-pink-900"}`}
                      />
                    )}
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

                    {/* Date badge on image */}
                    <div className="absolute left-3 top-3 date-badge rounded-lg border border-white/10 bg-black/70 px-3 py-1.5 text-center backdrop-blur-md">
                      <div className="text-lg font-black leading-none text-white">
                        {date.day}
                      </div>
                      <div className="text-[10px] font-bold tracking-[0.12em] text-violet-400">
                        {date.month}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    {/* Category */}
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-violet-400">
                        {event.category}
                      </span>
                      {i === 0 && (
                        <span className="rounded-full bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-pink-400">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold leading-tight text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Bottom meta */}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Clock className="h-3 w-3" />
                        {date.weekday}, {date.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-violet-400">
                        <Ticket className="h-3 w-3" />
                        Details
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Bottom Newsletter CTA ── */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-r from-violet-950/50 via-black to-pink-950/50 p-8 sm:p-12">
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <Sparkles className="h-8 w-8 text-violet-400" />
          <h3
            className="text-2xl font-black tracking-tight sm:text-3xl"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Never miss a weekend
          </h3>
          <p className="max-w-md text-sm text-zinc-400">
            Get the best Jakarta events delivered every Friday. Curated by humans, not algorithms.
          </p>
          <div className="flex w-full max-w-sm items-center gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none"
            />
            <button className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-violet-500/20">
              Subscribe
            </button>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />
      </section>
    </div>
  );
}
