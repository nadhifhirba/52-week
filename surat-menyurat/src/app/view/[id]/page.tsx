"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Download, Printer, Pencil } from "lucide-react";
import { jsPDF } from "jspdf";
import { buildLetterModel, cleanText, formatDateLine } from "@/lib/letter";
import { useDocumentStore } from "@/lib/store";
import { getTemplateById } from "@/lib/templates";

function wrapText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const lines = doc.splitTextToSize(text, maxWidth) as string[];
  lines.forEach((line) => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

export default function ViewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const documents = useDocumentStore((state) => state.documents);
  const addDocument = useDocumentStore((state) => state.addDocument);
  const document = documents.find((item) => item.id === params.id) ?? null;
  const template = getTemplateById(document?.templateId ?? "");

  const model = useMemo(() => buildLetterModel(template, document?.fields ?? {}), [template, document]);

  const duplicateDocument = () => {
    if (!document) return;
    const id = addDocument({
      templateId: document.templateId,
      templateName: `${document.templateName} (Salinan)`,
      fields: { ...document.fields },
    });
    router.push(`/view/${id}`);
  };

  const handleCopy = async () => {
    if (!document) return;
    const plainText = [
      "SURAT_MENYURAT",
      document.templateName.toUpperCase(),
      `Nomor: ${model.letterNumber}`,
      `Perihal: ${model.subject}`,
      `Tempat/Tanggal: ${model.dateLine}`,
      "",
      ...model.paragraphs,
      "",
      ...model.details.map((item) => `${item.label}: ${item.value}`),
      ...(model.bullets.length ? ["", ...model.bullets] : []),
      "",
      model.closing,
      "",
      `${model.signatureName}`,
      `${model.signatureRole}`,
    ].join("\n");
    await navigator.clipboard.writeText(plainText);
  };

  const handlePdf = () => {
    if (!document) return;
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const marginX = 20;
    let y = 20;

    pdf.setFont("times", "bold");
    pdf.setFontSize(14);
    pdf.text("KOP SURAT / SURAT RESMI", 105, y, { align: "center" });
    y += 8;
    pdf.setFontSize(18);
    pdf.text(template?.title.toUpperCase() ?? document.templateName.toUpperCase(), 105, y, { align: "center" });
    y += 6;
    pdf.setFont("times", "normal");
    pdf.setFontSize(11);
    pdf.text(template?.description ?? document.templateName, 105, y, { align: "center", maxWidth: 170 });
    y += 10;

    pdf.setLineWidth(0.3);
    pdf.line(marginX, y, 210 - marginX, y);
    y += 10;

    pdf.setFontSize(11);
    pdf.setFont("times", "normal");
    const meta = [
      `Nomor: ${model.letterNumber}`,
      `Perihal: ${model.subject}`,
      `Tempat/Tanggal: ${model.dateLine}`,
      `Lampiran: ${cleanText(document.fields.lampiran) || "-"}`,
    ];
    meta.forEach((line) => {
      y = wrapText(pdf, line, marginX, y, 170, 6) + 1;
    });

    y += 3;
    model.paragraphs.forEach((paragraph) => {
      y = wrapText(pdf, paragraph, marginX, y, 170, 6) + 2;
    });

    if (model.details.length > 0) {
      pdf.setFont("times", "bold");
      pdf.text("Data Pokok", marginX, y);
      y += 5;
      pdf.setFont("times", "normal");
      model.details.forEach((item) => {
        y = wrapText(pdf, `${item.label}: ${item.value}`, marginX, y, 170, 6) + 1;
      });
      y += 2;
    }

    if (model.bullets.length > 0) {
      pdf.setFont("times", "bold");
      pdf.text("Rincian", marginX, y);
      y += 5;
      pdf.setFont("times", "normal");
      model.bullets.forEach((bullet) => {
        y = wrapText(pdf, `• ${bullet}`, marginX, y, 170, 6) + 1;
      });
      y += 2;
    }

    y = wrapText(pdf, model.closing, marginX, y, 170, 6) + 8;
    pdf.text(formatDateLine(document.fields.tempat, document.fields.tanggal), 140, y, { align: "center" });
    y += 18;
    pdf.setFont("times", "bold");
    pdf.text(model.signatureName, 140, y, { align: "center" });
    pdf.setFont("times", "normal");
    y += 6;
    pdf.text(model.signatureRole, 140, y, { align: "center" });

    pdf.save(`${document.templateName}.pdf`);
  };

  if (!document) {
    return (
      <main className="page">
        <div className="panel">
          <div className="empty-state">Dokumen tidak ditemukan.</div>
          <div style={{ marginTop: 16 }}>
            <Link href="/saved" className="button-ghost">
              <ArrowLeft size={16} />
              Kembali
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="toolbar hidden-print" style={{ marginBottom: 12 }}>
        <Link href="/saved" className="button-ghost">
          <ArrowLeft size={16} />
          Tersimpan
        </Link>
        <Link href={`/builder/${document.id}`} className="button-ghost">
          <Pencil size={16} />
          Edit
        </Link>
        <button className="button-ghost" onClick={duplicateDocument}>
          <Copy size={16} />
          Duplikat
        </button>
        <button className="button" onClick={handlePdf}>
          <Download size={16} />
          Ekspor PDF
        </button>
        <button className="button-ghost" onClick={handleCopy}>
          Salin Teks
        </button>
        <button className="button-ghost" onClick={() => window.print()}>
          <Printer size={16} />
          Cetak
        </button>
      </div>

      <section className="hero" style={{ paddingTop: 0 }}>
        <div className="pill">Dokumen tersimpan</div>
        <h1 className="hero-title" style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}>
          {document.templateName}
        </h1>
        <p className="hero-copy">Siap diekspor, disalin, dicetak, atau dibuka untuk diedit kembali.</p>
      </section>

      <section className="panel">
        <div className="document-paper">
          <div className="paper-topline">KOP SURAT / SURAT RESMI</div>
          <h2 className="paper-heading">{document.templateName.toUpperCase()}</h2>
          <p className="paper-subheading">{template?.description ?? document.templateName}</p>
          <div className="paper-divider" />
          <div className="paper-meta">
            <div>
              <strong>Nomor</strong> {model.letterNumber}
            </div>
            <div>
              <strong>Perihal</strong> {model.subject}
            </div>
            <div>
              <strong>Tempat/Tgl</strong> {model.dateLine}
            </div>
            <div>
              <strong>ID</strong> {document.id}
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <strong>Disimpan</strong> {new Date(document.createdAt).toLocaleString("id-ID")}
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
              <div>{formatDateLine(document.fields.tempat, document.fields.tanggal)}</div>
              <div className="paper-sign-space" />
              <div style={{ fontWeight: 700, textDecoration: "underline" }}>{model.signatureName}</div>
              <div>{model.signatureRole}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
