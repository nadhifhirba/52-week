import { ArrowRight, Palette, Sofa, BedDouble, CookingPot, Laptop } from 'lucide-react';
import Link from 'next/link';

const inspirations = [
  {
    title: 'Kamar 3x3 Japandi',
    summary: 'Tatami bed, folding desk, dan vertical storage untuk memaksimalkan kamar kos yang kecil.',
    palette: ['#1B1330', '#A78BFA', '#F5F3FF'],
    suggestions: ['Tatami bed rendah', 'Meja lipat dinding', 'Lemari tinggi sempit'],
    icon: BedDouble,
    layout: ['bed', 'desk', 'storage'],
    gradient: 'linear-gradient(135deg, #181425 0%, #4c1d95 52%, #8b5cf6 100%)',
  },
  {
    title: 'Ruang Tamu Mini Industrial',
    summary: 'Exposed bulb, metal rack, dan leather pouf untuk ruang tamu kecil yang edgy tapi tetap fungsional.',
    palette: ['#111111', '#f59e0b', '#e5e7eb'],
    suggestions: ['Lampu bohlam exposed', 'Rak besi hitam', 'Pouf kulit sintetis'],
    icon: Sofa,
    layout: ['lamp', 'sofa', 'rack'],
    gradient: 'linear-gradient(135deg, #111111 0%, #3f3f46 45%, #f59e0b 100%)',
  },
  {
    title: 'Dapur Kos Skandinavia',
    summary: 'White tiles, wooden shelves, dan spice rack yang rapi supaya dapur kos terasa bersih dan lega.',
    palette: ['#0f172a', '#60a5fa', '#dbeafe'],
    suggestions: ['Rak kayu pinus', 'Toples bumbu kaca', 'Stiker white tile'],
    icon: CookingPot,
    layout: ['shelf', 'sink', 'rack'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 48%, #a7f3d0 100%)',
  },
  {
    title: 'Area Kerja Produktif 2x2',
    summary: 'Wall-mounted desk, pegboard, dan monitor arm untuk setup kerja yang clean serta hemat ruang.',
    palette: ['#0f172a', '#8b5cf6', '#c084fc'],
    suggestions: ['Meja tempel dinding', 'Pegboard organizer', 'Monitor arm adjustable'],
    icon: Laptop,
    layout: ['desk', 'board', 'monitor'],
    gradient: 'linear-gradient(135deg, #111827 0%, #7c3aed 50%, #22d3ee 100%)',
  },
  {
    title: 'Kamar Tidur Cozy Pastel',
    summary: 'Kombinasi linen ringan, rak gantung, dan lampu ambient untuk kamar yang lembut dan tenang.',
    palette: ['#2a183f', '#f9a8d4', '#fef3c7'],
    suggestions: ['Seprai linen', 'Lampu string warm', 'Rak gantung ringan'],
    icon: BedDouble,
    layout: ['bed', 'light', 'shelf'],
    gradient: 'linear-gradient(135deg, #281434 0%, #db2777 48%, #fde68a 100%)',
  },
  {
    title: 'Sudut Baca Minimalis',
    summary: 'Satu kursi nyaman, rak buku tipis, dan lighting terarah untuk pojok baca yang tenang.',
    palette: ['#111827', '#c4b5fd', '#f5f3ff'],
    suggestions: ['Kursi tunggal', 'Rak buku slim', 'Lampu baca arah'],
    icon: Sofa,
    layout: ['chair', 'book', 'lamp'],
    gradient: 'linear-gradient(135deg, #111827 0%, #312e81 45%, #c4b5fd 100%)',
  },
  {
    title: 'Kamar Mandi Compact Clean',
    summary: 'Storage gantung, cermin besar, dan aksen zinc agar kamar mandi kecil tetap terasa lega.',
    palette: ['#0f172a', '#94a3b8', '#e879f9'],
    suggestions: ['Cermin LED bulat', 'Rak anti karat', 'Keranjang slim'],
    icon: CookingPot,
    layout: ['mirror', 'shower', 'storage'],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #334155 45%, #e879f9 100%)',
  },
  {
    title: 'Studio Corner Modern',
    summary: 'Panel garis tegas, storage tertutup, dan lampu linear untuk tampilan modern yang rapi.',
    palette: ['#09090b', '#8b5cf6', '#22d3ee'],
    suggestions: ['Kabinet tertutup', 'Lampu linear', 'Meja utilitas compact'],
    icon: Laptop,
    layout: ['cabinet', 'desk', 'light'],
    gradient: 'linear-gradient(135deg, #09090b 0%, #581c87 45%, #22d3ee 100%)',
  },
] as const;

export default function InspirasiPage() {
  return (
    <main className="shell" style={{ padding: '42px 0 32px' }}>
      <section className="section-head" style={{ marginBottom: 18 }}>
        <div>
          <h1 className="h1" style={{ fontSize: 'clamp(32px, 4.2vw, 52px)', marginBottom: 8 }}>Inspirasi untuk ruang kecil</h1>
          <p>Delapan referensi pre-generated dengan palette warna, ide layout, dan daftar furniture yang relevan.</p>
        </div>
        <Link href="/" className="pill">
          Ke generator
          <ArrowRight size={14} />
        </Link>
      </section>

      <div className="grid-2">
        {inspirations.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="card">
              <div className="thumb" style={{ position: 'relative', background: item.gradient }}>
                <div style={{ position: 'absolute', inset: 0, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="button-row" style={{ justifyContent: 'space-between' }}>
                    <span className="badge">
                      <Palette size={14} />
                      Palette inspirasi
                    </span>
                    <span className="tag">{item.title.split(' ')[0]}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, alignItems: 'end' }}>
                    {item.layout.map((layer, index) => (
                      <div
                        key={layer}
                        className="room-layer"
                        style={{
                          position: 'relative',
                          inset: 'auto',
                          height: 74 + index * 12,
                          background: 'rgba(255,255,255,0.12)',
                          borderColor: 'rgba(255,255,255,0.16)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="row" style={{ marginBottom: 10 }}>
                  <span className="tag"><Icon size={14} /> {item.title}</span>
                  <span className="muted" style={{ fontSize: 13 }}>Pre-generated</span>
                </div>
                <p className="card-copy">{item.summary}</p>

                <div style={{ marginTop: 16 }}>
                  <div className="muted" style={{ fontSize: 13, marginBottom: 8 }}>Palette warna</div>
                  <div className="pills">
                    {item.palette.map((color) => (
                      <span key={color} className="pill" style={{ gap: 8 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 999, background: color, border: '1px solid rgba(255,255,255,0.2)' }} />
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div className="muted" style={{ fontSize: 13, marginBottom: 8 }}>Furniture suggestions</div>
                  <div className="pills">
                    {item.suggestions.map((suggestion) => (
                      <span key={suggestion} className="pill">{suggestion}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
