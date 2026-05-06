"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, ImagePlus, PlusCircle, Sparkles } from "lucide-react";

import { FOOD_TAGS, TAG_META } from "@/lib/catalog";
import { useFoodStore } from "@/lib/store";

const initialForm = {
  name: "",
  description: "",
  address: "",
  imageUrl: "",
  priceRange: 2,
};

export default function AddPlacePage() {
  const addPlace = useFoodStore((state) => state.addPlace);
  const [form, setForm] = useState(initialForm);
  const [selectedTags, setSelectedTags] = useState<string[]>(["nasi"]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const selectedTagMeta = useMemo(() => selectedTags.map((tag) => TAG_META[tag as keyof typeof TAG_META]), [selectedTags]);

  const update = (key: keyof typeof form, value: string | number) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 3) nextErrors.name = "Nama tempat minimal 3 karakter.";
    if (form.description.trim().length < 20) nextErrors.description = "Ceritakan sedikit lebih lengkap biar orang kebayang makanannya.";
    if (form.address.trim().length < 8) nextErrors.address = "Alamatnya terlalu singkat.";
    if (selectedTags.length === 0) nextErrors.tags = "Pilih minimal satu tag.";
    if (form.imageUrl.trim() && !/^https?:\/\//i.test(form.imageUrl.trim()) && !form.imageUrl.trim().startsWith("data:image/")) {
      nextErrors.imageUrl = "Masukkan URL gambar yang valid atau data:image/...";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    addPlace({
      name: form.name.trim(),
      description: form.description.trim(),
      tags: selectedTags,
      address: form.address.trim(),
      lat: -6.2,
      lng: 106.8167,
      priceRange: form.priceRange as 1 | 2 | 3 | 4,
      rating: 4,
      imageUrl: form.imageUrl.trim(),
      submittedBy: "Kamu",
    });

    setToast("Warung berhasil ditambahkan. Siap-siap jadi rekomendasi baru!");
    setForm(initialForm);
    setSelectedTags(["nasi"]);
    setErrors({});
    window.setTimeout(() => setToast(null), 2800);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-10">
      <section className="rounded-[32px] border border-white/8 bg-white/[0.035] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.28)] sm:p-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange-200">
          <PlusCircle className="h-3.5 w-3.5" />
          Tambah tempat baru
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">Punya warung andalan? Masukin aja.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
          Isi data secukupnya, pilih tag yang paling ngena, dan biarkan orang lain nemu tempat makan favoritmu dari rasa yang mereka cari.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-[32px] border border-white/8 bg-white/[0.035] p-5 sm:p-7">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-orange-100">Nama tempat</span>
            <input
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="contoh: Warung Makan Pakde Joko"
              className="w-full rounded-3xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-orange-400/45"
            />
            {errors.name ? <p className="text-sm text-red-300">{errors.name}</p> : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-orange-100">Alamat</span>
            <input
              value={form.address}
              onChange={(event) => update("address", event.target.value)}
              placeholder="contoh: Jl. Tebet Barat Dalam, Jakarta Selatan"
              className="w-full rounded-3xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-orange-400/45"
            />
            {errors.address ? <p className="text-sm text-red-300">{errors.address}</p> : null}
          </label>
        </div>

        <label className="space-y-2 block">
          <span className="text-sm font-semibold text-orange-100">Deskripsi singkat</span>
          <textarea
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            placeholder="Ceritakan kenapa tempat ini enak, rame, atau cocok buat mood tertentu."
            rows={5}
            className="w-full rounded-[28px] border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition focus:border-orange-400/45"
          />
          {errors.description ? <p className="text-sm text-red-300">{errors.description}</p> : null}
        </label>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-orange-100">
            <Sparkles className="h-4 w-4" />
            Pilih tag
          </div>
          <div className="flex flex-wrap gap-2">
            {FOOD_TAGS.map((tag) => {
              const meta = TAG_META[tag];
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-orange-400/50 bg-orange-500 text-zinc-950"
                      : "border-white/8 bg-white/5 text-zinc-200 hover:border-orange-400/30 hover:bg-orange-500/10"
                  }`}
                >
                  <span>{meta.emoji}</span>
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>
          {errors.tags ? <p className="text-sm text-red-300">{errors.tags}</p> : null}
          <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
            {selectedTagMeta.map((meta) => (
              <span key={meta.label} className="rounded-full border border-white/8 bg-black/20 px-3 py-1">
                {meta.emoji} {meta.label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-orange-100">Gambar URL</span>
            <div className="relative">
              <input
                value={form.imageUrl}
                onChange={(event) => update("imageUrl", event.target.value)}
                placeholder="https://... atau data:image/svg+xml,..."
                className="w-full rounded-3xl border border-white/10 bg-zinc-950/70 px-4 py-3 pr-12 text-white outline-none transition focus:border-orange-400/45"
              />
              <ImagePlus className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-300" />
            </div>
            {errors.imageUrl ? <p className="text-sm text-red-300">{errors.imageUrl}</p> : <p className="text-sm text-zinc-400">Kosongkan kalau mau pakai placeholder bawaan.</p>}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-orange-100">Kisaran harga: {Array.from({ length: form.priceRange }, () => "Rp").join("")}</span>
            <input
              type="range"
              min={1}
              max={4}
              step={1}
              value={form.priceRange}
              onChange={(event) => update("priceRange", Number(event.target.value))}
              className="h-3 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-orange-500"
            />
            <p className="text-sm text-zinc-400">1 = ramah dompet, 4 = tetap worth it buat yang lagi lapar banget.</p>
          </label>
        </div>

        <div className="rounded-[28px] border border-white/8 bg-black/20 p-4">
          <p className="text-sm font-semibold text-orange-100">Preview singkat</p>
          <p className="mt-2 text-sm leading-7 text-zinc-300">
            {form.name || "Nama warung"} — {form.description || "deskripsi belum diisi"}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-400">Data akan disimpan lokal di browser kamu. Jadi bisa langsung muncul di feed tanpa ribet.</p>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:brightness-110"
          >
            <CheckCircle2 className="h-4 w-4" />
            Simpan warung
          </button>
        </div>
      </form>

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-3xl border border-orange-400/35 bg-zinc-950/95 px-4 py-3 text-sm font-semibold text-orange-100 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
