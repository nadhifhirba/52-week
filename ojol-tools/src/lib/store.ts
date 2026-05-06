import { create } from 'zustand';

export type EarningsEntry = {
  date: string;
  trips: number;
  earnings: number;
  tips: number;
  expenses: number;
  notes: string;
};

export type WaitingSpot = {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  rating: number;
  notes: string;
  peakHours: string;
  tags: string[];
};

export type CommunityTip = {
  id: string;
  author: string;
  role: string;
  location: string;
  createdAt: string;
  content: string;
  likes: number;
};

type StoreState = {
  earningsEntries: EarningsEntry[];
  waitingSpots: WaitingSpot[];
  communityTips: CommunityTip[];
  addEarningEntry: (entry: EarningsEntry) => void;
  addCommunityTip: (tip: Omit<CommunityTip, 'id' | 'createdAt' | 'likes'>) => void;
};

const today = '2026-05-02';

const initialEarnings: EarningsEntry[] = [
  {
    date: today,
    trips: 14,
    earnings: 482000,
    tips: 35000,
    expenses: 97000,
    notes: 'Fokus pagi di Gambir, sore geser ke Kuningan saat hujan turun.',
  },
  {
    date: '2026-05-01',
    trips: 12,
    earnings: 441000,
    tips: 25000,
    expenses: 91000,
    notes: 'Order bandara lumayan stabil dari jam 11 sampai 15.',
  },
  {
    date: '2026-04-30',
    trips: 11,
    earnings: 398000,
    tips: 15000,
    expenses: 88000,
    notes: 'Macet Tebet bikin durasi naik, tapi ongkir masih aman.',
  },
];

const initialSpots: WaitingSpot[] = [
  {
    id: 'gambir',
    name: 'Stasiun Gambir',
    area: 'Jakarta Pusat',
    lat: -6.1765,
    lng: 106.8306,
    rating: 4.8,
    notes: 'Ramai komuter dan penumpang antar kota. Cocok untuk pagi dan jam pulang kantor.',
    peakHours: '05.30–09.00, 16.00–20.00',
    tags: ['kereta', 'komuter', 'pagi sibuk'],
  },
  {
    id: 'soetta-t3',
    name: 'Bandara Soetta Terminal 3',
    area: 'Tangerang',
    lat: -6.1257,
    lng: 106.6559,
    rating: 4.9,
    notes: 'Order jauh lebih konsisten saat jadwal penerbangan padat dan cuaca buruk.',
    peakHours: '08.00–11.00, 18.00–23.00',
    tags: ['bandara', 'jarak jauh', 'surge'],
  },
  {
    id: 'kokas',
    name: 'Kota Kasablanka',
    area: 'Jakarta Selatan',
    lat: -6.2247,
    lng: 106.842,
    rating: 4.7,
    notes: 'Mall besar, cocok untuk menunggu saat jam makan siang dan akhir pekan.',
    peakHours: '11.00–14.00, 17.00–22.00',
    tags: ['mall', 'kuliner', 'akhir pekan'],
  },
  {
    id: 'blok-m',
    name: 'Blok M Square',
    area: 'Jakarta Selatan',
    lat: -6.2449,
    lng: 106.7958,
    rating: 4.6,
    notes: 'Bagus untuk perpindahan penumpang antar kawasan dan akses MRT.',
    peakHours: '10.00–13.00, 16.00–21.00',
    tags: ['mrt', 'kuliner', 'transit'],
  },
  {
    id: 'dukuh-atas',
    name: 'Dukuh Atas MRT',
    area: 'Jakarta Pusat',
    lat: -6.1996,
    lng: 106.8239,
    rating: 4.7,
    notes: 'Paling ramai saat commuter jam pulang kantor dan malam weekend.',
    peakHours: '06.30–09.30, 17.00–22.00',
    tags: ['mrt', 'kantor', 'anak muda'],
  },
  {
    id: 'kg',
    name: 'Mall Kelapa Gading',
    area: 'Jakarta Utara',
    lat: -6.1578,
    lng: 106.903,
    rating: 4.5,
    notes: 'Enak buat order keluarga, terutama di jam makan dan sore hari.',
    peakHours: '12.00–14.00, 18.00–21.00',
    tags: ['mall', 'keluarga', 'utara'],
  },
];

const initialTips: CommunityTip[] = [
  {
    id: 'tip-1',
    author: 'Budi',
    role: 'Ojol motor',
    location: 'Gambir',
    createdAt: '2 jam lalu',
    content: 'Kalau habis hujan, geser ke area stasiun. Order pendek banyak dan lebih cepat muter.',
    likes: 18,
  },
  {
    id: 'tip-2',
    author: 'Sari',
    role: 'Driver mobil',
    location: 'Soetta',
    createdAt: '4 jam lalu',
    content: 'Pantau jadwal landing malam. Biasanya order jauh naik menjelang jam 22.00.',
    likes: 24,
  },
  {
    id: 'tip-3',
    author: 'Rian',
    role: 'Ojol motor',
    location: 'Blok M',
    createdAt: '6 jam lalu',
    content: 'Kalau macet parah, pilih jalur putar yang dekat shelter. Waktu tunggu penumpang jadi lebih singkat.',
    likes: 12,
  },
  {
    id: 'tip-4',
    author: 'Nina',
    role: 'Driver mobil',
    location: 'Kuningan',
    createdAt: '8 jam lalu',
    content: 'Jam makan siang itu emas. Fokus antar kantor ke mall atau resto yang punya parkir mudah.',
    likes: 21,
  },
  {
    id: 'tip-5',
    author: 'Deni',
    role: 'Ojol motor',
    location: 'Dukuh Atas',
    createdAt: 'Kemarin',
    content: 'Bawa helm cadangan yang nyaman. Rating naik kalau penumpang merasa aman dan bersih.',
    likes: 16,
  },
  {
    id: 'tip-6',
    author: 'Maya',
    role: 'Driver mobil',
    location: 'Kelapa Gading',
    createdAt: 'Kemarin',
    content: 'Perhatikan sekolah dan pusat les. Setelah jam pulang anak, order keluarga biasanya ramai.',
    likes: 9,
  },
  {
    id: 'tip-7',
    author: 'Arif',
    role: 'Ojol motor',
    location: 'Kemayoran',
    createdAt: 'Kemarin',
    content: 'Isi bensin sebelum sore. Antrian SPBU malam sering bikin hilang 1–2 order.',
    likes: 14,
  },
  {
    id: 'tip-8',
    author: 'Lina',
    role: 'Driver mobil',
    location: 'Senayan',
    createdAt: '2 hari lalu',
    content: 'Kalau ada event, standby di jalan akses lebih dulu. Jangan nunggu terlalu dalam area parkir.',
    likes: 27,
  },
  {
    id: 'tip-9',
    author: 'Agus',
    role: 'Ojol motor',
    location: 'Tebet',
    createdAt: '2 hari lalu',
    content: 'Ambil short trip saat jam sibuk buat jaga arus. Kadang total harian lebih stabil daripada nunggu order besar.',
    likes: 11,
  },
  {
    id: 'tip-10',
    author: 'Rika',
    role: 'Driver mobil',
    location: 'Cakung',
    createdAt: '3 hari lalu',
    content: 'Simpan catatan spot yang sering kasih tip. Area yang rapi dan aman sering bikin pelanggan repeat.',
    likes: 8,
  },
];

export const useOjolStore = create<StoreState>((set) => ({
  earningsEntries: initialEarnings,
  waitingSpots: initialSpots,
  communityTips: initialTips,
  addEarningEntry: (entry) =>
    set((state) => ({
      earningsEntries: [entry, ...state.earningsEntries.filter((item) => item.date !== entry.date)],
    })),
  addCommunityTip: (tip) =>
    set((state) => ({
      communityTips: [
        {
          ...tip,
          id: `tip-${Date.now()}`,
          createdAt: 'Baru saja',
          likes: 0,
        },
        ...state.communityTips,
      ],
    })),
}));
