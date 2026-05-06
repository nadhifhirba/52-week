import { Suspense } from 'react';
import GenerateClient from './generate-client';

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <main className="shell" style={{ padding: '40px 0 32px' }}>
          <div className="panel" style={{ padding: 24 }}>
            <span className="kicker">Memuat generator</span>
            <h1 className="h1" style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}>Menyiapkan pengalaman rendering KOST.AI...</h1>
            <p className="lead">Sedang menyiapkan mockup interaktif untuk ruang kecil kamu.</p>
          </div>
        </main>
      }
    >
      <GenerateClient />
    </Suspense>
  );
}
