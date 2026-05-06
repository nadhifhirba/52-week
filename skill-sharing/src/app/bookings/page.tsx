'use client';

import Link from 'next/link';
import { CalendarDays, Clock3, MapPin, Ticket, Wallet } from 'lucide-react';
import { useMemo } from 'react';
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

export default function BookingsPage() {
  const bookings = useSkillStore((state) => state.bookings);
  const totalSpent = useMemo(() => bookings.reduce((sum, booking) => sum + booking.price, 0), [bookings]);

  if (!bookings.length) {
    return (
      <div className="empty-state">
        <div className="badge">Belum ada booking</div>
        <h2 className="section-title">Kamu belum mendaftar workshop apa pun.</h2>
        <p className="muted">Mulai jelajah workshop dan pilih kelas yang paling cocok untukmu.</p>
        <Link href="/" className="button">
          Jelajah workshop
        </Link>
      </div>
    );
  }

  return (
    <section className="grid" style={{ gap: 16 }}>
      <div className="hero">
        <div className="badge">Booking saya</div>
        <h2>Daftar workshop yang sudah kamu amankan.</h2>
        <p>Kelola semua enrollment kamu dalam satu tampilan yang sederhana dan siap dibuka di ponsel.</p>
        <div className="stats-row">
          <div className="metric">
            <strong>{bookings.length}</strong>
            Booking aktif
          </div>
          <div className="metric">
            <strong>{currency.format(totalSpent)}</strong>
            Total investasi belajar
          </div>
        </div>
      </div>

      <div className="grid">
        {bookings.map((booking) => (
          <article key={booking.id} className="booking-card">
            <div className="detail-body">
              <div className="meta-row">
                <span className="card-meta">{booking.category}</span>
                <span className="card-meta">
                  <Ticket size={14} />
                  Booking aktif
                </span>
              </div>
              <h3 className="card-title">{booking.title}</h3>
              <p className="muted">Mentor: {booking.mentor}</p>
              <div className="meta-row">
                <span className="card-meta">
                  <CalendarDays size={14} />
                  {dateFormatter.format(new Date(booking.date))}
                </span>
                <span className="card-meta">
                  <Clock3 size={14} />
                  {booking.time} WIB
                </span>
                <span className="card-meta">
                  <MapPin size={14} />
                  {booking.location}
                </span>
              </div>
              <div className="booking-footer">
                <div>
                  <div className="price">{currency.format(booking.price)}</div>
                  <div className="muted">Dipesan pada {new Date(booking.bookedAt).toLocaleString('id-ID')}</div>
                </div>
                <div className="card-meta">
                  <Wallet size={14} />
                  Sudah dibayar
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
