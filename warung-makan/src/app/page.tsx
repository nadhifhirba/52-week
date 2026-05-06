"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, Flame, Search, Sparkles, Star, ThumbsUp } from "lucide-react";

import { FEELING_PRESETS, FOOD_TAGS, TAG_META, formatPriceRange, normalizeText, tagMatches } from "@/lib/catalog";
import type { Place } from "@/lib/store";
import { useFoodStore } from "@/lib/store";

const SORTS = [
  { key: "rating", label: "Rating" },
  { key: "newest", label: "Terbaru" },
  { key: "votes", label: "Vote" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function PlaceCard({ place, voteCount }: { place: Place; voteCount: number }) {
  return (
    <Link
      href={`/place/${place.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/8 bg-white/[0.045] shadow-[0_16px_60px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 hover:border-orange-400/35 hover:bg-white/[0.06]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        {place.imageUrl ? (
          <img src={place.imageUrl} alt={place.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-end bg-gradient-to-br from-orange-500 via-amber-500 to-zinc-800 p-4">
            <div className="space-y-2">
              <p className="text-3xl">🍽️</p>
              <p className="text-sm font-semibold text-white/90">Foto menyusul, tapi vibes-nya sudah enak.</p>
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent p-4 pt-10">
          <div className="flex items-center justify-between gap-2 text-xs text-white/90">
            <span className="rounded-full bg-black/30 px-2.5 py-1 backdrop-blur">{formatPriceRange(place.priceRange)}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/18 px-2.5 py-1 text-orange-200 backdrop-blur">
              <ThumbsUp className="h-3.5 w-3.5" />
              {voteCount}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-tight text-white group-hover:text-orange-100">{place.name}</h3>
            <div className="flex items-center gap-1 rounded-full border border-orange-400/20 bg-orange-500/10 px-2 py-1 text-xs font-semibold text-orange-200">
              <Star className="h-3.5 w-3.5 fill-orange-300 text-orange-300" />
              {place.rating.toFixed(1)}
            </div>
          </div>
          <p className="line-clamp-2 text-sm leading-6 text-zinc-300">{place.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {place.tags.slice(0, 4).map((tag) => {
            const meta = TAG_META[tag as keyof typeof TAG_META];
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-xs text-zinc-200"
              >
                <span>{meta?.emoji ?? "🍴"}</span>
                <span>{meta?.label ?? tag}</span>
              </span>
            );
          })}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 text-sm text-zinc-400">
          <span className="line-clamp-1">{place.address}</span>
          <span className="inline-flex items-center gap-1 text-orange-300">
            Lihat <ArrowUpDown className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const places = useFoodStore((state) => state.places);
  const votes = useFoodStore((state) => state.votes);
  const [searchText, setSearchText] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("rating");

  const visiblePlaces = useMemo(() => {
    const q = normalizeText(searchText);

    const filtered = places.filter((place) => {
      const matchesSearch =
        q.length === 0 ||
        [place.name, place.description, place.address, place.submittedBy, place.tags.join(" ")].some((value) =>
          normalizeText(value).includes(q),
        );
      const matchesTag = tagMatches(place.tags, activeTags);
      return matchesSearch && matchesTag;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating || b.id.localeCompare(a.id);
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (votes[b.id] ?? 0) - (votes[a.id] ?? 0) || b.rating - a.rating;
    });

    return sorted;
  }, [activeTags, places, searchText, sortBy, votes]);

  const topFeeling = FEELING_PRESETS.find((preset) => preset.tags.every((tag) => activeTags.includes(tag)));

  const featuredCount = useMemo(() => places.filter((place) => place.rating >= 4.5).length, [places]);
  const voteCount = useMemo(() => Object.values(votes).reduce((sum, value) => sum + value, 0), [votes]);

  const applyFeeling = (preset: (typeof FEELING_PRESETS)[number]) => {
    setActiveTags(Array.from(new Set(preset.tags)));
    setSearchText(preset.query);
  };

  return (
    <div className="space-y-6 pb-10">
      <section className="overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(160deg,rgba(249,115,22,0.16),rgba(255,255,255,0.03)_38%,rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange-200">
            <Sparkles className="h-3.5 w-3.5" />
            Cek warung sesuai mood
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Cari makan bukan dari menu doang, tapi dari rasa yang lagi kamu pengen.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
              Pilih tag, tulis suasana hati, lalu biarkan Warung Makan nyodorin spot yang paling nyambung. Cocok buat yang lagi cari sarapan hangat, pedas yang nendang, atau kopi buat nunda pulang.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Temuan aktif</p>
              <p className="mt-2 text-2xl font-black text-white">{visiblePlaces.length}</p>
              <p className="text-sm text-zinc-400">warung lagi cocok sama filter kamu</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Favorit komunitas</p>
              <p className="mt-2 text-2xl font-black text-white">{featuredCount}</p>
              <p className="text-sm text-zinc-400">tempat dengan rating tinggi</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Total vote</p>
              <p className="mt-2 text-2xl font-black text-white">{voteCount}</p>
              <p className="text-sm text-zinc-400">suara lapar yang sudah terkumpul</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-[30px] border border-white/8 bg-white/[0.035] p-4 sm:p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-orange-200">
          <Search className="h-4 w-4" />
          Saya pengen yang...
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="misalnya: yang anget, yang pedes, atau yang cocok buat nongkrong"
              className="w-full rounded-3xl border border-white/10 bg-zinc-950/70 px-5 py-4 pr-12 text-sm text-white outline-none ring-0 transition placeholder:text-zinc-500 focus:border-orange-400/45 focus:bg-zinc-950"
            />
            <Flame className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300" />
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchText("");
              setActiveTags([]);
            }}
            className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-zinc-200 transition hover:border-orange-400/35 hover:bg-orange-500/10 hover:text-white"
          >
            Reset filter
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {FEELING_PRESETS.map((preset) => {
              const active = preset.tags.every((tag) => activeTags.includes(tag));
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyFeeling(preset)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border border-orange-400/45 bg-orange-500 text-zinc-950 shadow-[0_12px_30px_rgba(249,115,22,0.25)]"
                      : "border border-white/8 bg-white/5 text-zinc-200 hover:border-orange-400/30 hover:bg-orange-500/10"
                  }`}
                >
                  <span className="mr-2">{preset.emoji}</span>
                  {preset.label}
                </button>
              );
            })}
          </div>
          <div className="grid gap-2 text-sm text-zinc-400 sm:grid-cols-2 xl:grid-cols-3">
            {FEELING_PRESETS.map((preset) => (
              <button
                key={preset.helper}
                type="button"
                onClick={() => applyFeeling(preset)}
                className="rounded-2xl border border-white/[0.06] bg-black/15 px-4 py-3 text-left transition hover:border-orange-400/30 hover:bg-orange-500/[0.08]"
              >
                <p className="font-semibold text-orange-100">{preset.label}</p>
                <p className="mt-1 text-zinc-400">{preset.helper}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-[30px] border border-white/8 bg-white/[0.03] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-orange-200">
              <ArrowUpDown className="h-4 w-4" />
              Sortir dulu
            </div>
            {topFeeling ? (
              <p className="mt-1 text-sm text-zinc-400">
                Lagi fokus ke <span className="text-orange-200">{topFeeling.label}</span> — pilihanmu sudah dipersempit biar nggak muter-muter.
              </p>
            ) : (
              <p className="mt-1 text-sm text-zinc-400">Pilih vibe dulu, atau langsung urutkan dari rating, terbaru, atau vote terbanyak.</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {SORTS.map((sort) => (
              <button
                key={sort.key}
                type="button"
                onClick={() => setSortBy(sort.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  sortBy === sort.key
                    ? "bg-orange-500 text-zinc-950 shadow-[0_12px_30px_rgba(249,115,22,0.25)]"
                    : "border border-white/8 bg-white/5 text-zinc-200 hover:border-orange-400/35 hover:bg-orange-500/10"
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {FOOD_TAGS.map((tag) => {
            const meta = TAG_META[tag];
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTags((current) => toggleValue(current, tag))}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-orange-400/50 bg-orange-500 text-zinc-950 shadow-[0_12px_30px_rgba(249,115,22,0.22)]"
                    : "border-white/8 bg-white/5 text-zinc-200 hover:border-orange-400/30 hover:bg-orange-500/10"
                }`}
                title={meta.hint}
              >
                <span>{meta.emoji}</span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visiblePlaces.length > 0 ? (
          visiblePlaces.map((place) => (
            <PlaceCard key={place.id} place={place} voteCount={votes[place.id] ?? 0} />
          ))
        ) : (
          <div className="sm:col-span-2 xl:col-span-3 rounded-[30px] border border-dashed border-orange-400/25 bg-orange-500/[0.06] p-8 text-center">
            <p className="text-2xl font-black text-white">Belum ada yang pas nih.</p>
            <p className="mt-2 text-sm text-zinc-300">Coba longgarkan tag, ganti vibe, atau reset filter dulu. Kalau belum ada, tambah warung favoritmu sendiri.</p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Link href="/add" className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950">
                Tambah warung
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSearchText("");
                  setActiveTags([]);
                }}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200"
              >
                Bersihkan filter
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
