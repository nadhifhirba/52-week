'use client';

import Link from 'next/link';
import { ArrowRight, Leaf, PackageCheck, Recycle, Sprout, Droplets, TreePine, Wind } from 'lucide-react';
import { useTrashTreasureStore } from '@/lib/store';
import { formatDateTime, wasteEmoji, wasteLabels } from '@/lib/utils';

export default function DashboardPage() {
  const deposits = useTrashTreasureStore((state) => state.deposits);
  const userPoints = useTrashTreasureStore((state) => state.userPoints);

  const totalKg = deposits.reduce((sum, d) => sum + d.weight_kg, 0);
  const recycledBags = deposits.length;
  const savedTrees = Math.max(1, Math.round(totalKg / 12));
  const co2SavedKg = Math.round(totalKg * 1.8);
  const recentDeposits = deposits.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5F1E8] via-white to-[#EDF7F0] p-8 sm:p-12">
        {/* Decorative leaf shapes */}
        <div className="absolute -right-4 -top-4 text-[120px] opacity-[0.06] select-none">🌿</div>
        <div className="absolute -bottom-4 -left-4 text-[80px] opacity-[0.06] select-none">🌱</div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <span className="eco-pill">
            <Sprout size={14} /> Aksi hijau dimulai dari pemilahan sampah
          </span>
          <h1 className="impact-number !text-[#1A1F14]" style={{ fontFamily: "var(--font-amatic)", fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 1 }}>
            Sampah punya nilai,{" "}
            <span style={{ color: "#166534" }}>bumi punya masa depan</span>
          </h1>
          <p className="max-w-xl text-[#5C6B4E] leading-relaxed">
            Pantau poin Anda, limbah yang didaur ulang, dan dampak lingkungan yang sudah tercapai.
          </p>

          {/* Quick CTA */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/setor" className="btn-primary">
              Setor Sampah <ArrowRight size={16} />
            </Link>
            <Link href="/jemput" className="inline-flex items-center gap-2 rounded-full border border-[#DDE5D5] bg-white px-6 py-3 text-sm font-semibold text-[#166534] transition-all hover:bg-[#F5F1E8] hover:shadow-sm">
              Jadwalkan Jemput
            </Link>
          </div>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="nature-card text-center">
          <Droplets size={28} className="mx-auto mb-3 text-[#7DD3FC]" />
          <p className="impact-number !text-[#166534]" style={{ fontSize: "48px" }}>
            {userPoints.toLocaleString('id-ID')}
          </p>
          <p className="text-sm font-semibold text-[#1A1F14]">Total Poin</p>
          <p className="mt-1 text-xs text-[#9BA88A]">Siap ditukar reward</p>
        </div>
        <div className="nature-card text-center">
          <Recycle size={28} className="mx-auto mb-3 text-[#22C55E]" />
          <p className="impact-number !text-[#166534]" style={{ fontSize: "48px" }}>
            {totalKg.toFixed(1)} kg
          </p>
          <p className="text-sm font-semibold text-[#1A1F14]">Sampah Didaur Ulang</p>
          <p className="mt-1 text-xs text-[#9BA88A]">{recycledBags} transaksi</p>
        </div>
        <div className="nature-card text-center">
          <TreePine size={28} className="mx-auto mb-3 text-[#166534]" />
          <p className="impact-number !text-[#166534]" style={{ fontSize: "48px" }}>
            {savedTrees}
          </p>
          <p className="text-sm font-semibold text-[#1A1F14]">Pohon Terselamatkan</p>
          <p className="mt-1 text-xs text-[#9BA88A]">{co2SavedKg} kg CO₂ dihindari</p>
        </div>
      </section>

      {/* ── Recent Deposits + Impact ── */}
      <section className="grid gap-4 sm:grid-cols-2">
        {/* Recent deposits */}
        <div className="nature-card">
          <h3 className="mb-4 text-lg font-bold text-[#1A1F14]" style={{ fontFamily: "var(--font-amatic)", fontSize: "1.5rem" }}>
            Setoran Terbaru
          </h3>
          <div className="space-y-2">
            {recentDeposits.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#9BA88A]">Belum ada setoran</p>
            ) : (
              recentDeposits.map((d) => (
                <div key={d.id} className="deposit-item">
                  <div>
                    <span className="text-sm font-semibold text-[#1A1F14]">
                      {wasteEmoji[d.type]} {wasteLabels[d.type]}
                    </span>
                    <p className="text-xs text-[#9BA88A]">
                      {d.weight_kg.toFixed(1)} kg · {formatDateTime(d.date)}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#22C55E]/10 px-3 py-1 text-xs font-bold text-[#166534]">
                    +{d.points} pts
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Why it matters */}
        <div className="nature-card">
          <h3 className="mb-4 text-lg font-bold text-[#1A1F14]" style={{ fontFamily: "var(--font-amatic)", fontSize: "1.5rem" }}>
            Kenapa Ini Penting
          </h3>
          <div className="space-y-3">
            {[
              { icon: Recycle, title: 'Kurangi sampah tercampur', desc: 'Pemilahan dari rumah memudahkan proses daur ulang.' },
              { icon: PackageCheck, title: 'Nilai ekonomi bertambah', desc: 'Sampah terpilah bisa dikonversi menjadi poin.' },
              { icon: Leaf, title: 'Budaya hijau keluarga', desc: 'Anak-anak belajar kebiasaan yang berkelanjutan.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3 rounded-xl bg-[#F5F1E8] p-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10 text-[#166534]">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1F14]">{item.title}</p>
                    <p className="text-xs text-[#9BA88A]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="rounded-3xl bg-[#166534] p-8 text-center text-white sm:p-12">
        <Wind size={32} className="mx-auto mb-4 text-[#4ADE80]" />
        <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-amatic)", fontSize: "2.4rem" }}>
          Setiap kilogram berarti
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-green-100">
          Bergabunglah dengan ribuan warga Jakarta yang sudah memilah sampah dari rumah.
        </p>
        <Link
          href="/setor"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-[#166534] transition-all hover:bg-green-50 hover:shadow-lg"
        >
          Mulai Setor Sekarang <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
