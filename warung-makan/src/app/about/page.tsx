import Link from "next/link";
import { Sparkles, Tag, MapPinned, Heart } from "lucide-react";

const points = [
  {
    icon: Tag,
    title: "Cari dari tag, bukan cuma nama",
    body: "Kalau lagi pengen yang pedas, manis, atau sarapan hangat, kamu tinggal pilih tag yang sesuai mood.",
  },
  {
    icon: Sparkles,
    title: "Feeling presets",
    body: "Satu klik buat pindah ke suasana yang kamu mau: anget, nampol, gurih, sampai malam-malam cari makan.",
  },
  {
    icon: MapPinned,
    title: "Detail yang cukup buat mutusin",
    body: "Ada alamat, harga, rating, votes, dan placeholder map biar kamu nggak asal gas tanpa konteks.",
  },
  {
    icon: Heart,
    title: "Warung lokal, rasa familiar",
    body: "Daftar tempatnya sengaja dibuat terasa dekat dengan keseharian Jakarta: warung, tenda, kopi, dan jajanan.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-10">
      <section className="rounded-[32px] border border-white/8 bg-white/[0.035] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange-200">
          Tentang aplikasi
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">Warung Makan by Feeling</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base">
          Aplikasi ini dibuat buat orang yang sering bingung mau makan apa. Alih-alih scroll panjang, kamu cukup pilih rasa yang lagi dicari, lalu sistem akan menyaring warung berdasarkan tag dan suasana hati.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {points.map((point) => {
          const Icon = point.icon;
          return (
            <div key={point.title} className="rounded-[30px] border border-white/8 bg-white/[0.035] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-200">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-300">{point.body}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[32px] border border-white/8 bg-gradient-to-br from-orange-500/15 via-white/[0.04] to-transparent p-6 sm:p-8">
        <h3 className="text-2xl font-black text-white">Cara pakainya</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
            <p className="text-sm font-semibold text-orange-200">1. Jelajah</p>
            <p className="mt-2 text-sm text-zinc-300">Pilih tag atau preset feeling yang paling mirip sama mood kamu.</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
            <p className="text-sm font-semibold text-orange-200">2. Buka detail</p>
            <p className="mt-2 text-sm text-zinc-300">Lihat rating, vote, alamat, dan peta placeholder buat bantu keputusan.</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
            <p className="text-sm font-semibold text-orange-200">3. Tambah sendiri</p>
            <p className="mt-2 text-sm text-zinc-300">Kalau ada tempat favorit lain, masukin aja biar koleksi makin hidup.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-zinc-950">
            Mulai jelajah
          </Link>
          <Link href="/add" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100">
            Tambah warung baru
          </Link>
        </div>
      </section>
    </div>
  );
}
