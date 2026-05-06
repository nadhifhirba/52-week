'use client';

import Link from 'next/link';
import { ArrowRight, Leaf, PackageCheck, Recycle, Sprout } from 'lucide-react';
import { useTrashTreasureStore } from '@/lib/store';
import { formatDateTime, wasteEmoji, wasteLabels } from '@/lib/utils';

export default function DashboardPage() {
  const deposits = useTrashTreasureStore((state) => state.deposits);
  const userPoints = useTrashTreasureStore((state) => state.userPoints);

  const totalKg = deposits.reduce((sum, deposit) => sum + deposit.weight_kg, 0);
  const recycledBags = deposits.length;
  const savedTrees = Math.max(1, Math.round(totalKg / 12));
  const co2SavedKg = Math.round(totalKg * 1.8);

  const recentDeposits = deposits.slice(0, 5);

  return (
    <div>
      <section className="hero">
        <div className="card pad">
          <div className="pill">
            <Sprout size={16} />
            Aksi hijau dimulai dari pemilahan sampah
          </div>
          <h1 className="page-title" style={{ marginTop: 18 }}>
            Dashboard Waste Bank yang membuat sampah punya nilai baru.
          </h1>
          <p className="page-subtitle">
            Pantau poin Anda, jumlah limbah yang berhasil didaur ulang, dan dampak lingkungan yang sudah tercapai.
            Semua data tersimpan rapi di satu tempat untuk memudahkan setor maupun jemput sampah.
          </p>

          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">Total poin</div>
              <div className="stat-value">{userPoints.toLocaleString('id-ID')}</div>
              <div className="stat-note">Poin siap ditukar dengan reward</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total sampah didaur ulang</div>
              <div className="stat-value">{totalKg.toFixed(1)} kg</div>
              <div className="stat-note">{recycledBags} transaksi masuk</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Dampak lingkungan</div>
              <div className="stat-value">{savedTrees} pohon</div>
              <div className="stat-note">Anda telah menyelamatkan {savedTrees} pohon</div>
            </div>
          </div>
        </div>

        <div className="card pad">
          <div className="card-header">
            <div>
              <h2 className="card-title">Ringkasan dampak</h2>
              <p className="card-text">Setiap kilogram yang dipilah membantu mengurangi beban TPA.</p>
            </div>
            <div className="brand-mark" aria-hidden="true">
              <Leaf size={20} />
            </div>
          </div>

          <div className="section" style={{ marginTop: 18 }}>
            <div className="list-item">
              <div>
                <strong>Emisi yang dihindari</strong>
                <span className="muted">Estimasi CO₂ yang tidak terbuang ke lingkungan</span>
              </div>
              <div className="badge success">{co2SavedKg} kg CO₂</div>
            </div>
            <div className="list-item">
              <div>
                <strong>Proses aktif</strong>
                <span className="muted">Transaksi sedang menunggu, diproses, atau selesai</span>
              </div>
              <div className="badge warning">{recentDeposits.filter((item) => item.status !== 'selesai').length} aktif</div>
            </div>
            <div className="list-item">
              <div>
                <strong>Komitmen hijau</strong>
                <span className="muted">Setor teratur membuat bank sampah lebih produktif</span>
              </div>
              <div className="badge neutral">Konsisten itu penting</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Quick actions</h2>
          <span className="muted">Akses fitur utama lebih cepat</span>
        </div>
        <div className="actions">
          <Link href="/setor" className="button button-primary">
            Setor Sampah <ArrowRight size={16} style={{ display: 'inline', marginLeft: 6 }} />
          </Link>
          <Link href="/jemput" className="button button-secondary">
            Jadwalkan Jemput
          </Link>
        </div>
      </section>

      <section className="section grid-2">
        <div className="card pad">
          <div className="section-head">
            <h2>Recent deposits</h2>
            <span className="muted">Transaksi terbaru</span>
          </div>
          <div className="list">
            {recentDeposits.map((deposit) => (
              <div key={deposit.id} className="list-item">
                <div>
                  <strong>
                    {wasteEmoji[deposit.type]} {wasteLabels[deposit.type]}
                  </strong>
                  <span className="muted">
                    {deposit.weight_kg.toFixed(1)} kg • {formatDateTime(deposit.date)}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="badge success">+{deposit.points} poin</div>
                  <div className="muted" style={{ marginTop: 6, fontSize: '0.85rem' }}>
                    {deposit.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card pad">
          <div className="section-head">
            <h2>Kenapa ini penting?</h2>
            <span className="muted">Dampak nyata</span>
          </div>
          <div className="list">
            <div className="list-item">
              <div>
                <strong>Kurangi sampah tercampur</strong>
                <span className="muted">Pemilahan dari rumah memudahkan proses daur ulang.</span>
              </div>
              <Recycle size={18} color="#10b981" />
            </div>
            <div className="list-item">
              <div>
                <strong>Nilai ekonomi bertambah</strong>
                <span className="muted">Sampah terpilah bisa dikonversi menjadi poin.</span>
              </div>
              <PackageCheck size={18} color="#10b981" />
            </div>
            <div className="list-item">
              <div>
                <strong>Budaya hijau keluarga</strong>
                <span className="muted">Anak-anak belajar kebiasaan yang berkelanjutan.</span>
              </div>
              <Leaf size={18} color="#10b981" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
