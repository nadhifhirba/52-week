export type FieldType = "text" | "date" | "textarea";

export type TemplateField = {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
};

export type TemplateDefinition = {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: TemplateField[];
};

export const templates: TemplateDefinition[] = [
  {
    id: "surat-kuasa",
    title: "Surat Kuasa",
    description: "Template kuasa resmi untuk mewakilkan urusan administrasi, pengambilan dokumen, atau transaksi.",
    icon: "Shield",
    fields: [
      { key: "nomor", label: "Nomor Surat", type: "text", required: true, placeholder: "001/SK/SM/2026" },
      { key: "tempat", label: "Tempat", type: "text", required: true, placeholder: "Jakarta" },
      { key: "tanggal", label: "Tanggal", type: "date", required: true },
      { key: "nama_pemberi_kuasa", label: "Nama Pemberi Kuasa", type: "text", required: true },
      { key: "nik_pemberi_kuasa", label: "NIK Pemberi Kuasa", type: "text", required: true },
      { key: "alamat_pemberi_kuasa", label: "Alamat Pemberi Kuasa", type: "textarea", required: true },
      { key: "nama_penerima_kuasa", label: "Nama Penerima Kuasa", type: "text", required: true },
      { key: "nik_penerima_kuasa", label: "NIK Penerima Kuasa", type: "text", required: true },
      { key: "alamat_penerima_kuasa", label: "Alamat Penerima Kuasa", type: "textarea", required: true },
      { key: "keperluan_kuasa", label: "Keperluan Kuasa", type: "textarea", required: true },
    ],
  },
  {
    id: "surat-pernyataan",
    title: "Surat Pernyataan",
    description: "Pernyataan resmi berisi komitmen, kebenaran data, atau kesanggupan tertentu.",
    icon: "FileText",
    fields: [
      { key: "nomor", label: "Nomor Surat", type: "text", required: true, placeholder: "002/SP/SM/2026" },
      { key: "tempat", label: "Tempat", type: "text", required: true, placeholder: "Bandung" },
      { key: "tanggal", label: "Tanggal", type: "date", required: true },
      { key: "nama", label: "Nama Lengkap", type: "text", required: true },
      { key: "nik", label: "NIK", type: "text", required: true },
      { key: "tempat_lahir", label: "Tempat Lahir", type: "text", required: true },
      { key: "tanggal_lahir", label: "Tanggal Lahir", type: "date", required: true },
      { key: "alamat", label: "Alamat", type: "textarea", required: true },
      { key: "pekerjaan", label: "Pekerjaan", type: "text", required: true },
      { key: "pernyataan", label: "Isi Pernyataan", type: "textarea", required: true },
    ],
  },
  {
    id: "surat-keterangan-kerja",
    title: "Surat Keterangan Kerja",
    description: "Surat keterangan resmi dari perusahaan tentang status, jabatan, dan masa kerja karyawan.",
    icon: "Briefcase",
    fields: [
      { key: "nomor", label: "Nomor Surat", type: "text", required: true, placeholder: "003/SKK/HRD/2026" },
      { key: "tempat", label: "Tempat", type: "text", required: true, placeholder: "Surabaya" },
      { key: "tanggal", label: "Tanggal", type: "date", required: true },
      { key: "nama_karyawan", label: "Nama Karyawan", type: "text", required: true },
      { key: "nik", label: "NIK", type: "text", required: true },
      { key: "tempat_lahir", label: "Tempat Lahir", type: "text", required: true },
      { key: "tanggal_lahir", label: "Tanggal Lahir", type: "date", required: true },
      { key: "alamat", label: "Alamat", type: "textarea", required: true },
      { key: "jabatan", label: "Jabatan", type: "text", required: true },
      { key: "departemen", label: "Departemen", type: "text", required: true },
      { key: "tanggal_masuk", label: "Tanggal Masuk", type: "date", required: true },
      { key: "nama_pimpinan", label: "Nama Pimpinan", type: "text", required: true },
      { key: "jabatan_pimpinan", label: "Jabatan Pimpinan", type: "text", required: true },
    ],
  },
  {
    id: "surat-pengunduran-diri",
    title: "Surat Pengunduran Diri",
    description: "Surat resmi untuk menyatakan pengunduran diri dari pekerjaan atau jabatan tertentu.",
    icon: "FilePenLine",
    fields: [
      { key: "nomor", label: "Nomor Surat", type: "text", required: true, placeholder: "004/SPD/SM/2026" },
      { key: "tempat", label: "Tempat", type: "text", required: true, placeholder: "Yogyakarta" },
      { key: "tanggal", label: "Tanggal", type: "date", required: true },
      { key: "nama", label: "Nama Lengkap", type: "text", required: true },
      { key: "nik", label: "NIK", type: "text", required: true },
      { key: "jabatan", label: "Jabatan", type: "text", required: true },
      { key: "departemen", label: "Departemen", type: "text", required: true },
      { key: "perusahaan", label: "Nama Perusahaan", type: "text", required: true },
      { key: "tanggal_efektif", label: "Tanggal Efektif", type: "date", required: true },
      { key: "alasan", label: "Alasan Pengunduran Diri", type: "textarea", required: true },
    ],
  },
  {
    id: "surat-permohonan",
    title: "Surat Permohonan",
    description: "Permohonan formal untuk izin, bantuan, fasilitas, atau layanan administrasi.",
    icon: "NotebookPen",
    fields: [
      { key: "nomor", label: "Nomor Surat", type: "text", required: true, placeholder: "005/SPM/SM/2026" },
      { key: "tempat", label: "Tempat", type: "text", required: true, placeholder: "Medan" },
      { key: "tanggal", label: "Tanggal", type: "date", required: true },
      { key: "nama", label: "Nama Pemohon", type: "text", required: true },
      { key: "nik", label: "NIK", type: "text", required: true },
      { key: "alamat", label: "Alamat", type: "textarea", required: true },
      { key: "kontak", label: "Nomor Kontak", type: "text", required: true },
      { key: "keperluan", label: "Keperluan", type: "textarea", required: true },
      { key: "tujuan", label: "Tujuan Surat", type: "text", required: true },
      { key: "lampiran", label: "Lampiran", type: "text", required: false, placeholder: "1 berkas" },
    ],
  },
  {
    id: "surat-perjanjian-sewa",
    title: "Surat Perjanjian Sewa",
    description: "Perjanjian sewa-menyewa rumah, ruko, kendaraan, atau barang dengan ketentuan lengkap.",
    icon: "FileSignature",
    fields: [
      { key: "nomor", label: "Nomor Perjanjian", type: "text", required: true, placeholder: "006/SPS/SM/2026" },
      { key: "tempat", label: "Tempat", type: "text", required: true, placeholder: "Semarang" },
      { key: "tanggal", label: "Tanggal", type: "date", required: true },
      { key: "nama_pemilik", label: "Nama Pemilik", type: "text", required: true },
      { key: "nik_pemilik", label: "NIK Pemilik", type: "text", required: true },
      { key: "alamat_pemilik", label: "Alamat Pemilik", type: "textarea", required: true },
      { key: "nama_penyewa", label: "Nama Penyewa", type: "text", required: true },
      { key: "nik_penyewa", label: "NIK Penyewa", type: "text", required: true },
      { key: "alamat_penyewa", label: "Alamat Penyewa", type: "textarea", required: true },
      { key: "objek_sewa", label: "Objek Sewa", type: "text", required: true },
      { key: "alamat_properti", label: "Alamat/Letak Objek", type: "textarea", required: true },
      { key: "harga_sewa", label: "Harga Sewa", type: "text", required: true },
      { key: "jangka_waktu", label: "Jangka Waktu", type: "text", required: true },
      { key: "tanggal_mulai", label: "Tanggal Mulai", type: "date", required: true },
      { key: "tanggal_selesai", label: "Tanggal Selesai", type: "date", required: true },
    ],
  },
  {
    id: "surat-lamaran-kerja",
    title: "Surat Lamaran Kerja",
    description: "Surat lamaran kerja profesional dengan data diri, posisi, dan daftar lampiran.",
    icon: "Mail",
    fields: [
      { key: "nomor", label: "Nomor Surat", type: "text", required: true, placeholder: "007/SLK/SM/2026" },
      { key: "tempat", label: "Tempat", type: "text", required: true, placeholder: "Denpasar" },
      { key: "tanggal", label: "Tanggal", type: "date", required: true },
      { key: "nama", label: "Nama Lengkap", type: "text", required: true },
      { key: "tempat_lahir", label: "Tempat Lahir", type: "text", required: true },
      { key: "tanggal_lahir", label: "Tanggal Lahir", type: "date", required: true },
      { key: "alamat", label: "Alamat", type: "textarea", required: true },
      { key: "pendidikan_terakhir", label: "Pendidikan Terakhir", type: "text", required: true },
      { key: "nomor_hp", label: "Nomor HP", type: "text", required: true },
      { key: "email", label: "Email", type: "text", required: true },
      { key: "posisi_dilamar", label: "Posisi Dilamar", type: "text", required: true },
      { key: "pengalaman", label: "Pengalaman Kerja", type: "textarea", required: true },
      { key: "keterampilan", label: "Keterampilan", type: "textarea", required: false },
    ],
  },
  {
    id: "surat-izin",
    title: "Surat Izin",
    description: "Surat izin resmi untuk tidak hadir bekerja, sekolah, atau mengikuti kegiatan tertentu.",
    icon: "ScrollText",
    fields: [
      { key: "nomor", label: "Nomor Surat", type: "text", required: true, placeholder: "008/SI/SM/2026" },
      { key: "tempat", label: "Tempat", type: "text", required: true, placeholder: "Bogor" },
      { key: "tanggal", label: "Tanggal", type: "date", required: true },
      { key: "nama", label: "Nama Pemohon", type: "text", required: true },
      { key: "nik", label: "NIK", type: "text", required: true },
      { key: "alamat", label: "Alamat", type: "textarea", required: true },
      { key: "instansi", label: "Instansi/Perusahaan", type: "text", required: true },
      { key: "jabatan", label: "Jabatan/Kelas", type: "text", required: true },
      { key: "keperluan", label: "Keperluan Izin", type: "textarea", required: true },
      { key: "tanggal_mulai", label: "Mulai Izin", type: "date", required: true },
      { key: "tanggal_selesai", label: "Selesai Izin", type: "date", required: true },
      { key: "alasan", label: "Alasan", type: "textarea", required: true },
    ],
  },
];

export const templateMap = Object.fromEntries(templates.map((template) => [template.id, template]));

export function getTemplateById(id: string) {
  return templateMap[id] ?? null;
}

export function isTemplateId(id: string) {
  return Boolean(templateMap[id]);
}
