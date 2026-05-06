"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { facilitiesCatalog, kosTypeLabel, useKosStore } from '@/lib/store';
import { formatCurrency, formatDistance } from '@/lib/format';

const typeOptions: Array<'all' | 'putra' | 'putri' | 'campur'> = ['all', 'putra', 'putri', 'campur'];

export default function FilterPage() {
  const kos = useKosStore((state) => state.kos);
  const [maxPrice, setMaxPrice] = useState(3500000);
  const [type, setType] = useState<'all' | 'putra' | 'putri' | 'campur'>('all');
  const [maxDistance, setMaxDistance] = useState(3);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return kos.filter((item) => {
      const matchPrice = item.price <= maxPrice;
      const matchType = type === 'all' ? true : item.type === type;
      const matchDistance = item.distance_km <= maxDistance;
      const matchFacilities = selectedFacilities.length === 0
        ? true
        : selectedFacilities.every((facility) => item.facilities.includes(facility));
      return matchPrice && matchType && matchDistance && matchFacilities;
    });
  }, [kos, maxPrice, type, maxDistance, selectedFacilities]);

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((current) =>
      current.includes(facility)
        ? current.filter((item) => item !== facility)
        : [...current, facility]
    );
  };

  return (
    <div className="filter-page">
      <div className="topbar">
        <Link className="pill" href="/"><ArrowLeft size={14} /> Back</Link>
        <div className="brand" style={{ textAlign: 'right' }}>
          <h1>FILTER</h1>
          <p>Atur harga, tipe, fasilitas, dan jarak.</p>
        </div>
      </div>

      <div className="hero-card">
        <div className="badge-live"><SlidersHorizontal size={14} /> Filter real-time</div>
        <p className="subtle" style={{ marginTop: 10 }}>Gunakan kontrol di bawah untuk menyaring kos yang paling masuk akal buat kamu.</p>
      </div>

      <div className="filters">
        <div className="mini-panel">
          <div className="label">Budget maksimal</div>
          <div className="range-row" style={{ marginTop: 6 }}>
            <span>{formatCurrency(800000)}</span>
            <strong>{formatCurrency(maxPrice)}</strong>
          </div>
          <input className="range" type="range" min={800000} max={3500000} step={50000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>

        <div className="mini-panel">
          <div className="label">Tipe kos</div>
          <div className="filter-chip-row" style={{ marginTop: 10 }}>
            {typeOptions.map((option) => (
              <button key={option} className="filter-chip" data-active={type === option} onClick={() => setType(option)}>
                {option === 'all' ? 'Semua' : kosTypeLabel[option]}
              </button>
            ))}
          </div>
        </div>

        <div className="mini-panel">
          <div className="label">Jarak maksimal</div>
          <div className="range-row" style={{ marginTop: 6 }}>
            <span>0 km</span>
            <strong>{maxDistance.toFixed(1)} km</strong>
          </div>
          <input className="range" type="range" min={0.5} max={5} step={0.1} value={maxDistance} onChange={(e) => setMaxDistance(Number(e.target.value))} />
        </div>

        <div className="mini-panel">
          <div className="label">Fasilitas wajib</div>
          <div className="filter-chip-row" style={{ marginTop: 10 }}>
            {facilitiesCatalog.map((facility) => (
              <button key={facility} className="filter-chip" data-active={selectedFacilities.includes(facility)} onClick={() => toggleFacility(facility)}>
                {facility}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-card" style={{ marginTop: 14 }}>
        <div className="badge-live">{filtered.length} kos cocok</div>
        <p className="subtle" style={{ marginTop: 10 }}>Hasil di bawah berubah sesuai filter yang kamu pilih.</p>
      </div>

      <div className="search-result">
        {filtered.map((item) => (
          <div key={item.id} className="result-card">
            <div className="photo" style={{ background: item.photos[0], minHeight: 150 }} />
            <div className="content">
              <div className="range-row" style={{ alignItems: 'center' }}>
                <strong>{item.name}</strong>
                <span className="pill">{formatDistance(item.distance_km)}</span>
              </div>
              <p className="subtle" style={{ marginTop: 6 }}>{item.address}</p>
              <p className="subtle" style={{ marginTop: 6 }}>{formatCurrency(item.price)} • {kosTypeLabel[item.type]} • ★ {item.rating.toFixed(1)}</p>
              <div className="chip-row" style={{ marginTop: 10 }}>
                {item.facilities.slice(0, 4).map((facility) => (
                  <span key={facility} className="chip">{facility}</span>
                ))}
              </div>
              <Link href={`/detail/${item.id}`} className="pill" style={{ marginTop: 12, width: 'fit-content' }}>Lihat Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
