'use client';

import Link from 'next/link';
import { BellRing, ChevronRight, Clock3, Users, ArrowRight } from 'lucide-react';
import { useQueueStore } from '@/lib/store';

export default function DashboardPage() {
  const queues = useQueueStore((state) => state.queues);
  const activeQueues = queues.filter((queue) => queue.isActive);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="departure-board p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="status-row">
              <span className="status-dot" />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">
                Queue System Active
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Kelola antrean dengan{" "}
              <span style={{ color: "#F59E0B" }}>presisi</span>
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-[#94A3B8]">
              Nomor besar, jelas, real-time. Seperti papan keberangkatan bandara — setiap nomor pasti.
            </p>
          </div>
          <div className="flex items-center gap-6 rounded-xl bg-[#1C2D42]/50 px-6 py-4 ring-1 ring-[#F59E0B]/10">
            <div className="text-center">
              <div className="text-xs text-[#64748B] uppercase tracking-[0.15em]">Active</div>
              <div
                className="mt-1 text-5xl font-black text-[#F59E0B]"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {activeQueues.length}
              </div>
            </div>
            <div className="h-10 w-px bg-[#1E3A5F]/50" />
            <Link
              href="/create"
              className="terminal-pill active"
            >
              Buat Antrian <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Queue list — departure board style */}
      {activeQueues.length === 0 ? (
        <div className="departure-board flex flex-col items-center gap-4 p-12 text-center">
          <BellRing size={40} className="text-[#64748B]" />
          <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Belum ada antrian aktif
          </h2>
          <p className="text-sm text-[#94A3B8]">Buat antrian baru untuk mulai.</p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-bold text-[#0F1729] transition-all hover:bg-amber-400"
          >
            Buat Antrian <ChevronRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {activeQueues.map((queue) => {
            const waiting = Math.max(0, queue.lastNumber - queue.currentNumber);
            const eta = waiting * queue.estimatedWait;

            return (
              <article key={queue.id} className="departure-board p-5 sm:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left — queue info */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-[#F1F5F9]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                          {queue.name}
                        </h2>
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.12em]">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B]">{queue.location}</p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="info-card">
                        <div className="text-[10px] text-[#64748B] uppercase tracking-[0.15em] mb-1">
                          Now Serving
                        </div>
                        <div
                          className="text-3xl font-black text-[#F59E0B]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {String(queue.currentNumber).padStart(3, '0')}
                        </div>
                      </div>
                      <div className="info-card">
                        <div className="text-[10px] text-[#64748B] uppercase tracking-[0.15em] mb-1">
                          Last Number
                        </div>
                        <div
                          className="text-3xl font-black text-[#F1F5F9]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {String(queue.lastNumber).padStart(3, '0')}
                        </div>
                      </div>
                      <div className="info-card">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] uppercase tracking-[0.15em] mb-1">
                          <Clock3 size={10} /> Est. Wait
                        </div>
                        <div
                          className="text-2xl font-black text-[#F1F5F9]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {eta}m
                        </div>
                      </div>
                      <div className="info-card">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#64748B] uppercase tracking-[0.15em] mb-1">
                          <Users size={10} /> Remaining
                        </div>
                        <div
                          className="text-2xl font-black text-[#F1F5F9]"
                          style={{ fontFamily: "var(--font-jetbrains)" }}
                        >
                          {waiting}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right — action */}
                  <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                    <Link
                      href={`/queue/${queue.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-bold text-[#0F1729] transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
                    >
                      Ambil Nomor <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
