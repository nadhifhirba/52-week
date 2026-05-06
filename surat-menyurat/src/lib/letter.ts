import type { SavedDocument } from "./store";
import type { TemplateDefinition } from "./templates";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const romanMonths = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function cleanText(value: string | undefined) {
  return (value ?? "").trim();
}

export function formatDate(dateString?: string) {
  if (!dateString) return "...";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateLine(place: string, dateString?: string) {
  const formatted = formatDate(dateString);
  return `${cleanText(place) || "..."}, ${formatted}`;
}

export function generateLetterNumber(templateId: string, fields: Record<string, string>) {
  const number = cleanText(fields.nomor);
  if (number) return number;
  const date = fields.tanggal ? new Date(`${fields.tanggal}T00:00:00`) : new Date();
  const month = romanMonths[date.getMonth()];
  return `001/${templateId.toUpperCase().replace(/-/g, "/")}/${month}/${date.getFullYear()}`;
}

export type LetterModel = {
  letterNumber: string;
  dateLine: string;
  subject: string;
  paragraphs: string[];
  details: { label: string; value: string }[];
  bullets: string[];
  closing: string;
  signatureName: string;
  signatureRole: string;
};

function value(fields: Record<string, string>, key: string, fallback = "...") {
  const raw = cleanText(fields[key]);
  return raw || fallback;
}

export function buildLetterModel(template: TemplateDefinition | null, fields: Record<string, string>): LetterModel {
  if (!template) {
    return {
      letterNumber: value(fields, "nomor"),
      dateLine: formatDateLine(fields.tempat, fields.tanggal),
      subject: "Dokumen",
      paragraphs: ["Template tidak ditemukan."],
      details: [],
      bullets: [],
      closing: "Hormat saya",
      signatureName: value(fields, "nama"),
      signatureRole: "Penyusun",
    };
  }

  const letterNumber = generateLetterNumber(template.id, fields);
  const dateLine = formatDateLine(fields.tempat, fields.tanggal);

  switch (template.id) {
    case "surat-kuasa":
      return {
        letterNumber,
        dateLine,
        subject: "Surat Kuasa",
        paragraphs: [
          "Yang bertanda tangan di bawah ini, saya selaku Pemberi Kuasa memberikan wewenang penuh kepada pihak yang disebutkan di bawah untuk mewakili dan melakukan urusan sesuai keperluan yang tercantum.",
          `Kuasa ini diberikan untuk ${value(fields, "keperluan_kuasa")} dan berlaku sejak surat ini ditandatangani sampai urusan tersebut selesai dilaksanakan.`,
          "Segala tindakan yang dilakukan oleh Penerima Kuasa dalam batas kewenangan surat ini menjadi tanggung jawab Pemberi Kuasa.",
        ],
        details: [
          { label: "Pemberi Kuasa", value: value(fields, "nama_pemberi_kuasa") },
          { label: "NIK", value: value(fields, "nik_pemberi_kuasa") },
          { label: "Alamat", value: value(fields, "alamat_pemberi_kuasa") },
          { label: "Penerima Kuasa", value: value(fields, "nama_penerima_kuasa") },
          { label: "NIK", value: value(fields, "nik_penerima_kuasa") },
          { label: "Alamat", value: value(fields, "alamat_penerima_kuasa") },
        ],
        bullets: [value(fields, "keperluan_kuasa")],
        closing: "Demikian surat kuasa ini dibuat untuk dapat dipergunakan sebagaimana mestinya.",
        signatureName: value(fields, "nama_pemberi_kuasa"),
        signatureRole: "Pemberi Kuasa",
      };
    case "surat-pernyataan":
      return {
        letterNumber,
        dateLine,
        subject: "Surat Pernyataan",
        paragraphs: [
          "Saya yang bertanda tangan di bawah ini menyatakan dengan sebenarnya bahwa data dan keterangan yang saya berikan adalah benar.",
          value(fields, "pernyataan"),
          "Apabila di kemudian hari terdapat ketidaksesuaian, saya bersedia bertanggung jawab sesuai ketentuan yang berlaku.",
        ],
        details: [
          { label: "Nama Lengkap", value: value(fields, "nama") },
          { label: "NIK", value: value(fields, "nik") },
          { label: "Tempat Lahir", value: value(fields, "tempat_lahir") },
          { label: "Tanggal Lahir", value: formatDate(fields.tanggal_lahir) },
          { label: "Alamat", value: value(fields, "alamat") },
          { label: "Pekerjaan", value: value(fields, "pekerjaan") },
        ],
        bullets: [],
        closing: "Demikian pernyataan ini dibuat dengan sadar tanpa ada paksaan dari pihak mana pun.",
        signatureName: value(fields, "nama"),
        signatureRole: "Yang Membuat Pernyataan",
      };
    case "surat-keterangan-kerja":
      return {
        letterNumber,
        dateLine,
        subject: "Surat Keterangan Kerja",
        paragraphs: [
          "Dengan ini diterangkan bahwa nama tersebut di bawah benar merupakan karyawan pada perusahaan kami dan masih aktif bekerja sampai saat surat ini diterbitkan.",
          `Yang bersangkutan menjabat sebagai ${value(fields, "jabatan")} pada departemen ${value(fields, "departemen")}.`,
          `Mulai bekerja pada tanggal ${formatDate(fields.tanggal_masuk)} dan menunjukkan kinerja yang baik selama masa kerja.`,
        ],
        details: [
          { label: "Nama Karyawan", value: value(fields, "nama_karyawan") },
          { label: "NIK", value: value(fields, "nik") },
          { label: "Tempat Lahir", value: value(fields, "tempat_lahir") },
          { label: "Tanggal Lahir", value: formatDate(fields.tanggal_lahir) },
          { label: "Alamat", value: value(fields, "alamat") },
        ],
        bullets: [
          `Jabatan: ${value(fields, "jabatan")}`,
          `Departemen: ${value(fields, "departemen")}`,
          `Tanggal Masuk: ${formatDate(fields.tanggal_masuk)}`,
        ],
        closing: "Surat ini dibuat untuk dipergunakan sebagaimana mestinya.",
        signatureName: value(fields, "nama_pimpinan"),
        signatureRole: value(fields, "jabatan_pimpinan"),
      };
    case "surat-pengunduran-diri":
      return {
        letterNumber,
        dateLine,
        subject: "Surat Pengunduran Diri",
        paragraphs: [
          `Melalui surat ini, saya ${value(fields, "nama")} bermaksud mengajukan pengunduran diri dari ${value(fields, "perusahaan")} terhitung efektif mulai ${formatDate(fields.tanggal_efektif)}.`,
          `Saat ini saya menjabat sebagai ${value(fields, "jabatan")} pada departemen ${value(fields, "departemen")}.`,
          value(fields, "alasan"),
          "Saya mengucapkan terima kasih atas kesempatan, bimbingan, dan pengalaman berharga selama bekerja di perusahaan ini.",
        ],
        details: [
          { label: "Nama", value: value(fields, "nama") },
          { label: "NIK", value: value(fields, "nik") },
          { label: "Jabatan", value: value(fields, "jabatan") },
          { label: "Departemen", value: value(fields, "departemen") },
        ],
        bullets: [`Tanggal Efektif: ${formatDate(fields.tanggal_efektif)}`],
        closing: "Demikian surat ini saya buat dengan penuh pertimbangan dan kesadaran.",
        signatureName: value(fields, "nama"),
        signatureRole: "Hormat Saya",
      };
    case "surat-permohonan":
      return {
        letterNumber,
        dateLine,
        subject: value(fields, "tujuan"),
        paragraphs: [
          `Dengan hormat, saya yang bertanda tangan di bawah ini mengajukan ${value(fields, "keperluan")}.`,
          `Permohonan ini saya ajukan kepada ${value(fields, "tujuan")} dengan harapan dapat dipertimbangkan sebagaimana mestinya.`,
          "Sebagai bahan pertimbangan, bersama surat ini saya lampirkan data dan keterangan yang diperlukan.",
        ],
        details: [
          { label: "Nama Pemohon", value: value(fields, "nama") },
          { label: "NIK", value: value(fields, "nik") },
          { label: "Alamat", value: value(fields, "alamat") },
          { label: "Kontak", value: value(fields, "kontak") },
          { label: "Lampiran", value: value(fields, "lampiran", "-") },
        ],
        bullets: [value(fields, "keperluan")],
        closing: "Demikian permohonan ini saya sampaikan. Atas perhatian dan kebijaksanaannya saya ucapkan terima kasih.",
        signatureName: value(fields, "nama"),
        signatureRole: "Pemohon",
      };
    case "surat-perjanjian-sewa":
      return {
        letterNumber,
        dateLine,
        subject: "Surat Perjanjian Sewa",
        paragraphs: [
          "Pada hari ini telah dibuat perjanjian sewa-menyewa antara Pihak Pertama dan Pihak Kedua atas objek sewa yang disebutkan di bawah.",
          `Objek sewa berupa ${value(fields, "objek_sewa")} yang berlokasi di ${value(fields, "alamat_properti")}.`,
          `Harga sewa disepakati sebesar ${value(fields, "harga_sewa")} untuk jangka waktu ${value(fields, "jangka_waktu")} terhitung mulai ${formatDate(fields.tanggal_mulai)} sampai ${formatDate(fields.tanggal_selesai)}.`,
          "Kedua belah pihak sepakat untuk mematuhi seluruh ketentuan yang tertulis dalam perjanjian ini.",
        ],
        details: [
          { label: "Pemilik", value: value(fields, "nama_pemilik") },
          { label: "NIK Pemilik", value: value(fields, "nik_pemilik") },
          { label: "Penyewa", value: value(fields, "nama_penyewa") },
          { label: "NIK Penyewa", value: value(fields, "nik_penyewa") },
          { label: "Alamat Pemilik", value: value(fields, "alamat_pemilik") },
          { label: "Alamat Penyewa", value: value(fields, "alamat_penyewa") },
        ],
        bullets: [
          `Objek: ${value(fields, "objek_sewa")}`,
          `Harga: ${value(fields, "harga_sewa")}`,
          `Periode: ${formatDate(fields.tanggal_mulai)} - ${formatDate(fields.tanggal_selesai)}`,
        ],
        closing: "Surat perjanjian ini dibuat rangkap dua dan memiliki kekuatan hukum yang sama.",
        signatureName: value(fields, "nama_pemilik"),
        signatureRole: "Pihak Pertama",
      };
    case "surat-lamaran-kerja":
      return {
        letterNumber,
        dateLine,
        subject: `Lamaran untuk ${value(fields, "posisi_dilamar")}`,
        paragraphs: [
          `Dengan hormat, berdasarkan informasi lowongan yang saya peroleh, saya bermaksud mengajukan lamaran untuk posisi ${value(fields, "posisi_dilamar")}.`,
          `Saya, ${value(fields, "nama")}, lahir di ${value(fields, "tempat_lahir")} pada ${formatDate(fields.tanggal_lahir)} dan berdomisili di ${value(fields, "alamat")}.`,
          `Pendidikan terakhir saya adalah ${value(fields, "pendidikan_terakhir")} dengan pengalaman kerja ${value(fields, "pengalaman")}.`,
          value(fields, "keterampilan", ""),
          "Bersama surat ini saya lampirkan berkas pendukung sebagai bahan pertimbangan.",
        ].filter(Boolean),
        details: [
          { label: "Nama", value: value(fields, "nama") },
          { label: "HP", value: value(fields, "nomor_hp") },
          { label: "Email", value: value(fields, "email") },
          { label: "Pendidikan", value: value(fields, "pendidikan_terakhir") },
        ],
        bullets: [
          `Posisi: ${value(fields, "posisi_dilamar")}`,
          `Pengalaman: ${value(fields, "pengalaman")}`,
          `Keterampilan: ${value(fields, "keterampilan", "-")}`,
        ],
        closing: "Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.",
        signatureName: value(fields, "nama"),
        signatureRole: "Hormat Saya",
      };
    case "surat-izin":
      return {
        letterNumber,
        dateLine,
        subject: "Surat Izin",
        paragraphs: [
          `Saya yang bertanda tangan di bawah ini bermaksud mengajukan izin kepada ${value(fields, "instansi")} untuk ${value(fields, "keperluan")}.`,
          `Izin berlaku mulai ${formatDate(fields.tanggal_mulai)} sampai ${formatDate(fields.tanggal_selesai)} dengan alasan ${value(fields, "alasan")}.`,
          "Demikian permohonan izin ini saya sampaikan untuk dapat dimaklumi.",
        ],
        details: [
          { label: "Nama", value: value(fields, "nama") },
          { label: "NIK", value: value(fields, "nik") },
          { label: "Alamat", value: value(fields, "alamat") },
          { label: "Instansi", value: value(fields, "instansi") },
          { label: "Jabatan/Kelas", value: value(fields, "jabatan") },
        ],
        bullets: [
          `Keperluan: ${value(fields, "keperluan")}`,
          `Periode: ${formatDate(fields.tanggal_mulai)} - ${formatDate(fields.tanggal_selesai)}`,
        ],
        closing: "Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.",
        signatureName: value(fields, "nama"),
        signatureRole: "Pemohon Izin",
      };
    default:
      return {
        letterNumber,
        dateLine,
        subject: template.title,
        paragraphs: [template.description],
        details: [],
        bullets: [],
        closing: "Hormat saya",
        signatureName: value(fields, "nama"),
        signatureRole: "Penyusun",
      };
  }
}

export function cloneFields(document: SavedDocument) {
  return JSON.parse(JSON.stringify(document.fields)) as Record<string, string>;
}
