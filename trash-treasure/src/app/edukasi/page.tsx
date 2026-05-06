import { BookOpen, Lightbulb, Scale, Sparkles, Trash2, Trees } from 'lucide-react';

const articles = [
  {
    icon: <Trash2 size={20} />,
    title: 'Panduan memilah sampah rumah tangga',
    text: 'Pisahkan plastik, kertas, logam, kaca, dan elektronik sejak dari dapur atau ruang kerja agar tidak tercampur saat dikirim ke bank sampah.',
  },
  {
    icon: <Lightbulb size={20} />,
    title: 'Tips daur ulang yang efektif',
    text: 'Bilas wadah bekas makanan, lipat kardus agar hemat ruang, dan simpan elektronik rusak secara terpisah supaya mudah diproses.',
  },
  {
    icon: <Trees size={20} />,
    title: 'Fakta dampak lingkungan',
    text: 'Semakin banyak material dipilah, semakin kecil volume sampah ke TPA dan semakin besar peluang material kembali masuk ke rantai produksi.',
  },
];

const sortingGuide = [
  'Plastik: botol, kemasan, dan wadah yang sudah dibersihkan.',
  'Kertas: koran, kardus, buku, dan dokumen tanpa staples berlebih.',
  'Logam: kaleng minuman, aluminium, dan potongan besi kecil.',
  'Kaca: botol dan gelas kaca yang tidak pecah berserakan.',
  'Elektronik: kabel, charger, perangkat lama, dan komponen kecil.',
];

const impactFacts = [
  '1 kg plastik atau kertas terpilah mengurangi beban sortir manual.',
  'Elektronik memiliki nilai poin lebih tinggi karena materialnya kompleks.',
  'Pemilahan yang konsisten membantu bank sampah mempercepat proses jual kembali material.',
];

export default function EdukasiPage() {
  return (
    <div>
      <section className="card pad">
        <div className="pill">
          <BookOpen size={16} />
          Belajar mengelola sampah dengan cara yang sederhana dan berdampak
        </div>
        <h1 className="page-title" style={{ marginTop: 18, fontSize: '2.7rem' }}>
          Edukasi pengelolaan sampah
        </h1>
        <p className="page-subtitle">
          Materi singkat untuk membantu keluarga, komunitas, dan sekolah memahami cara memilah sampah dengan benar.
        </p>
      </section>

      <section className="section article-grid">
        {articles.map((article) => (
          <article key={article.title} className="article-card">
            <div className="brand-mark" style={{ width: 48, height: 48, marginBottom: 14 }}>
              {article.icon}
            </div>
            <h3>{article.title}</h3>
            <p>{article.text}</p>
          </article>
        ))}
      </section>

      <section className="section grid-2">
        <div className="card pad">
          <div className="section-head">
            <h2>Panduan pemilahan cepat</h2>
            <span className="muted">Praktis untuk pemula</span>
          </div>
          <div className="list">
            {sortingGuide.map((guide) => (
              <div key={guide} className="list-item">
                <div>{guide}</div>
                <Scale size={16} color="#10b981" />
              </div>
            ))}
          </div>
        </div>

        <div className="card pad">
          <div className="section-head">
            <h2>Tips daur ulang</h2>
            <span className="muted">Agar material lebih bernilai</span>
          </div>
          <div className="list">
            <div className="list-item">
              <div>
                <strong>Bersihkan sisa makanan</strong>
                <span className="muted">Kemasan yang bersih lebih mudah diterima pengepul.</span>
              </div>
              <Sparkles size={16} color="#10b981" />
            </div>
            <div className="list-item">
              <div>
                <strong>Kelompokkan berdasarkan jenis</strong>
                <span className="muted">Mencegah kontaminasi antar material.</span>
              </div>
              <Sparkles size={16} color="#10b981" />
            </div>
            <div className="list-item">
              <div>
                <strong>Simpan di wadah terpisah</strong>
                <span className="muted">Mempermudah saat jadwal setor atau jemput tiba.</span>
              </div>
              <Sparkles size={16} color="#10b981" />
            </div>
          </div>
        </div>
      </section>

      <section className="section card pad">
        <div className="section-head">
          <h2>Fakta impact</h2>
          <span className="muted">Perubahan kecil, hasil besar</span>
        </div>
        <div className="grid-3">
          {impactFacts.map((fact) => (
            <div key={fact} className="stat-card">
              <div className="stat-label">Impact fact</div>
              <div className="stat-note" style={{ color: '#d1fae5', fontSize: '1rem', lineHeight: 1.6 }}>
                {fact}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
