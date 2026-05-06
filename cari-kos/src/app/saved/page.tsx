"use client";

import Link from 'next/link';
import { ArrowRight, BookmarkCheck, Heart } from 'lucide-react';
import { useKosStore } from '@/lib/store';
import { formatCurrency, formatDistance } from '@/lib/format';

export default function SavedPage() {
  const kos = useKosStore((state) => state.kos);
  const savedIds = useKosStore((state) => state.saved);
  const savedKos = kos.filter((item) => savedIds.includes(item.id));

  return (
    <div className="saved-page">
      <div className="topbar">
        <div className="brand">
          <h1>SAVED</h1>
          <p>Kos yang kamu tandai buat dicek lagi.</p>
        </div>
        <Link className="pill" href="/">Swipe Lagi</Link>
      </div>

      <div className="hero-card">
        <div className="badge-live"><BookmarkCheck size={14} /> {savedKos.length} kos tersimpan</div>
        <p className="subtle" style={{ marginTop: 10 }}>Koleksi favorit kamu tersusun di sini. Buka detail untuk lanjut ngobrol sama pemilik.</p>
      </div>

      {savedKos.length === 0 ? (
        <div className="empty-state">
          <h2 className="section-title">Belum ada yang disimpan</h2>
          <p className="subtle" style={{ marginTop: 8 }}>Geser kanan di halaman utama untuk isi daftar saved kamu.</p>
          <Link href="/" className="primary-btn" style={{ marginTop: 14, display: 'inline-flex' }}>Mulai Swipe</Link>
        </div>
      ) : (
        <div className="saved-grid">
          {savedKos.map((item) => (
            <div key={item.id} className="saved-tile">
              <div className="photo" style={{ background: item.photos[0], minHeight: 130, display: 'flex', alignItems: 'flex-end', padding: 12 }}>
                <span className="pill" style={{ background: 'rgba(0,0,0,.3)' }}>★ {item.rating.toFixed(1)}</span>
              </div>
              <div className="content">
                <h3 style={{ margin: 0, fontSize: 16 }}>{item.name}</h3>
                <p className="subtle" style={{ marginTop: 6 }}>{formatCurrency(item.price)} • {formatDistance(item.distance_km)}</p>
                <p className="subtle" style={{ marginTop: 8 }}>{item.address}</p>
                <Link href={`/detail/${item.id}`} className="pill" style={{ marginTop: 12, width: 'fit-content' }}>Buka <ArrowRight size={14} /></Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="hero-card" style={{ marginTop: 14 }}>
        <div className="badge-live"><Heart size={14} /> Kos yang kamu suka bakal stay di sini</div>
      </div>
    </div>
  );
}
