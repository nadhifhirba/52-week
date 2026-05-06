"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, MapPin, MessageCircle, Phone } from 'lucide-react';
import { formatCurrency, formatDistance, pricePerYear, waLink } from '@/lib/format';
import { kosTypeLabel, useKosStore } from '@/lib/store';

function gradientFromSeed(seed: string, index: number) {
  const palettes = [
    `linear-gradient(145deg, rgba(249,115,22,.9), rgba(15,23,42,.95))`,
    `linear-gradient(145deg, rgba(34,197,94,.88), rgba(15,23,42,.96))`,
    `linear-gradient(145deg, rgba(59,130,246,.88), rgba(17,24,39,.96))`,
    `linear-gradient(145deg, rgba(244,63,94,.88), rgba(15,23,42,.96))`
  ];
  const char = seed.charCodeAt(index % seed.length) || 0;
  return palettes[char % palettes.length];
}

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const kos = useKosStore((state) => state.kos);
  const toggleSaved = useKosStore((state) => state.toggleSaved);
  const item = kos.find((entry) => entry.id === params.id);

  if (!item) {
    return (
      <div className="detail-page">
        <div className="hero-card">
          <button className="pill" onClick={() => router.back()}><ArrowLeft size={14} /> Kembali</button>
          <h2 className="section-title" style={{ marginTop: 12 }}>Kos tidak ditemukan</h2>
          <p className="subtle" style={{ marginTop: 8 }}>Mungkin kos ini sudah dipindahkan dari stack.</p>
          <Link href="/" className="primary-btn" style={{ marginTop: 16, display: 'inline-flex' }}>Kembali ke beranda</Link>
        </div>
      </div>
    );
  }

  const saved = item.saved;
  const monthly = formatCurrency(item.price);
  const yearly = formatCurrency(pricePerYear(item.price));
  const wa = waLink(item.contact, item.name);

  return (
    <div className="detail-page">
      <div className="topbar">
        <button className="pill" onClick={() => router.back()}><ArrowLeft size={14} /> Back</button>
        <button className="pill" onClick={() => toggleSaved(item.id)}>{saved ? <Heart size={14} fill="currentColor" /> : <Heart size={14} />} {saved ? 'Tersimpan' : 'Simpan'}</button>
      </div>

      <div className="hero-card">
        <div className="badge-live">{kosTypeLabel[item.type]} • {item.rating.toFixed(1)} ★ • {formatDistance(item.distance_km)}</div>
        <h2 className="section-title" style={{ marginTop: 14 }}>{item.name}</h2>
        <p className="subtle" style={{ marginTop: 6 }}>{item.address}</p>
      </div>

      <div className="gallery">
        {item.photos.map((photo, index) => (
          <div key={`${item.id}-${index}`} className="gallery-card" style={{ background: index === 0 ? photo : gradientFromSeed(item.id, index) }}>
            <div className="gallery-label">
              <span className="pill" style={{ width: 'fit-content', background: 'rgba(0,0,0,.28)' }}>Foto {index + 1}</span>
              <strong style={{ fontSize: 18 }}>{index === 0 ? 'Vibe utama kos' : 'Sudut tambahan'}</strong>
              <span className="subtle" style={{ color: '#f8fafc' }}>{item.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 12 }}>
        <div className="mini-panel">
          <div className="label">Harga per bulan</div>
          <div className="value">{monthly}</div>
        </div>
        <div className="mini-panel">
          <div className="label">Harga per tahun</div>
          <div className="value">{yearly}</div>
        </div>
      </div>

      <div className="info-panel" style={{ margin: '12px 16px 0' }}>
        <div className="label">Fasilitas</div>
        <div className="chip-row" style={{ marginTop: 10 }}>
          {item.facilities.map((facility) => (
            <span key={facility} className="chip">{facility}</span>
          ))}
        </div>
      </div>

      <div className="info-panel" style={{ margin: '12px 16px 0' }}>
        <div className="label">Ringkasan kos</div>
        <p style={{ margin: '10px 0 0', color: '#f4f4f5', lineHeight: 1.7 }}>{item.description}</p>
      </div>

      <div className="grid-2" style={{ marginTop: 12 }}>
        <div className="mini-panel">
          <div className="label">Kontak</div>
          <div className="value" style={{ fontSize: 16 }}><Phone size={16} style={{ display: 'inline', marginRight: 6 }} />{item.contact}</div>
        </div>
        <div className="mini-panel">
          <div className="label">Status</div>
          <div className="value" style={{ fontSize: 16 }}>{saved ? 'Masuk saved' : 'Belum disimpan'}</div>
        </div>
      </div>

      <div className="info-panel" style={{ margin: '12px 16px 0' }}>
        <div className="label">Peta area</div>
        <div style={{ marginTop: 10, borderRadius: 20, minHeight: 160, border: '1px solid rgba(255,255,255,.08)', background: 'radial-gradient(circle at 30% 25%, rgba(249,115,22,.26), transparent 20%), linear-gradient(135deg, rgba(39,39,42,.9), rgba(15,23,42,.98))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
          <MapPin size={26} color="#f97316" />
          <span style={{ color: '#f4f4f5' }}>Map placeholder area {formatDistance(item.distance_km)} dari titik acuan</span>
        </div>
      </div>

      <div className="detail-actions">
        <button className="primary-btn" onClick={() => toggleSaved(item.id)}><Heart size={16} /> {saved ? 'Hapus dari Saved' : 'Simpan Kos'}</button>
        <a className="link-btn" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Hubungi Pemilik</a>
        <a className="link-btn" href={`tel:+62${item.contact.replace(/^0/, '')}`}><Phone size={16} /> Telepon</a>
      </div>

      <div style={{ padding: '12px 16px 0' }}>
        <a className="primary-btn" href={wa} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'center' }}>Hubungi Pemilik via WhatsApp</a>
      </div>
    </div>
  );
}
