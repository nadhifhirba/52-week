'use client';

import { useState } from 'react';
import { CheckCircle2, PlusCircle } from 'lucide-react';
import { FieldShell, InputField, SectionHeading } from '@/components/parking-ui';
import { formatRupiah, useParkingStore } from '@/lib/store';

export default function ListSpotPage() {
  const addSpot = useParkingStore((state) => state.addSpot);
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const [pricePerHour, setPricePerHour] = useState(15000);
  const [availableHours, setAvailableHours] = useState('07:00 - 21:00');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitSpot = () => {
    addSpot({
      ownerName: ownerName || 'Pemilik Baru',
      address,
      lat: -6.2,
      lng: 106.82,
      pricePerHour,
      availableHours,
      description,
      contact,
      city: address.split(',')[0] || 'Jakarta',
      photo: photo || undefined,
    });
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <SectionHeading
          eyebrow="List your spot"
          title="Pasang tempat parkir kamu"
          description="Isi detail dasar lalu spot kamu langsung masuk ke daftar jaringan PARKIR_SHARING."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <InputField label="Nama pemilik">
            <FieldShell>
              <input className="w-full bg-transparent outline-none placeholder:text-slate-500" value={ownerName} onChange={(event) => setOwnerName(event.target.value)} placeholder="Nama lengkap" />
            </FieldShell>
          </InputField>

          <InputField label="Kontak">
            <FieldShell>
              <input className="w-full bg-transparent outline-none placeholder:text-slate-500" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="08xx-xxxx-xxxx" />
            </FieldShell>
          </InputField>

          <InputField label="Alamat lengkap" hint="Sertakan kelurahan / area agar mudah ditemukan.">
            <FieldShell>
              <textarea className="h-24 w-full resize-none bg-transparent outline-none placeholder:text-slate-500" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Jl. ..." />
            </FieldShell>
          </InputField>

          <InputField label="Harga per jam">
            <FieldShell>
              <input type="number" min={5000} step={1000} className="w-full bg-transparent outline-none" value={pricePerHour} onChange={(event) => setPricePerHour(Number(event.target.value))} />
            </FieldShell>
          </InputField>

          <InputField label="Jam tersedia">
            <FieldShell>
              <input className="w-full bg-transparent outline-none" value={availableHours} onChange={(event) => setAvailableHours(event.target.value)} placeholder="06:00 - 22:00" />
            </FieldShell>
          </InputField>

          <InputField label="Foto spot" hint="Opsional: URL foto eksternal. Bila kosong, sistem pakai gambar default.">
            <FieldShell>
              <input className="w-full bg-transparent outline-none placeholder:text-slate-500" value={photo} onChange={(event) => setPhoto(event.target.value)} placeholder="https://..." />
            </FieldShell>
          </InputField>

          <InputField label="Deskripsi" hint="Jelaskan akses, keamanan, atau ukuran area.">
            <FieldShell>
              <textarea className="h-28 w-full resize-none bg-transparent outline-none placeholder:text-slate-500" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Contoh: area teduh, aman, dekat ruko..." />
            </FieldShell>
          </InputField>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/65 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Preview harga</p>
          <p className="mt-2 text-3xl font-semibold text-orange-300">{formatRupiah(pricePerHour)}</p>
          <p className="mt-1 text-sm text-slate-400">per jam</p>
        </div>

        <button
          type="button"
          onClick={submitSpot}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-orange-400"
        >
          <PlusCircle className="h-4 w-4" />
          Pasang spot sekarang
        </button>

        {submitted ? (
          <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            Spot berhasil ditambahkan ke daftar.
          </div>
        ) : null}
      </section>
    </div>
  );
}
