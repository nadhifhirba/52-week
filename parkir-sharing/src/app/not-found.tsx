import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-orange-300/80">404</p>
      <h1 className="text-3xl font-semibold text-white">Spot parkir tidak ditemukan</h1>
      <p className="max-w-md text-slate-300">Coba kembali ke halaman utama untuk mencari spot parkir lain di Jakarta.</p>
      <Link href="/" className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
        Kembali ke beranda
      </Link>
    </div>
  );
}
