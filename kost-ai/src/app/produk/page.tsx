import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const products = [
  {
    name: 'Meja lipat dinding compact',
    price: 'Rp 785.000',
    note: 'Cocok untuk kamar kos dan area kerja 2x2.',
    query: 'meja lipat dinding minimalis',
  },
  {
    name: 'Rak besi hitam serbaguna',
    price: 'Rp 980.000',
    note: 'Storage vertikal untuk ruangan kecil.',
    query: 'rak besi hitam minimalis',
  },
  {
    name: 'Lampu ambient hangat',
    price: 'Rp 275.000',
    note: 'Bikin ruang kecil terasa lebih tenang.',
    query: 'lampu ambient hangat kamar',
  },
  {
    name: 'Cermin LED bulat',
    price: 'Rp 575.000',
    note: 'Memberi ilusi ruang lebih lega.',
    query: 'cermin led bulat kamar mandi',
  },
  {
    name: 'Keranjang laundry slim',
    price: 'Rp 180.000',
    note: 'Masuk ke ruang sempit tanpa mengganggu jalur jalan.',
    query: 'keranjang laundry slim',
  },
  {
    name: 'Pegboard organizer',
    price: 'Rp 265.000',
    note: 'Rapi untuk kabel, alat tulis, dan aksesori kecil.',
    query: 'pegboard organizer meja kerja',
  },
] as const;

const tokopedia = (query: string) => `https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(query)}`;
const shopee = (query: string) => `https://shopee.co.id/search?keyword=${encodeURIComponent(query)}`;

export default function ProdukPage() {
  return (
    <main className="shell" style={{ padding: '42px 0 32px' }}>
      <section className="section-head" style={{ marginBottom: 18 }}>
        <div>
          <h1 className="h1" style={{ fontSize: 'clamp(32px, 4.2vw, 52px)', marginBottom: 8 }}>Produk rekomendasi</h1>
          <p>Kurasi produk hemat tempat untuk dipakai bersama desain KOST.AI.</p>
        </div>
        <Link href="/" className="pill">
          Buat desain baru
          <ArrowRight size={14} />
        </Link>
      </section>

      <div className="grid-3">
        {products.map((product, index) => (
          <article className="card" key={product.name}>
            <div className="thumb" style={{ background: `linear-gradient(135deg, rgba(139,92,246,.18), rgba(15,23,42,.96)), radial-gradient(circle at ${20 + index * 10}% 20%, rgba(192,132,252,.35), transparent 30%)` }}>
              <div style={{ height: '100%', display: 'flex', alignItems: 'end', padding: 18 }}>
                <span className="badge">
                  <ShoppingBag size={14} />
                  Marketplace ready
                </span>
              </div>
            </div>
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-copy">{product.note}</p>
              <div style={{ marginTop: 12, color: '#f5d0fe', fontWeight: 800 }}>{product.price}</div>
              <div className="button-row" style={{ marginTop: 16 }}>
                <a className="button" href={tokopedia(product.query)} target="_blank" rel="noreferrer">
                  Tokopedia
                </a>
                <a className="button button-ghost" href={shopee(product.query)} target="_blank" rel="noreferrer">
                  Shopee
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
