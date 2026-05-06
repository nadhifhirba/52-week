'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { CalendarDays, Truck, MapPinned } from 'lucide-react';
import { type WasteType, useTrashTreasureStore } from '@/lib/store';
import { formatDateTime, wasteLabels } from '@/lib/utils';

const wasteTypes: WasteType[] = ['plastik', 'kertas', 'logam', 'kaca', 'elektronik'];

export default function JemputPage() {
  const pickups = useTrashTreasureStore((state) => state.pickups);
  const addPickup = useTrashTreasureStore((state) => state.addPickup);

  const [address, setAddress] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [selected, setSelected] = useState<WasteType[]>(['plastik', 'kertas']);

  const nextPickups = pickups.slice(0, 5);
  const itemPreview = useMemo(() => selected.map((item) => wasteLabels[item]).join(', '), [selected]);

  const toggleWasteType = (type: WasteType) => {
    setSelected((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!address || !dateTime || selected.length === 0) return;

    addPickup({
      address,
      date: new Date(dateTime).toISOString(),
      items: selected,
      notes,
    });

    setAddress('');
    setDateTime('');
    setNotes('');
    setSelected(['plastik', 'kertas']);
  };

  return (
    <div className="grid-2">
      <section className="card pad">
        <div className="pill">
          <Truck size={16} />
          Jadwalkan jemput sampah ke rumah atau kantor
        </div>
        <h1 className="page-title" style={{ marginTop: 18, fontSize: '2.5rem' }}>
          Form jadwal jemput
        </h1>
        <p className="page-subtitle">
          Isi alamat, pilih waktu penjemputan, dan tentukan jenis sampah yang siap diambil.
        </p>

        <form className="form" onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div className="field">
            <label htmlFor="address">Alamat lengkap</label>
            <textarea
              id="address"
              className="textarea"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Jl. Contoh No. 10, RT 03/RW 05, Kota Bandung"
            />
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="dateTime">Tanggal & waktu</label>
              <input
                id="dateTime"
                className="input"
                type="datetime-local"
                value={dateTime}
                onChange={(event) => setDateTime(event.target.value)}
              />
            </div>
            <div className="field">
              <label>Jenis sampah</label>
              <div className="tag-row">
                {wasteTypes.map((type) => {
                  const active = selected.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      className={`badge ${active ? 'success' : 'neutral'}`}
                      onClick={() => toggleWasteType(type)}
                    >
                      {wasteLabels[type]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="notes">Catatan tambahan</label>
            <textarea
              id="notes"
              className="textarea"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Misalnya: ada kardus besar, akses parkir di depan rumah, dll."
            />
          </div>

          <div className="helper-box">
            <strong style={{ display: 'block', marginBottom: 8 }}>
              <MapPinned size={16} style={{ verticalAlign: 'text-bottom', marginRight: 6 }} />
              Ringkasan permintaan
            </strong>
            <div className="muted">Alamat: {address || '-'}</div>
            <div className="muted">Waktu: {dateTime ? formatDateTime(new Date(dateTime).toISOString()) : '-'}</div>
            <div className="muted">Jenis: {itemPreview || '-'}</div>
          </div>

          <button type="submit" className="button button-primary">
            Simpan jadwal jemput
          </button>
        </form>
      </section>

      <section className="card pad">
        <div className="section-head">
          <h2>Jadwal yang sudah dibuat</h2>
          <span className="muted">{nextPickups.length} entri</span>
        </div>

        <div className="list">
          {nextPickups.map((pickup) => (
            <div key={pickup.id} className="list-item" style={{ alignItems: 'start' }}>
              <div>
                <strong>{pickup.address}</strong>
                <span className="muted">
                  <CalendarDays size={14} style={{ verticalAlign: 'text-bottom', marginRight: 6 }} />
                  {formatDateTime(pickup.date)}
                </span>
                <div className="tag-row" style={{ marginTop: 10 }}>
                  {pickup.items.map((item) => (
                    <span key={item} className="badge success">
                      {wasteLabels[item]}
                    </span>
                  ))}
                </div>
                {pickup.notes ? <div className="muted" style={{ marginTop: 10 }}>{pickup.notes}</div> : null}
              </div>
              <div className="badge warning">{pickup.status}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
