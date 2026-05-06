"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, MapPinned, MessageCircleMore, Share2, Star, ThumbsUp } from "lucide-react";

import { formatPriceRange, TAG_META } from "@/lib/catalog";
import { useFoodStore } from "@/lib/store";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`h-4 w-4 ${index < Math.round(rating) ? "fill-orange-300 text-orange-300" : "text-white/25"}`} />
      ))}
    </div>
  );
}

export default function PlaceDetailPage() {
  const params = useParams<{ id: string }>();
  const place = useFoodStore((state) => state.places.find((item) => item.id === params.id));
  const voteCount = useFoodStore((state) => state.votes[params.id] ?? 0);
  const vote = useFoodStore((state) => state.vote);
  const unvote = useFoodStore((state) => state.unvote);
  const [hasVoted, setHasVoted] = useState(false);

  const shareText = useMemo(() => {
    if (!place) return "";
    const tags = place.tags.map((tag) => `#${tag}`).join(" ");
    return `Aku nemu warung enak nih: ${place.name}\n${place.description}\nAlamat: ${place.address}\nTags: ${tags}\nCek di Warung Makan by Feeling.`;
  }, [place]);

  if (!place) {
    return (
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/8 bg-white/[0.035] p-6 text-center">
        <p className="text-2xl font-black text-white">Warungnya belum ketemu.</p>
        <p className="mt-2 text-sm text-zinc-300">Mungkin sudah dipindah, belum disimpan, atau kamu salah ketik alamat detailnya.</p>
        <Link href="/" className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950">
          <ArrowLeft className="h-4 w-4" />
          Balik ke Jelajah
        </Link>
      </div>
    );
  }

  const toggleVote = () => {
    if (hasVoted) {
      unvote(place.id);
      setHasVoted(false);
      return;
    }

    vote(place.id);
    setHasVoted(true);
  };

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${shareText}\n${url}`.trim();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-5 pb-10">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-orange-400/35 hover:bg-orange-500/10 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Balik
      </Link>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
          <div className="relative aspect-[4/3] bg-zinc-900">
            {place.imageUrl ? (
              <img src={place.imageUrl} alt={place.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-zinc-900 text-7xl">
                🍲
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/90">
                <span className="rounded-full bg-black/35 px-3 py-1 backdrop-blur">{formatPriceRange(place.priceRange)}</span>
                <span className="rounded-full bg-orange-500/20 px-3 py-1 text-orange-100 backdrop-blur">{place.submittedBy}</span>
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-5xl">{place.name}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-200/90 sm:text-base">{place.description}</p>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Rating</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-2xl font-black text-white">{place.rating.toFixed(1)}</p>
                  <Stars rating={place.rating} />
                </div>
                <div className="rounded-2xl bg-orange-500/10 p-3 text-orange-200">
                  <Star className="h-5 w-5 fill-orange-300 text-orange-300" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Vote komunitas</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-2xl font-black text-white">{voteCount}</p>
                  <p className="text-sm text-zinc-400">suara lapar</p>
                </div>
                <div className="rounded-2xl bg-orange-500/10 p-3 text-orange-200">
                  <ThumbsUp className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">Diposting</p>
              <p className="mt-3 text-base font-semibold text-white">{new Date(place.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
              <p className="text-sm text-zinc-400">{place.address}</p>
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-[32px] border border-white/8 bg-white/[0.035] p-5 sm:p-6">
          <div className="rounded-[28px] border border-white/8 bg-gradient-to-br from-orange-500/20 via-white/5 to-transparent p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-orange-200">
              <MapPinned className="h-4 w-4" />
              Peta rasa
            </div>
            <div className="mt-4 overflow-hidden rounded-[24px] border border-white/8 bg-zinc-950">
              <div className="flex aspect-[1.1] items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.22),transparent_22%),radial-gradient(circle_at_80%_30%,rgba(251,146,60,0.14),transparent_26%),linear-gradient(180deg,#14131b,#0a0a0f)] p-6 text-center">
                <div className="max-w-sm space-y-3">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-200">
                    <MapPinned className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-semibold text-white">{place.address}</p>
                  <p className="text-sm text-zinc-400">
                    Koordinat kira-kira {place.lat.toFixed(4)}, {place.lng.toFixed(4)}. Cocok buat lihat arah, bukan buat nyasar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-orange-200">Tags yang nempel</p>
            <div className="flex flex-wrap gap-2">
              {place.tags.map((tag) => {
                const meta = TAG_META[tag as keyof typeof TAG_META];
                return (
                  <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-sm text-zinc-100">
                    <span>{meta?.emoji ?? "🍴"}</span>
                    <span>{meta?.label ?? tag}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={toggleVote}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                hasVoted ? "bg-orange-500 text-zinc-950" : "border border-white/10 bg-white/5 text-zinc-100 hover:border-orange-400/35 hover:bg-orange-500/10"
              }`}
            >
              <ThumbsUp className="h-4 w-4" />
              {hasVoted ? "Batal vote" : "Vote tempat ini"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 transition hover:border-orange-400/35 hover:bg-orange-500/10"
            >
              <Share2 className="h-4 w-4" />
              Share ke WhatsApp
            </button>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-black/20 p-4 text-sm leading-7 text-zinc-300">
            <p className="font-semibold text-white">Kenapa tempat ini masuk?</p>
            <p className="mt-2">
              Warung ini punya kombinasi tag yang jelas, rasa yang mudah dibayangin, dan vibe yang gampang dicocokkan sama mood kamu. Tinggal pilih yang lagi kamu cari, terus gas.
            </p>
          </div>

          <Link href="/add" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 text-sm font-bold text-zinc-950 transition hover:brightness-110">
            <MessageCircleMore className="h-4 w-4" />
            Mau tambahin tempat baru?
          </Link>
        </aside>
      </section>
    </div>
  );
}