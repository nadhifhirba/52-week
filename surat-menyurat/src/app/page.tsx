"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  Briefcase, FilePenLine, FileSignature, FileText,
  Mail, NotebookPen, ScrollText, Shield, Search, Sparkles,
} from "lucide-react";
import { templates } from "@/lib/templates";

const icons: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Shield, FileText, Briefcase, FilePenLine, NotebookPen, FileSignature, Mail, ScrollText,
};

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return templates;
    return templates.filter((t) => {
      const fieldText = t.fields.map((f) => f.label).join(" ").toLowerCase();
      return [t.title, t.description, t.id, fieldText].join(" ").toLowerCase().includes(needle);
    });
  }, [query]);

  return (
    <div className="space-y-12">
      {/* ── Hero ── */}
      <section className="text-center space-y-4">
        <span className="heritage-pill">
          <Sparkles size={12} /> Template Surat Resmi Indonesia
        </span>
        <h1
          className="text-3xl font-bold leading-tight tracking-tight text-[#3C2415] sm:text-4xl"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          Surat resmi yang{" "}
          <span style={{ fontStyle: "italic", color: "#8B1A1A" }}>berwibawa</span>
          , dibuat dalam hitungan menit
        </h1>
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#6B5540]">
          Pilih template, isi data, lihat pratinjau, lalu simpan atau ekspor. Dari surat kuasa
          hingga perjanjian kerja — semua tersedia dengan format sesuai standar Indonesia.
        </p>

        {/* Search */}
        <div className="mx-auto flex max-w-md items-center gap-2 pt-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A09080]" />
            <input
              className="w-full rounded-full border border-[#D4C4A8] bg-[#F4E4C1]/50 py-2.5 pl-10 pr-4 text-sm text-[#3C2415] placeholder:text-[#A09080] focus:border-[#8B1A1A] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/10"
              placeholder="Cari: kuasa, pernyataan, kerja, izin..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="heritage-pill shrink-0">{filtered.length} template</span>
        </div>
      </section>

      {/* ── Gold Divider ── */}
      <div className="gold-divider" />

      {/* ── Template Grid ── */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template) => {
          const Icon = icons[template.icon] ?? FileText;
          return (
            <article key={template.id} className="doc-card group flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="template-icon-circle">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <span className="heritage-pill text-[10px]">{template.fields.length} bidang</span>
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-base font-bold text-[#3C2415]" style={{ fontFamily: "var(--font-lora)" }}>
                  {template.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#6B5540]">{template.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#D4A853]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#8B1A1A] uppercase">
                  {template.id}
                </span>
                <Link
                  href={`/builder/${template.id}`}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#8B1A1A] px-4 py-2 text-xs font-bold text-[#F4E4C1] transition-all hover:bg-[#6B1515] hover:shadow-md"
                >
                  Pakai Template
                  <ScrollText size={12} />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <ScrollText size={40} className="mx-auto mb-4 text-[#D4C4A8]" />
          <p className="text-[#A09080]">Tidak ada template yang cocok.</p>
        </div>
      )}
    </div>
  );
}
