'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CalendarDays, Clock3, MapPin, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { useSkillStore } from '@/lib/store';

const currency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

export default function WorkshopDetailPage({ params }: { params: { id: string } }) {
  const workshop = useSkillStore((state) => state.workshops.find((item) => item.id === params.id));
  const enrollWorkshop = useSkillStore((state) => state.enrollWorkshop);
  const bookings = useSkillStore((state) => state.bookings);
  const [feedback, setFeedback] = useState('');

  const alreadyBooked = bookings.some((booking) => booking.workshopId === params.id);
  const remaining = useMemo(() => {
    if (!workshop) return 0;
    return workshop.maxParticipants - workshop.enrolled;
  }, [workshop]);

  if (!workshop) {
    return (
      <div className="empty-state">
        <div className="badge">Workshop tidak ditemukan</div>
        <h2 className="section-title">Data yang kamu cari tidak tersedia.</h2>
        <Link href="/" className="button">
          Kembali ke jelajah
        </Link>
      </div>
    );
  }

  const handleEnroll = () => {
    const result = enrollWorkshop(workshop.id);
    setFeedback(result.message);
  };

  return (
    <div className="detail-grid">
      <section className="detail-hero">
        <div className="detail-media" style={{ backgroundImage: `url(${workshop.image})` }} />
        <div className="detail-content">
          <div className="badge">{workshop.category}</div>
          <h2 className="detail-title">{workshop.title}</h2>
          <p className="detail-description">{workshop.description}</p>
          <div className="stats-row">
            <div className="metric">
              <strong>{currency.format(workshop.price)}</strong>
              Harga tiket
            </div>
            <div className="metric">
              <strong>{remaining}</strong>
              Sisa kursi
            </div>
            <div className="metric">
              <strong>{workshop.duration}m</strong>
              Durasi
            </div>
          </div>
          <div className="detail-footer">
            <button className="button" onClick={handleEnroll} disabled={remaining <= 0 || alreadyBooked}>
              {alreadyBooked ? 'Sudah booking' : remaining <= 0 ? 'Kuota penuh' : 'Daftar sekarang'}
            </button>
            <div className={remaining <= 3 ? 'warning' : 'success'}>Tersisa {remaining} slot</div>
          </div>
          {feedback ? <p className={feedback.includes('berhasil') ? 'success' : 'warning'}>{feedback}</p> : null}
        </div>
      </section>

      <section className="grid" style={{ gap: 16 }}>
        <article className="detail-card">
          <div className="detail-body">
            <div className="badge">Info mentor</div>
            <h3 className="section-title">{workshop.mentor}</h3>
            <p className="muted">
              Mentor berpengalaman yang siap membimbing kamu dari dasar sampai praktik langsung.
            </p>
            <div className="meta-row">
              <span className="card-meta">
                <UserRound size={14} />
                Mentor
              </span>
              <span className="card-meta">
                <ShieldCheck size={14} />
                Kurasi tim skill sharing
              </span>
            </div>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-body">
            <div className="badge">Jadwal workshop</div>
            <div className="meta-row">
              <span className="card-meta">
                <CalendarDays size={14} />
                {dateFormatter.format(new Date(workshop.date))}
              </span>
              <span className="card-meta">
                <Clock3 size={14} />
                {workshop.time} WIB
              </span>
              <span className="card-meta">
                <MapPin size={14} />
                {workshop.location}
              </span>
            </div>
            <div className="meta-row">
              <span className="card-meta">
                <Sparkles size={14} />
                Maks {workshop.maxParticipants} peserta
              </span>
            </div>
            <div className="tags-row">
              {workshop.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
