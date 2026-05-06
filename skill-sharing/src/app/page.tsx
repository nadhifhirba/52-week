'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Search, Star, Users } from 'lucide-react';
import { useSkillStore } from '@/lib/store';

const currency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const sortOptions = [
  { value: 'date-asc', label: 'Tanggal terdekat' },
  { value: 'price-asc', label: 'Harga termurah' },
  { value: 'price-desc', label: 'Harga termahal' },
] as const;

export default function HomePage() {
  const workshops = useSkillStore((state) => state.workshops);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [sort, setSort] = useState<(typeof sortOptions)[number]['value']>('date-asc');

  const categories = useMemo(() => ['Semua', ...new Set(workshops.map((item) => item.category))], [workshops]);

  const visibleWorkshops = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return workshops
      .filter((item) => {
        const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
        const matchesSearch =
          normalizedQuery.length === 0 ||
          [item.title, item.mentor, item.category, item.description, item.location, item.tags.join(' ')]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [activeCategory, query, sort, workshops]);

  const totalSlots = workshops.reduce((sum, item) => sum + item.maxParticipants, 0);
  const remainingSlots = workshops.reduce((sum, item) => sum + (item.maxParticipants - item.enrolled), 0);

  return (
    <div className="grid" style={{ gap: 20 }}>
      <section className="hero">
        <div className="badge">Belajar langsung dari mentor lokal</div>
        <h2>Temukan workshop praktis untuk upgrade skill kamu.</h2>
        <p>
          Jelajah kelas digital, kuliner, seni, dan keuangan dalam satu marketplace yang cepat,
          gelap, dan siap dipakai di ponsel.
        </p>
        <div className="hero-actions">
          <Link href="/create" className="button">
            Jadi Mentor <ArrowRight size={16} />
          </Link>
          <Link href="/bookings" className="button-ghost">
            Booking Saya
          </Link>
        </div>
        <div className="stats-row">
          <div className="metric">
            <strong>{workshops.length}</strong>
            Workshop aktif
          </div>
          <div className="metric">
            <strong>{totalSlots}</strong>
            Total kursi
          </div>
          <div className="metric">
            <strong>{remainingSlots}</strong>
            Slot tersedia
          </div>
        </div>
      </section>

      <section className="toolbar">
        <label className="form-field">
          <span>Search workshop</span>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--muted)' }} />
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari mentor, topik, lokasi..."
              style={{ paddingLeft: 42 }}
            />
          </div>
        </label>

        <label className="form-field">
          <span>Urutkan</span>
          <select className="select" value={sort} onChange={(event) => setSort(event.target.value as any)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section>
        <div className="filter-row" style={{ marginBottom: 16 }}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? 'button' : 'pill'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid workshop-grid">
          {visibleWorkshops.map((workshop) => {
            const remaining = workshop.maxParticipants - workshop.enrolled;
            return (
              <Link key={workshop.id} href={`/workshop/${workshop.id}`} className="card">
                <div className="card-media" style={{ backgroundImage: `url(${workshop.image})` }}>
                  <div className="card-overlay" />
                </div>
                <div className="card-body">
                  <div className="meta-row">
                    <span className="card-meta">{workshop.category}</span>
                    <span className="card-meta">
                      <CalendarDays size={14} />
                      {dateFormatter.format(new Date(workshop.date))}
                    </span>
                  </div>
                  <h3 className="card-title">{workshop.title}</h3>
                  <p className="card-description">{workshop.description}</p>
                  <div className="tags-row">
                    {workshop.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="card-footer">
                    <div>
                      <div className="price">{currency.format(workshop.price)}</div>
                      <div className="muted">{workshop.duration} menit • {workshop.time}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="muted" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Users size={14} />
                        {remaining} slot
                      </div>
                      <div className={remaining <= 3 ? 'warning' : 'muted'}>
                        {remaining <= 3 ? 'Cepat penuh' : 'Tersedia'}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {visibleWorkshops.length === 0 ? (
          <div className="empty-state" style={{ marginTop: 16 }}>
            <div className="badge">Hasil tidak ditemukan</div>
            <h3 className="section-title">Coba kata kunci atau kategori lain.</h3>
            <p className="muted">Kami tidak menemukan workshop yang cocok dengan pencarianmu.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
