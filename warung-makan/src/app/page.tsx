"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpDown, Flame, Search, Sparkles, Star, ThumbsUp,
  MapPin, Clock, Award,
} from "lucide-react";

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

function PlaceCard({
  place,
  voteCount,
  isFeatured,
}: {
  place: Place;
  voteCount: number;
  isFeatured?: boolean;
}) {
  return (
    <Link
      href={`/place/${place.id}`}
      className={`recipe-card group flex flex-col ${isFeatured ? "featured" : ""}`}
    >
      {/* Image */}
      <div
        className="recipe-image"
        style={
          place.imageUrl
            ? { backgroundImage: `url(${place.imageUrl})` }
            : { background: "linear-gradient(135deg, #E8DED1, #D5C9B5)" }
        }
      >
        <div className="recipe-tags">
          {place.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="recipe-tag">
              {tag}
            </span>
          ))}
          {isFeatured && (
            <span className="recipe-tag" style={{ background: "rgba(198,40,40,0.85)" }}>
              <Flame size={10} style={{ marginRight: 3 }} />
              Editor&apos;s Pick
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="recipe-body">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-lg font-bold leading-tight text-[#2D2D2D] group-hover:text-[#C62828] transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {place.name}
          </h3>
          <div className="stars shrink-0">
            <Star size={12} fill="#D4A853" color="#D4A853" />
            <span className="font-semibold">{place.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#A3A0A0]">
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            {place.area || "Jakarta"}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp size={10} />
            {voteCount} votes
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="price-tag">{formatPriceRange(place.priceRange)}</span>
          <span className="text-xs font-medium text-[#C62828] opacity-0 group-hover:opacity-100 transition-opacity">
            Lihat detail →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const places = useFoodStore((state) => state.places);
  const votes = useFoodStore((state) => state.votes);
  const [query, setQuery] = useState("");
  const [activeFeelings, setActiveFeelings] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("rating");

  const results = useMemo(() => {
    let filtered = places;

    if (query.trim()) {
      const q = normalizeText(query);
      filtered = filtered.filter(
        (p) =>
          normalizeText(p.name).includes(q) ||
          p.tags?.some((t) => normalizeText(t).includes(q))
      );
    }

    if (activeFeelings.length > 0) {
      filtered = filtered.filter((p) =>
        activeFeelings.some((f) => tagMatches(p.tags ?? [], f))
      );
    }

    if (activeTags.length > 0) {
      filtered = filtered.filter((p) =>
        activeTags.every((t) => p.tags?.includes(t))
      );
    }

    const sorted = [...filtered];
    if (sortKey === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sortKey === "newest") sorted.sort((a, b) => b.createdAt - a.createdAt);
    if (sortKey === "votes") sorted.sort((a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0));

    return sorted;
  }, [places, votes, query, activeFeelings, activeTags, sortKey]);

  const featured = results[0];
  const rest = results.slice(1);

  return (
    <div className="space-y-10">
      {/* ── Hero ── */}
      <section className="space-y-6">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C62828]">
            <ChefHat size={13} />
            Culinary Discovery
          </div>
          <h2 className="section-title text-4xl sm:text-5xl">
            Temukan warung sesuai{" "}
            <span style={{ fontStyle: "italic", color: "#C62828" }}>mood</span> kamu
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed max-w-lg">
            Dari soto pagi sampai mie tek-tek tengah malam. Pilih feeling, bukan cuma lokasi.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A0A0]"
            size={16}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama warung, soto, mie ayam..."
            className="w-full rounded-full border border-[#E8E0D5] bg-white py-3 pl-11 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#CCC] focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-red-100"
          />
        </div>

        {/* Feeling pills */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#A3A0A0]">
            Feeling hari ini
          </p>
          <div className="flex flex-wrap gap-2">
            {FEELING_PRESETS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFeelings((prev) => toggleValue(prev, f.key))}
                className={`feeling-pill ${activeFeelings.includes(f.key) ? "active" : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sort ── */}
      <div className="flex items-center gap-2">
        <ArrowUpDown size={14} className="text-[#A3A0A0]" />
        {SORTS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSortKey(s.key)}
            className={`sort-pill ${sortKey === s.key ? "active" : ""}`}
          >
            {s.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#CCC]">{results.length} tempat</span>
      </div>

      {/* ── Food Tags ── */}
      <div className="flex flex-wrap gap-1.5">
        {FOOD_TAGS.slice(0, 12).map((tag) => {
          const meta = TAG_META[tag];
          return (
            <button
              key={tag}
              onClick={() => setActiveTags((prev) => toggleValue(prev, tag))}
              className={`feeling-pill text-[11px] ${
                activeTags.includes(tag) ? "active" : ""
              }`}
            >
              {meta?.emoji && <span className="mr-1">{meta.emoji}</span>}
              {tag}
            </button>
          );
        })}
      </div>

      {/* ── Featured Place ── */}
      {featured && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Award size={14} className="text-[#C62828]" />
            <p
              className="text-sm font-bold uppercase tracking-[0.15em] text-[#C62828]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Editor&apos;s Pick
            </p>
          </div>
          <PlaceCard place={featured} voteCount={votes[featured.id] ?? 0} isFeatured />
        </section>
      )}

      {/* ── Grid ── */}
      {rest.length > 0 && (
        <section className="space-y-3">
          <p
            className="text-sm font-bold uppercase tracking-[0.15em] text-[#A3A0A0]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            More to explore
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                voteCount={votes[place.id] ?? 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Empty State ── */}
      {results.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <Search size={32} className="text-[#E8E0D5]" />
          <p
            className="text-xl text-[#A3A0A0]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Tidak ada warung yang cocok
          </p>
          <button
            onClick={() => {
              setQuery("");
              setActiveFeelings([]);
              setActiveTags([]);
            }}
            className="text-sm font-medium text-[#C62828] hover:underline"
          >
            Reset semua filter →
          </button>
        </div>
      )}

      {/* Ornament divider */}
      <div className="ornament-divider">✦ ✦ ✦</div>
    </div>
  );
}
