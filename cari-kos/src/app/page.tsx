"use client";

import Link from 'next/link';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useMemo, useRef, useState } from 'react';
import { ChevronRight, Heart, Info, RotateCcw, Sparkles, X } from 'lucide-react';
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
  const y = index === 0 ? swipe.y : offset * 12;
  const rot = index === 0 ? swipe.rot : offset * -1.5;
  const scale = index === 0 ? 1 : 1 - offset * 0.06;

  return {
    transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`,
    opacity: index === 0 ? 1 : Math.max(0.35, 1 - offset * 0.18)
  };
}

function KosPhoto({ kos }: { kos: Kos }) {
  return (
    <div className="kos-media" style={{ background: kos.photos[0] }}>
      <div className="kos-overlay">
        <div>
          <div className="pill" style={{ marginBottom: 10, background: 'rgba(0,0,0,0.28)' }}>
            <Sparkles size={14} /> {kosTypeLabel[kos.type]}
          </div>
          <h2 className="kos-name">{kos.name}</h2>
        </div>
        <div className="pill" style={{ background: 'rgba(0,0,0,0.32)' }}>
          ★ {kos.rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const kos = useKosStore((state) => state.kos);
  const toggleSaved = useKosStore((state) => state.toggleSaved);
  const saved = useKosStore((state) => state.saved);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipe, setSwipe] = useState<SwipeState>(initialSwipe);
  const [animating, setAnimating] = useState(false);
  const pointerRef = useRef<{ id: number; x: number; y: number } | null>(null);

  const current = kos[activeIndex];
  const remaining = kos.length - activeIndex;
  const nearby = useMemo(() => kos.slice(activeIndex, activeIndex + 3), [kos, activeIndex]);

  const goNext = (direction: 'left' | 'right') => {
    if (!current || animating) return;
    setAnimating(true);
    setSwipe((prev) => ({
      ...prev,
      dragging: false,
      direction,
      x: direction === 'right' ? EXIT_DISTANCE : -EXIT_DISTANCE,
      y: 0,
      rot: direction === 'right' ? 18 : -18
    }));

    if (direction === 'right') {
      toggleSaved(current.id);
    }

    window.setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
      setSwipe(initialSwipe);
      setAnimating(false);
    }, 220);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!current || animating) return;
    pointerRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setSwipe((prev) => ({ ...prev, dragging: true, direction: null }));
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerRef.current || pointerRef.current.id !== event.pointerId || animating) return;
    const dx = event.clientX - pointerRef.current.x;
    const dy = event.clientY - pointerRef.current.y;
    const rot = dx / 20;
    setSwipe({ x: dx, y: dy * 0.18, rot, dragging: true, direction: dx > 0 ? 'right' : 'left' });
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerRef.current || pointerRef.current.id !== event.pointerId) return;
    const dx = swipe.x;
    pointerRef.current = null;
    if (Math.abs(dx) > SWIPE_LIMIT) {
      goNext(dx > 0 ? 'right' : 'left');
      return;
    }
    setSwipe(initialSwipe);
  };

  if (!current) {
    return (
      <div className="shell-scroll" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="hero-card" style={{ textAlign: 'center' }}>
          <div className="badge-live" style={{ justifyContent: 'center' }}>Semua kos sudah dilihat</div>
          <h2 className="section-title" style={{ marginTop: 14 }}>Reset dan mulai lagi</h2>
          <p className="subtle" style={{ marginTop: 8 }}>Kamu sudah menelusuri semua 10 kos. Mulai ulang untuk melihat lagi.</p>
          <button className="primary-btn" onClick={() => setActiveIndex(0)} style={{ marginTop: 16, width: '100%' }}>
            <RotateCcw size={16} /> Mulai Ulang
          </button>
        </div>
        <div className="stack-links" style={{ justifyContent: 'center' }}>
          <Link className="link-btn" href="/saved">Lihat Tersimpan</Link>
          <Link className="link-btn" href="/filter">Filter Kos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell-scroll" style={{ overflow: 'hidden' }}>
      <div className="topbar">
        <div className="brand">
          <h1>CARI_KOS</h1>
          <p>Swipe. Save. Share. Jakarta kos energy.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link className="pill" href="/saved">Saved {saved.length}</Link>
          <Link className="pill" href="/filter">Filter</Link>
        </div>
      </div>

      <div className="hero-card">
        <div className="hero-chip-row">
          <span className="chip"><Sparkles size={14} /> TikTok-style kos finder</span>
          <span className="chip">Swipe kanan untuk simpan</span>
          <span className="chip">Swipe kiri untuk skip</span>
        </div>
      </div>

      <div className="counter-row">
        <span className="badge-live">Kos {activeIndex + 1}/{kos.length}</span>
        <span>{remaining} peluang lagi di stack</span>
      </div>

      <div className="stack-area">
        <div className="stack">
          {nearby.map((item, index) => {
              const isTop = index === 0;
              const style = makeTransform(index, swipe);
              const glow = isTop
                ? swipe.direction === 'right'
                  ? '0 0 0 1px rgba(34,197,94,.38), 0 18px 65px rgba(34,197,94,.12)'
                  : swipe.direction === 'left'
                    ? '0 0 0 1px rgba(239,68,68,.36), 0 18px 65px rgba(239,68,68,.12)'
                    : undefined
                : undefined;

              return (
                <div
                  key={item.id}
                  className="kos-card"
                  data-swipe={isTop ? swipe.direction ?? '' : ''}
                  style={{
                    zIndex: 20 - index,
                    transition: isTop && swipe.dragging ? 'none' : 'transform 220ms ease, opacity 220ms ease, box-shadow 220ms ease',
                    boxShadow: glow,
                    ...style
                  }}
                  onPointerDown={isTop ? onPointerDown : undefined}
                  onPointerMove={isTop ? onPointerMove : undefined}
                  onPointerUp={isTop ? finishPointer : undefined}
                  onPointerCancel={isTop ? finishPointer : undefined}
                >
                  <KosPhoto kos={item} />
                  <div className="kos-body">
                    <div className="price-row">
                      <div className="price">{formatCurrency(item.price)}</div>
                      <div className="pill">{formatDistance(item.distance_km)}</div>
                    </div>
                    <div className="kos-location">{item.address}</div>
                    <div className="chip-row">
                      {item.facilities.slice(0, 4).map((facility) => (
                        <span key={facility} className="chip">{facility}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                      <span className="subtle">{item.description}</span>
                      <Link href={`/detail/${item.id}`} className="pill">Detail <ChevronRight size={14} /></Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="action-bar">
        <button className="action-btn skip" onClick={() => goNext('left')}><X size={18} /> Skip</button>
        <button className="action-btn save" onClick={() => goNext('right')}><Heart size={18} /> Save</button>
        <button className="action-btn info" onClick={() => router.push(`/detail/${current.id}`)}><Info size={18} /> Info</button>
      </div>
    </div>
  );
}
