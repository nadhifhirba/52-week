'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { CheckCircle2, MapPinned, Scale } from 'lucide-react';
import { pointRates, type WasteType, useTrashTreasureStore } from '@/lib/store';
import { getEstimatedPoints, wasteEmoji, wasteLabels } from '@/lib/utils';

const wasteTypes: WasteType[] = ['plastik', 'kertas', 'logam', 'kaca', 'elektronik'];

export default function SetorPage() {
  const addDeposit = useTrashTreasureStore((state) => state.addDeposit);
  const [type, setType] = useState<WasteType>('plastik');
  const [weight, setWeight] = useState('1');
  const [confirmation, setConfirmation] = useState<{ points: number; weight: number; type: WasteType } | null>(null);

  const weightValue = Number(weight) || 0;
  const estimatedPoints = useMemo(() => getEstimatedPoints(type, weightValue), [type, weightValue]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (weightValue <= 0) {
      setConfirmation(null);
      return;
    }

    const deposit = addDeposit({ userId: 'user-001', type, weight_kg: weightValue, status: 'menunggu' });
    setConfirmation({ points: deposit.points, weight: deposit.weight_kg, type: deposit.type });
    setWeight('1');
  };

  return (
    <div className="grid-2">
      <section className="card pad">
        <div className="pill">
          <Scale size={16} />
          Setor sampah dan dapatkan poin secara instan
        </div>
        <h1 className="page-title" style={{ marginTop: 18, fontSize: '2.5rem' }}>
          Form setor sampah
        </h1>
        <p className="page-subtitle">
          Pilih jenis sampah, masukkan berat, lalu lihat estimasi poin yang akan Anda terima.
        </p>

        <form className="form" onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div className="field">
            <label>Jenis sampah</label>
            <div className="option-list">
              {wasteTypes.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`option-card ${type === item ? 'selected' : ''}`}
                  onClick={() => setType(item)}
                >
                  <span className="option-icon">{wasteEmoji[item]}</span>
                  <strong>{wasteLabels[item]}</strong>
                  <span className="muted">{pointRates[item]} poin/kg</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="weight">Berat sampah (kg)</label>
              <input
                id="weight"
                className="input"
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                placeholder="Contoh: 2.5"
              />
            </div>
            <div className="field">
              <label>Estimasi poin</label>
              <div className="helper-box" style={{ minHeight: 52, display: 'flex', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.3rem' }}>{estimatedPoints.toLocaleString('id-ID')} poin</strong>
              </div>
            </div>
          </div>

          <div className="helper-box">
            <strong style={{ display: 'block', marginBottom: 8 }}>
              <MapPinned size={16} style={{ verticalAlign: 'text-bottom', marginRight: 6 }} />
              Lokasi drop-off
            </strong>
            <div className="muted">
              TPS Bank Sampah TRASH_TREASURE, Jl. Hijau Lestari No. 21, Bandung
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              Jam operasional: Senin–Sabtu, 08.00–16.00 WIB
            </div>
          </div>

          <button type="submit" className="button button-primary">
            Submit setor
          </button>
        </form>
      </section>

      <section className="card pad">
        <div className="section-head">
          <h2>Konfirmasi & riwayat singkat</h2>
          <span className="muted">Poin otomatis masuk</span>
        </div>

        {confirmation ? (
          <div className="confirmation">
            <strong style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <CheckCircle2 size={18} />
              Setoran berhasil dicatat
            </strong>
            <div>
              {confirmation.weight.toFixed(1)} kg {wasteLabels[confirmation.type]} menghasilkan{' '}
              <strong>{confirmation.points.toLocaleString('id-ID')} poin</strong>.
            </div>
          </div>
        ) : (
          <div className="helper-box">
            Belum ada setoran baru. Lengkapi formulir di sebelah kiri untuk melihat konfirmasi.
          </div>
        )}

        <div className="section" style={{ marginTop: 22 }}>
          <div className="section-head">
            <h2>Cara menyiapkan sampah</h2>
          </div>
          <div className="list">
            <div className="list-item">
              <div>
                <strong>Pastikan bersih dan kering</strong>
                <span className="muted">Kurangi kontaminasi agar proses daur ulang lebih mudah.</span>
              </div>
            </div>
            <div className="list-item">
              <div>
                <strong>Pisahkan per jenis</strong>
                <span className="muted">Plastik, kertas, logam, kaca, dan elektronik jangan dicampur.</span>
              </div>
            </div>
            <div className="list-item">
              <div>
                <strong>Timbang sebelum datang</strong>
                <span className="muted">Estimasi poin akan lebih akurat dan proses lebih cepat.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
