'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, Clock3, MapPin, Phone, Star, UserRound } from 'lucide-react';
import { SectionHeading, FieldShell, InputField, availabilityLabel, availabilityTone, distanceFromMonas, formatDistance, StatusPill } from '@/components/parking-ui';
import { formatRupiah, type ParkingSpot, useParkingStore } from '@/lib/store';

const galleryFallbacks = [
  'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
];

export default function SpotDetailClient({ spot }: { spot: ParkingSpot }) {
  const addBooking = useParkingStore((state) => state.addBooking);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState('08:00');
  const [durationHours, setDurationHours] = useState(4);
  const [renterName, setRenterName] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const distance = useMemo(() => distanceFromMonas(spot), [spot]);
  const totalPrice = durationHours * spot.pricePerHour;

  const handleBook = () => {
    addBooking({
      spotId: spot.id,
      spotName: `${spot.city ?? spot.ownerName} Spot`,
      renterName: renterName || 'Pelanggan Baru',
      date,
      startTime,
      durationHours,
      totalPrice,
      status: 'Menunggu',
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition hover:border-orange-500/30 hover:bg-orange-500/10">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke pencarian
        </Link>
        <StatusPill status={availabilityLabel(spot.availableHours)} />
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {galleryFallbacks.map((image, index) => (
                <div key={image} className={`overflow-hidden rounded-3xl border border-white/10 ${index === 0 ? 'sm:col-span-3' : ''}`}>
                  <img src={index === 0 ? spot.photo : image} alt={`${spot.ownerName} ${index + 1}`} className={`h-full w-full object-cover ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <SectionHeading
              eyebrow="Detail spot"
              title={`${spot.ownerName} • ${spot.city ?? 'Jakarta'}`}
              description={spot.description}
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/65 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Harga per jam</p>
                <p className="mt-2 text-2xl font-semibold text-orange-300">{formatRupiah(spot.pricePerHour)}</p>
                <p className="mt-1 text-sm text-slate-400">Cocok untuk parkir singkat maupun harian.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/65 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Jarak dari Monas</p>
                <p className="mt-2 text-2xl font-semibold text-white">{formatDistance(distance)}</p>
                <p className="mt-1 text-sm text-slate-400">Estimasi jarak dari pusat kota Jakarta.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/65 p-4">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400"><Clock3 className="h-4 w-4 text-orange-300" /> Jam operasional</p>
                <p className="mt-2 text-2xl font-semibold text-white">{spot.availableHours}</p>
                <p className="mt-1 text-sm text-slate-400">{availabilityLabel(spot.availableHours)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/65 p-4">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400"><Star className="h-4 w-4 fill-orange-400 text-orange-400" /> Rating</p>
                <p className="mt-2 text-2xl font-semibold text-white">{spot.rating.toFixed(1)} / 5</p>
                <p className="mt-1 text-sm text-slate-400">Ulasan pengguna untuk spot ini.</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/65 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <MapPin className="h-4 w-4 text-orange-300" />
                Lokasi
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{spot.address}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className={`rounded-full border px-3 py-1 ${availabilityTone(spot.availableHours)}`}>{availabilityLabel(spot.availableHours)}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-slate-300">{formatDistance(distance)} dekat area utama</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Harga mulai</p>
                <p className="text-3xl font-semibold text-orange-300">{formatRupiah(spot.pricePerHour)}</p>
                <p className="text-sm text-slate-400">per jam</p>
              </div>
              <StatusPill status={availabilityLabel(spot.availableHours)} />
            </div>

            <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-slate-950/65 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{spot.ownerName}</p>
                  <p className="text-xs text-slate-400">Pemilik spot</p>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-orange-300" />
                  <span>{spot.contact ?? 'Kontak via aplikasi'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-orange-300" />
                  <span>Booking fleksibel harian</span>
                </div>
              </div>
            </div>
          </div>

          <form
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6"
            onSubmit={(event) => {
              event.preventDefault();
              handleBook();
            }}
          >
            <SectionHeading eyebrow="Booking" title="Pesan spot ini" description="Isi detail singkat untuk menghitung total harga." />

            <div className="mt-6 space-y-4">
              <InputField label="Nama kamu">
                <FieldShell>
                  <input className="w-full bg-transparent outline-none placeholder:text-slate-500" value={renterName} onChange={(event) => setRenterName(event.target.value)} placeholder="Contoh: Andi" />
                </FieldShell>
              </InputField>

              <InputField label="Tanggal parkir">
                <FieldShell>
                  <input type="date" className="w-full bg-transparent outline-none" value={date} onChange={(event) => setDate(event.target.value)} />
                </FieldShell>
              </InputField>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Jam mulai">
                  <FieldShell>
                    <input type="time" className="w-full bg-transparent outline-none" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
                  </FieldShell>
                </InputField>

                <InputField label="Durasi (jam)">
                  <FieldShell>
                    <input type="number" min={1} max={24} className="w-full bg-transparent outline-none" value={durationHours} onChange={(event) => setDurationHours(Number(event.target.value))} />
                  </FieldShell>
                </InputField>
              </div>

              <InputField label="Kontak aktif">
                <FieldShell>
                  <input className="w-full bg-transparent outline-none placeholder:text-slate-500" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="08xx-xxxx-xxxx" />
                </FieldShell>
              </InputField>

              <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-orange-200/70">Total harga</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatRupiah(totalPrice)}</p>
                <p className="mt-1 text-sm text-orange-100/80">{durationHours} jam × {formatRupiah(spot.pricePerHour)}</p>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-orange-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                Book
              </button>
              {submitted ? (
                <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  Booking tersimpan di daftar kamu. Cek halaman Booking Saya untuk melihat status terbaru.
                </p>
              ) : null}
            </div>
          </form>
        </aside>
      </section>
    </div>
  );
}
