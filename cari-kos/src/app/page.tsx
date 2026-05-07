"use client";

import Link from 'next/link';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useMemo, useRef, useState } from 'react';
import { Heart, Info, RotateCcw, Sparkles, X, MapPin, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency, formatDistance } from '@/lib/format';
import { Kos, kosTypeLabel, useKosStore } from '@/lib/store';

const SWIPE_LIMIT = 110;
const EXIT_DISTANCE = 520;

type SwipeState = {
  x: number;
  y: number;
  rot: number;
  dragging: boolean;
  direction: 'left' | 'right' | null;
};

const initialSwipe: SwipeState = { x: 0, y: 0, rot: 0, dragging: false, direction: null };

function makeTransform(index: number, swipe: SwipeState) {
  const offset = Math.min(index, 2);
  const x = index === 0 ? swipe.x : 0;
  const y = index === 0 ? swipe.y : offset * 10;
  const rot = index === 0 ? swipe.rot : offset * -1.2;
  const scale = index === 0 ? 1 : 1 - offset * 0.05;

  return {
    transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`,
    opacity: index === 0 ? 1 : Math.max(0.4, 1 - offset * 0.15),
  };
}

function KosPhoto({ kos }: { kos: Kos }) {
  return (
    <div
      className="kos-media"
      style={{ backgroundImage: kos.photos[0] ? `url(${kos.photos[0]})` : undefined, backgroundColor: kos.photos[0] ? undefined : '#E8DED1' }}
    >
      <div className="kos-overlay">
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            borderRadius: 100, padding: '6px 12px', marginBottom: 10,
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
            fontSize: 11, fontWeight: 600, color: '#FFF',
          }}>
            <Sparkles size={13} /> {kosTypeLabel[kos.type]}
          </div>
          <h2 className="kos-name">{kos.name}</h2>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          borderRadius: 100, padding: '6px 12px',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
          fontSize: 12, fontWeight: 600, color: '#FFF',
        }}>
          <Star size={12} fill="#B8860B" color="#B8860B" /> {kos.rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const kosList = useKosStore((state) => state.kos);
  const toggleSaved = useKosStore((state) => state.toggleSaved);
  const saved = useKosStore((state) => state.saved);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipe, setSwipe] = useState<SwipeState>(initialSwipe);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const visibleKos = useMemo(() => {
    const notSeen = kosList.filter((k) => !saved.includes(k.id));
    return notSeen.slice(activeIndex, activeIndex + 3);
  }, [kosList, saved, activeIndex]);

  const currentKos = visibleKos[0];
  const remaining = kosList.filter((k) => !saved.includes(k.id)).length - activeIndex;

  const handlePointerDown = (e: ReactPointerEvent) => {
    startRef.current = { x: e.clientX, y: e.clientY };
    setSwipe((s) => ({ ...s, dragging: true }));
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (!startRef.current || !currentKos) return;
    const x = e.clientX - startRef.current.x;
    const y = e.clientY - startRef.current.y;
    const rot = x * 0.05;
    let direction: 'left' | 'right' | null = null;
    if (x > SWIPE_LIMIT) direction = 'right';
    else if (x < -SWIPE_LIMIT) direction = 'left';
    setSwipe({ x, y, rot, dragging: true, direction });
  };

  const handlePointerUp = () => {
    if (!currentKos) return;
    if (swipe.direction) {
      if (swipe.direction === 'right') toggleSaved(currentKos.id);
      setActiveIndex((i) => i + 1);
      setSwipe(initialSwipe);
      startRef.current = null;
    } else if (Math.abs(swipe.x) > SWIPE_LIMIT) {
      setActiveIndex((i) => i + 1);
      setSwipe(initialSwipe);
      startRef.current = null;
    } else {
      setSwipe(initialSwipe);
    }
  };

  if (!currentKos) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, padding: 20 }}>
        <div className="empty-state">
          <p style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>
            Semua kos sudah dilihat
          </p>
          <p style={{ margin: 0, fontSize: 14 }}>
            Tidak ada listing baru saat ini.
          </p>
          <button
            onClick={() => setActiveIndex(0)}
            style={{
              marginTop: 16, padding: '10px 24px', borderRadius: 100,
              border: '1px solid #B8860B', background: 'rgba(184,134,11,0.08)',
              color: '#B8860B', fontWeight: 600, cursor: 'pointer', fontSize: 14,
            }}
          >
            <RotateCcw size={14} style={{ marginRight: 6 }} />
            Lihat ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="brand">
          <h1>Cari Kos</h1>
          <p>Premium listings · Jakarta</p>
        </div>
        <Link
          href="/saved"
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
            borderRadius: 100, border: '1px solid #E5E0D5', background: '#FFF',
            fontSize: 13, fontWeight: 600, color: '#6B6B6B', textDecoration: 'none',
            transition: 'all 0.2s',
          }}
        >
          <Heart size={14} />
          Saved ({saved.length})
        </Link>
      </div>

      {/* Counter */}
      <div className="counter-row">
        <div className="badge-live">{remaining} listings tersedia</div>
        <Link
          href="/filter"
          style={{
            fontSize: 13, color: '#B8860B', fontWeight: 600, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          Filter & Range →
        </Link>
      </div>

      {/* Swipe area */}
      <div className="stack-area">
        <div className="stack">
          {visibleKos.map((k, i) => {
            const style = makeTransform(i, swipe);
            return (
              <div
                key={k.id}
                className="kos-card"
                data-swipe={i === 0 ? swipe.direction : undefined}
                style={{
                  ...style,
                  zIndex: 3 - i,
                  pointerEvents: i === 0 ? 'auto' : 'none',
                }}
                onPointerDown={i === 0 ? handlePointerDown : undefined}
                onPointerMove={i === 0 ? handlePointerMove : undefined}
                onPointerUp={i === 0 ? handlePointerUp : undefined}
              >
                <KosPhoto kos={k} />
                <div className="kos-body">
                  <div className="price-row">
                    <div className="price">
                      {formatCurrency(k.price)}
                      <small> / bulan</small>
                    </div>
                    <div style={{ fontSize: 13, color: '#6B6B6B' }}>
                      {formatDistance(k.distanceKm)} dari pusat
                    </div>
                  </div>
                  <div className="kos-location">
                    <MapPin size={13} style={{ display: 'inline', marginRight: 4, color: '#B8860B' }} />
                    {k.address || 'Jakarta'}
                  </div>
                  <div className="chip-row">
                    {k.amenities?.slice(0, 4).map((a) => (
                      <span key={a} className="chip">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action bar */}
      <div className="action-bar">
        <button className="action-btn skip" onClick={() => { setActiveIndex((i) => i + 1); setSwipe(initialSwipe); }}>
          <X size={18} /> Skip
        </button>
        <button className="action-btn info" onClick={() => currentKos && router.push(`/detail/${currentKos.id}`)}>
          <Info size={18} /> Detail
        </button>
        <button className="action-btn save" onClick={() => { toggleSaved(currentKos.id); setActiveIndex((i) => i + 1); setSwipe(initialSwipe); }}>
          <Heart size={18} /> Save
        </button>
      </div>
    </>
  );
}
