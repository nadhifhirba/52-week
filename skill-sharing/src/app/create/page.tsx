'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, Clock3, MapPin, PlusCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSkillStore } from '@/lib/store';

const categories = ['Desain', 'Fotografi', 'Kuliner', 'Seni', 'Komunikasi', 'Anak', 'Kopi', 'Keuangan'];

export default function CreateWorkshopPage() {
  const router = useRouter();
  const createWorkshop = useSkillStore((state) => state.createWorkshop);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    title: '',
    mentor: '',
    category: 'Desain',
    description: '',
    price: '',
    duration: '',
    maxParticipants: '',
    date: '',
    time: '',
    location: '',
    image: '',
    tags: '',
  });

  const parsedTags = useMemo(
    () =>
      form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags],
  );

  const handleChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');

    if (!parsedTags.length) {
      setStatus('Tambahkan minimal 1 tag untuk membantu peserta menemukan workshop kamu.');
      return;
    }

    const id = createWorkshop({
      title: form.title,
      mentor: form.mentor,
      category: form.category,
      description: form.description,
      price: Number(form.price),
      duration: Number(form.duration),
      maxParticipants: Number(form.maxParticipants),
      date: form.date,
      time: form.time,
      location: form.location,
      image:
        form.image ||
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
      tags: parsedTags,
    });

    setStatus('Workshop berhasil dibuat. Mengarahkan ke halaman detail...');
    router.push(`/workshop/${id}`);
  };

  return (
    <section className="form-card">
      <div className="hero" style={{ marginBottom: 16 }}>
        <div className="badge">Jadi mentor</div>
        <h2>Buka workshop baru untuk komunitas kamu.</h2>
        <p>
          Isi form di bawah untuk membuat kelas baru yang langsung muncul di marketplace Skill Sharing.
        </p>
        <div className="meta-row">
          <span className="card-meta">
            <PlusCircle size={14} />
            Listing cepat
          </span>
          <span className="card-meta">
            <Sparkles size={14} />
            Mobile friendly
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <label className="form-field full-width">
          <span>Judul workshop</span>
          <input
            className="input"
            value={form.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Contoh: Membuat Konten Reels yang Menjual"
            required
          />
        </label>

        <label className="form-field">
          <span>Nama mentor</span>
          <input
            className="input"
            value={form.mentor}
            onChange={(event) => handleChange('mentor', event.target.value)}
            placeholder="Nama kamu"
            required
          />
        </label>

        <label className="form-field">
          <span>Kategori</span>
          <select
            className="select"
            value={form.category}
            onChange={(event) => handleChange('category', event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field full-width">
          <span>Deskripsi</span>
          <textarea
            className="textarea"
            value={form.description}
            onChange={(event) => handleChange('description', event.target.value)}
            placeholder="Jelaskan apa yang peserta akan pelajari."
            rows={4}
            required
          />
        </label>

        <label className="form-field">
          <span>Harga (Rp)</span>
          <input
            className="input"
            type="number"
            min="0"
            value={form.price}
            onChange={(event) => handleChange('price', event.target.value)}
            placeholder="250000"
            required
          />
        </label>

        <label className="form-field">
          <span>Durasi (menit)</span>
          <input
            className="input"
            type="number"
            min="30"
            value={form.duration}
            onChange={(event) => handleChange('duration', event.target.value)}
            placeholder="120"
            required
          />
        </label>

        <label className="form-field">
          <span>Maks peserta</span>
          <input
            className="input"
            type="number"
            min="1"
            value={form.maxParticipants}
            onChange={(event) => handleChange('maxParticipants', event.target.value)}
            placeholder="20"
            required
          />
        </label>

        <label className="form-field">
          <span>Tanggal</span>
          <input
            className="input"
            type="date"
            value={form.date}
            onChange={(event) => handleChange('date', event.target.value)}
            required
          />
        </label>

        <label className="form-field">
          <span>Jam</span>
          <input
            className="input"
            type="time"
            value={form.time}
            onChange={(event) => handleChange('time', event.target.value)}
            required
          />
        </label>

        <label className="form-field full-width">
          <span>Lokasi</span>
          <input
            className="input"
            value={form.location}
            onChange={(event) => handleChange('location', event.target.value)}
            placeholder="Online, Jakarta, Bandung, dll"
            required
          />
        </label>

        <label className="form-field full-width">
          <span>Image URL</span>
          <input
            className="input"
            value={form.image}
            onChange={(event) => handleChange('image', event.target.value)}
            placeholder="https://..."
          />
        </label>

        <label className="form-field full-width">
          <span>Tags</span>
          <input
            className="input"
            value={form.tags}
            onChange={(event) => handleChange('tags', event.target.value)}
            placeholder="Figma, Design Thinking, UI"
            required
          />
          <small className="helper-text">Pisahkan tag dengan koma. Saat ini: {parsedTags.join(', ') || '-'}</small>
        </label>

        <div className="form-actions full-width">
          <button type="submit" className="button">
            Publish workshop <ArrowRight size={16} />
          </button>
          <div className="card-meta">
            <Clock3 size={14} />
            Data disimpan di browser kamu
          </div>
        </div>
      </form>

      {status ? <p className="success" style={{ marginTop: 14 }}>{status}</p> : null}
    </section>
  );
}
