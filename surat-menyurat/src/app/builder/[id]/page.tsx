"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, FileText, Save, TabletSmartphone, ArrowLeft, Eye } from "lucide-react";
import { buildLetterModel, formatDateLine, cleanText } from "@/lib/letter";
import { useDocumentStore } from "@/lib/store";
import { getTemplateById, isTemplateId } from "@/lib/templates";

const mobileTabStyle = (active: boolean) => ({
  background: active ? "rgba(255, 107, 0, 0.16)" : "rgba(255,255,255,0.04)",
  borderColor: active ? "rgba(255, 107, 0, 0.42)" : "rgba(255,255,255,0.08)",
  color: active ? "#fff" : "inherit",
});

const defaultValueForField = (key: string) => {
  const values: Record<string, string> = {
    nomor: "",
    tempat: "",
    tanggal: new Date().toISOString().slice(0, 10),
    tanggal_lahir: "",
    tanggal_masuk: "",
    tanggal_efektif: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
  };
  return values[key] ?? "";
};

export default function BuilderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const documents = useDocumentStore((state) => state.documents);
  const addDocument = useDocumentStore((state) => state.addDocument);
  const updateDocument = useDocumentStore((state) => state.updateDocument);
  const savedDocument = documents.find((document) => document.id === params.id) ?? null;
  const template = getTemplateById(savedDocument?.templateId ?? params.id) ?? (isTemplateId(params.id) ? getTemplateById(params.id) : null);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [isMobile, setIsMobile] = useState(false);

  const initialFields = useMemo(() => {
    const base: Record<string, string> = {};
    (template?.fields ?? []).forEach((field) => {
      base[field.key] = savedDocument?.fields[field.key] ?? defaultValueForField(field.key);
    });
    return base;
  }, [savedDocument, template]);

  const [fields, setFields] = useState<Record<string, string>>(initialFields);
  const [savedId, setSavedId] = useState(savedDocument?.id ?? "");

  useEffect(() => {
    setFields(initialFields);
    setSavedId(savedDocument?.id ?? "");
  }, [initialFields, savedDocument]);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const model = useMemo(() => buildLetterModel(template, fields), [template, fields]);

  const handleChange = (key: string, value: string) => setFields((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!template) return;
    if (savedDocument) {
      updateDocument(savedDocument.id, {
        templateId: template.id,
        templateName: template.title,
        fields,
      });
      setSavedId(savedDocument.id);
      return;
    }

    const id = addDocument({
      templateId: template.id,
      templateName: template.title,
      fields,
    });
    setSavedId(id);
    router.replace(`/view/${id}`);
  };

  if (!template) {
    return (
      <main className="page">
        <div className="panel">
          <div className="empty-state">Template tidak ditemukan. Kembali ke beranda untuk memilih template lain.</div>
          <div style={{ marginTop: 16 }}>
            <Link href="/" className="button-ghost">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="toolbar hidden-print" style={{ marginBottom: 12 }}>
        <Link href="/" className="button-ghost">
          <ArrowLeft size={16} />
          Beranda
        </Link>
        <Link href="/saved" className="button-ghost">
          <FileText size={16} />
          Tersimpan
        </Link>
        <span className="pill">{savedDocument ? "Mode Edit" : "Mode Buat Baru"}</span>
      </div>

      <section className="hero" style={{ paddingTop: 0 }}>
        <div className="pill">Template aktif: {template.title}</div>
        <h1 className="hero-title" style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}>
          {savedDocument ? `Edit dokumen tersimpan` : `Isi data surat Anda`}
        </h1>
        <p className="hero-copy">
          Lengkapi bidang di sisi kiri. Pratinjau surat akan mengikuti data Anda secara langsung.
        </p>
      </section>

      {isMobile ? (
        <div className="builder-tabs hidden-print" style={{ marginBottom: 12 }}>
          <button className="button-ghost" style={mobileTabStyle(activeTab === "form")} onClick={() => setActiveTab("form")}>
            <TabletSmartphone size={16} />
            Formulir
          </button>
          <button className="button-ghost" style={mobileTabStyle(activeTab === "preview")} onClick={() => setActiveTab("preview")}>
            <Eye size={16} />
            Pratinjau
          </button>
        </div>
      ) : null}

      <div className="builder-layout">
        <section className="panel builder-form hidden-print" style={isMobile && activeTab === "preview" ? { display: "none" } : undefined}>
          <h2 className="panel-title">Data Surat</h2>
          {template.fields.map((field) => (
            <label className="field-group" key={field.key}>
              <span className="field-label">
                <span>{field.label}</span>
                <span>{field.required ? "Wajib" : "Opsional"}</span>
              </span>
              {field.type === "textarea" ? (
                <textarea
                  className="field-textarea"
                  placeholder={field.placeholder ?? field.label}
                  value={fields[field.key] ?? ""}
                  onChange={(event) => handleChange(field.key, event.target.value)}
                />
              ) : (
                <input
                  className="field-input"
                  type={field.type}
                  placeholder={field.placeholder ?? field.label}
                  value={fields[field.key] ?? ""}
                  onChange={(event) => handleChange(field.key, event.target.value)}
                />
              )}
            </label>
          ))}
          <div className="builder-actions">
            <button className="button" onClick={handleSave}>
              <Save size={16} />
              {savedDocument ? "Perbarui Simpanan" : "Simpan Dokumen"}
            </button>
            {savedId ? (
              <Link className="button-ghost" href={`/view/${savedId}`}>
                <Check size={16} />
                Lihat Dokumen
              </Link>
            ) : null}
          </div>
        </section>

        <aside className="builder-preview" style={isMobile && activeTab === "form" ? { display: "none" } : undefined}>
          <div className="document-paper">
            <div className="paper-topline">KOP SURAT / SURAT RESMI</div>
            <h2 className="paper-heading">{template.title.toUpperCase()}</h2>
            <p className="paper-subheading">{template.description}</p>
            <div className="paper-divider" />

            <div className="paper-meta">
              <div>
                <strong>Nomor</strong> {model.letterNumber}
              </div>
              <div>
                <strong>Lampiran</strong> {cleanText(fields.lampiran) || "-"}
              </div>
              <div>
                <strong>Perihal</strong> {model.subject}
              </div>
              <div>
                <strong>Tempat/Tgl</strong> {model.dateLine}
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <strong>Alamat</strong> {cleanText(fields.alamat) || cleanText(fields.alamat_pemberi_kuasa) || cleanText(fields.alamat_pemilik) || "..."}
              </div>
            </div>

            {model.paragraphs.map((paragraph) => (
              <p key={paragraph} className="paper-paragraph">
                {paragraph}
              </p>
            ))}

            {model.details.length > 0 ? (
              <div className="paper-details">
                {model.details.map((item) => (
                  <div className="paper-detail-row" key={`${item.label}-${item.value}`}>
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {model.bullets.length > 0 ? (
              <ul className="paper-bullets">
                {model.bullets.map((bullet) => (
                  <li key={bullet} className="paper-paragraph" style={{ textAlign: "left", marginBottom: "0.35rem" }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="paper-paragraph">{model.closing}</p>

            <div className="paper-signature">
              <div className="block">
                <div>{formatDateLine(fields.tempat, fields.tanggal)}</div>
                <div className="paper-sign-space" />
                <div style={{ fontWeight: 700, textDecoration: "underline" }}>{model.signatureName}</div>
                <div>{model.signatureRole}</div>
              </div>
            </div>
          </div>
        </aside>

      </div>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2 className="panel-title">Panduan Cepat</h2>
        <div className="grid-2">
          <div className="kpi-card panel">
            <div className="pill">Serif resmi</div>
            <p className="help-text">Pratinjau memakai tampilan surat formal Indonesia agar mudah dipakai untuk pengajuan, pernyataan, dan administrasi.</p>
          </div>
          <div className="kpi-card panel">
            <div className="pill">Autosimpan</div>
            <p className="help-text">Setelah disimpan, dokumen muncul di menu Tersimpan dan dapat diedit, digandakan, atau dihapus.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
