'use client';

import { FormEvent, useState } from 'react';
import { Heart, MessageCircleMore, Send, Sparkles } from 'lucide-react';
import { useOjolStore } from '@/lib/store';

export default function CommunityPage() {
  const { communityTips, addCommunityTip } = useOjolStore();
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Ojol motor');
  const [location, setLocation] = useState('Jakarta');
  const [content, setContent] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!author.trim() || !content.trim()) return;

    addCommunityTip({
      author: author.trim(),
      role: role.trim() || 'Ojol motor',
      location: location.trim() || 'Jakarta',
      content: content.trim(),
    });

    setAuthor('');
    setRole('Ojol motor');
    setLocation('Jakarta');
    setContent('');
  }

  return (
    <div className="space-y-6 pb-10">
      <section className="rounded-[2rem] border border-orange-500/15 bg-gradient-to-br from-orange-500/18 via-black to-black p-5 sm:p-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
            <Sparkles className="h-4 w-4" />
            Tips wall komunitas ojol
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Bagi tips, baca pengalaman, dan saling bantu.</h1>
          <p className="text-base leading-7 text-orange-50/75 sm:text-lg">
            Feed ini penuh catatan singkat dari driver lain. Tambahkan tips kamu sendiri supaya yang lain bisa langsung pakai di jalan.
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-orange-500/12 bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <MessageCircleMore className="h-5 w-5 text-orange-300" />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-300/70">Tambah tips</p>
              <h2 className="text-2xl font-bold text-white">Tulis catatan singkat</h2>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-orange-100/75">Nama</span>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: Andi"
                className="min-h-14 w-full rounded-2xl border border-orange-500/15 bg-black/35 px-4 text-white outline-none transition placeholder:text-orange-100/30 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-orange-100/75">Peran</span>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ojol motor / Driver mobil"
                className="min-h-14 w-full rounded-2xl border border-orange-500/15 bg-black/35 px-4 text-white outline-none transition placeholder:text-orange-100/30 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-orange-100/75">Lokasi</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Jakarta Selatan"
                className="min-h-14 w-full rounded-2xl border border-orange-500/15 bg-black/35 px-4 text-white outline-none transition placeholder:text-orange-100/30 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-orange-100/75">Tips</span>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Contoh: Pindah ke titik dekat stasiun setelah hujan, order pendek lebih cepat muter."
                className="w-full rounded-2xl border border-orange-500/15 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-orange-100/30 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 text-base font-semibold text-black transition hover:bg-orange-400"
          >
            Kirim tips
            <Send className="h-5 w-5" />
          </button>
        </form>

        <div className="space-y-4 rounded-[2rem] border border-orange-500/12 bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-orange-300" />
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-300/70">Feed komunitas</p>
              <h2 className="text-2xl font-bold text-white">Tips yang lagi dibaca</h2>
            </div>
          </div>

          <div className="space-y-3">
            {communityTips.map((tip) => (
              <article key={tip.id} className="rounded-3xl border border-white/10 bg-black/25 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{tip.author}</p>
                    <p className="text-sm text-orange-100/60">
                      {tip.role} · {tip.location} · {tip.createdAt}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-orange-500/10 px-3 py-2 text-sm text-orange-300 ring-1 ring-orange-500/20">
                    {tip.likes} suka
                  </div>
                </div>
                <p className="mt-3 text-base leading-7 text-orange-50/82">{tip.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
