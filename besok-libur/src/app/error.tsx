"use client";

import Link from "next/link";
import { RefreshCw, TriangleAlert } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="max-w-xl rounded-[2rem] border border-dashed border-zinc-700 bg-zinc-900/80 p-8 text-center shadow-[10px_10px_0_0_rgba(255,107,0,0.16)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00]">
          <TriangleAlert className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-3xl font-black text-zinc-50">Ada masalah saat memuat halaman</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{error.message || "Terjadi error tak terduga."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00] bg-[#FF6B00] px-5 py-3 text-sm font-black text-zinc-950 shadow-[4px_4px_0_0_rgba(255,107,0,0.14)]"
          >
            <RefreshCw className="h-4 w-4" />
            Coba lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-black text-zinc-50 transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
          >
            Kembali ke feed
          </Link>
        </div>
      </div>
    </div>
  );
}
