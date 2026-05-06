"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  Briefcase,
  FilePenLine,
  FileSignature,
  FileText,
  Mail,
  NotebookPen,
  ScrollText,
  Shield,
  Search,
} from "lucide-react";
import { templates } from "@/lib/templates";

const icons: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Shield,
  FileText,
  Briefcase,
  FilePenLine,
  NotebookPen,
  FileSignature,
  Mail,
  ScrollText,
};

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return templates;
    return templates.filter((template) => {
      const fieldText = template.fields.map((field) => field.label).join(" ").toLowerCase();
      return [template.title, template.description, template.id, fieldText].join(" ").toLowerCase().includes(needle);
    });
  }, [query]);

  return (
    <main className="page">
      <section className="hero">
        <div className="pill">Neo-Industrial / Formal Letter Templates</div>
        <h1 className="hero-title">Buat surat resmi Indonesia lebih cepat, rapi, dan siap simpan.</h1>
        <p className="hero-copy">
          Pilih template, isi data, lihat pratinjau surat formal secara real-time, lalu simpan atau ekspor kapan saja.
        </p>
        <div className="search-row">
          <div style={{ position: "relative", flex: 1, minWidth: 260 }}>
            <Search size={18} strokeWidth={2.2} style={{ position: "absolute", left: 14, top: 15, color: "#a1a1aa" }} />
            <input
              className="search-input"
              style={{ paddingLeft: 44 }}
              placeholder="Cari template: kuasa, pernyataan, kerja, izin..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="pill">{filtered.length} template ditemukan</div>
        </div>
      </section>

      <section id="templates" className="template-grid">
        {filtered.map((template) => {
          const Icon = icons[template.icon] ?? FileText;
          return (
            <article key={template.id} className="template-card">
              <div className="template-icon">
                <Icon size={22} strokeWidth={2.2} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h2 className="template-title">{template.title}</h2>
                <p className="template-desc">{template.description}</p>
              </div>
              <div className="template-meta">
                <span className="pill">{template.fields.length} bidang</span>
                <span className="pill">{template.id}</span>
              </div>
              <Link className="button" href={`/builder/${template.id}`}>
                Pakai Template
              </Link>
            </article>
          );
        })}
      </section>

      {filtered.length === 0 ? <div className="empty-state">Tidak ada template yang cocok dengan kata kunci tersebut.</div> : null}
    </main>
  );
}
