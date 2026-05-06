"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Copy, Pencil, Trash2, Eye, FileText } from "lucide-react";
import { cloneFields } from "@/lib/letter";
import { useDocumentStore } from "@/lib/store";
import { getTemplateById } from "@/lib/templates";

export default function SavedPage() {
  const router = useRouter();
  const documents = useDocumentStore((state) => state.documents);
  const removeDocument = useDocumentStore((state) => state.removeDocument);
  const addDocument = useDocumentStore((state) => state.addDocument);

  const sorted = useMemo(() => [...documents].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [documents]);

  const duplicateDocument = (id: string) => {
    const current = documents.find((document) => document.id === id);
    if (!current) return;
    const copyId = addDocument({
      templateId: current.templateId,
      templateName: `${current.templateName} (Salinan)`,
      fields: cloneFields(current),
    });
    router.push(`/view/${copyId}`);
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="pill">Daftar dokumen tersimpan</div>
        <h1 className="hero-title" style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}>
          Surat yang sudah dibuat
        </h1>
        <p className="hero-copy">Kelola dokumen Anda di sini. Edit isi, gandakan untuk versi baru, atau hapus yang tidak diperlukan.</p>
      </section>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <FileText size={28} style={{ margin: "0 auto 0.75rem", color: "#ff6b00" }} />
          <p>Belum ada dokumen tersimpan.</p>
          <Link href="/" className="button">
            Mulai dari Template
          </Link>
        </div>
      ) : (
        <div className="doc-list">
          {sorted.map((document) => {
            const template = getTemplateById(document.templateId);
            return (
              <article key={document.id} className="doc-item">
                <div className="doc-meta">
                  <span className="pill">{document.templateName}</span>
                  <span className="pill">{template?.fields.length ?? 0} bidang</span>
                  <span className="pill">{new Date(document.createdAt).toLocaleString("id-ID")}</span>
                </div>
                <div>
                  <h2 className="doc-title">{template?.title ?? document.templateName}</h2>
                  <p className="doc-desc">ID dokumen: {document.id}</p>
                </div>
                <div className="doc-item-actions">
                  <Link href={`/view/${document.id}`} className="button-ghost">
                    <Eye size={16} />
                    Lihat
                  </Link>
                  <Link href={`/builder/${document.id}`} className="button-ghost">
                    <Pencil size={16} />
                    Edit
                  </Link>
                  <button className="button-ghost" onClick={() => duplicateDocument(document.id)}>
                    <Copy size={16} />
                    Duplikat
                  </button>
                  <button className="button-danger" onClick={() => removeDocument(document.id)}>
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
