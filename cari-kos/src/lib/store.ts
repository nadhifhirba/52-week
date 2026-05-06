import { create } from 'zustand';

export type KosType = 'putra' | 'putri' | 'campur';

export type Kos = {
  id: string;
  name: string;
  address: string;
  price: number;
  type: KosType;
  facilities: string[];
  photos: string[];
  videoUrl: string;
  rating: number;
  distance_km: number;
  description: string;
  contact: string;
  saved: boolean;
};

const grad = (a: string, b: string) => `linear-gradient(145deg, ${a}, ${b})`;

export const kosSeed: Kos[] = [
  {
    id: 'k1',
    name: 'Kos Aurora Tebet',
    address: 'Jl. Tebet Barat VIII, Jakarta Selatan',
    price: 1850000,
    type: 'putri',
    facilities: ['AC', 'WiFi', 'Kamar mandi dalam', 'Laundry area', 'Dapur bersama'],
    photos: [grad('#ff7a18', '#1f1147'), grad('#ff9a3c', '#451a03')],
    videoUrl: 'https://example.com/aurora',
    rating: 4.8,
    distance_km: 0.9,
    description: 'Kos modern yang tenang, dekat stasiun dan kuliner Tebet, cocok buat kerja remote maupun kuliah.',
    contact: '081234567801',
    saved: false
  },
  {
    id: 'k2',
    name: 'Kos Mint Residence',
    address: 'Jl. Kemang Selatan, Jakarta Selatan',
    price: 3200000,
    type: 'campur',
    facilities: ['AC', 'WiFi cepat', 'Smart lock', 'Parkir motor', 'Rooftop'],
    photos: [grad('#0f172a', '#22c55e'), grad('#111827', '#14b8a6')],
    videoUrl: 'https://example.com/mint',
    rating: 4.9,
    distance_km: 1.7,
    description: 'Vibe premium, interior estetik, ada rooftop buat nongkrong sore dan foto OOTD.',
    contact: '081234567802',
    saved: false
  },
  {
    id: 'k3',
    name: 'Kos Nusa Kuningan',
    address: 'Jl. Kuningan Barat, Jakarta Selatan',
    price: 2400000,
    type: 'putra',
    facilities: ['AC', 'WiFi', 'Kamar mandi luar', 'CCTV', 'Security 24 jam'],
    photos: [grad('#fde68a', '#dc2626'), grad('#f97316', '#111827')],
    videoUrl: 'https://example.com/nusa',
    rating: 4.6,
    distance_km: 1.2,
    description: 'Strategis buat pekerja area Sudirman-Kuningan dengan akses transport yang gampang.',
    contact: '081234567803',
    saved: false
  },
  {
    id: 'k4',
    name: 'Kos Senja Cipete',
    address: 'Jl. Cipete Raya, Jakarta Selatan',
    price: 1400000,
    type: 'putri',
    facilities: ['AC', 'WiFi', 'Kulkas bersama', 'Dapur', 'Balkon'],
    photos: [grad('#fb7185', '#7c2d12'), grad('#f59e0b', '#4c1d95')],
    videoUrl: 'https://example.com/senja',
    rating: 4.7,
    distance_km: 2.3,
    description: 'Hangat dan homey, cocok buat yang cari kos aman, rapi, dan dekat warung makan hits.',
    contact: '081234567804',
    saved: false
  },
  {
    id: 'k5',
    name: 'Kos Orbit Setiabudi',
    address: 'Jl. Setiabudi Tengah, Jakarta Selatan',
    price: 3500000,
    type: 'campur',
    facilities: ['AC', 'WiFi premium', 'Lift', 'Parkir mobil', 'Gym kecil'],
    photos: [grad('#0f172a', '#f97316'), grad('#111827', '#38bdf8')],
    videoUrl: 'https://example.com/orbit',
    rating: 4.95,
    distance_km: 0.7,
    description: 'Kos upscale untuk kamu yang pengin feel apartemen mini tapi tetap fleksibel.',
    contact: '081234567805',
    saved: false
  },
  {
    id: 'k6',
    name: 'Kos Cendana Rawamangun',
    address: 'Jl. Rawamangun Muka, Jakarta Timur',
    price: 1100000,
    type: 'putra',
    facilities: ['Kipas angin', 'WiFi', 'Kamar mandi dalam', 'Cuci motor', 'Parkir motor'],
    photos: [grad('#fbbf24', '#1f2937'), grad('#f97316', '#78350f')],
    videoUrl: 'https://example.com/cendana',
    rating: 4.4,
    distance_km: 1.9,
    description: 'Budget-friendly dengan akses kampus dan area makan yang ramai.',
    contact: '081234567806',
    saved: false
  },
  {
    id: 'k7',
    name: 'Kos Lantai Langit',
    address: 'Jl. Sunter Agung, Jakarta Utara',
    price: 1650000,
    type: 'campur',
    facilities: ['AC', 'WiFi', 'Dapur komunal', 'CCTV', 'Bebas jemuran'],
    photos: [grad('#22c55e', '#0f172a'), grad('#38bdf8', '#1e1b4b')],
    videoUrl: 'https://example.com/langit',
    rating: 4.5,
    distance_km: 2.8,
    description: 'Nuansa cerah dan santai, cocok buat anak muda yang aktif dan suka ruang komunal.',
    contact: '081234567807',
    saved: false
  },
  {
    id: 'k8',
    name: 'Kos Pintu Merah Pancoran',
    address: 'Jl. Pancoran Timur, Jakarta Selatan',
    price: 2200000,
    type: 'putri',
    facilities: ['AC', 'WiFi', 'Kamar mandi dalam', 'Laundry', 'Dispenser'],
    photos: [grad('#ef4444', '#111827'), grad('#f97316', '#1d4ed8')],
    videoUrl: 'https://example.com/pintu-merah',
    rating: 4.7,
    distance_km: 1.4,
    description: 'Nyaman buat kerja shift maupun WFO dengan suasana tenang dan bersih.',
    contact: '081234567808',
    saved: false
  },
  {
    id: 'k9',
    name: 'Kos Minimal Barat',
    address: 'Jl. Grogol Barat, Jakarta Barat',
    price: 900000,
    type: 'putra',
    facilities: ['Kipas angin', 'WiFi', 'Parkir motor', 'Cuci baju', 'Kulkas mini'],
    photos: [grad('#a3e635', '#111827'), grad('#f59e0b', '#0f172a')],
    videoUrl: 'https://example.com/minimal-barat',
    rating: 4.2,
    distance_km: 2.1,
    description: 'Paling ramah di kantong, value-nya tinggi buat mahasiswa dan pekerja awal karier.',
    contact: '081234567809',
    saved: false
  },
  {
    id: 'k10',
    name: 'Kos Binar Cempaka Putih',
    address: 'Jl. Cempaka Putih Raya, Jakarta Pusat',
    price: 2750000,
    type: 'campur',
    facilities: ['AC', 'WiFi', 'Smart TV', 'Kamar mandi dalam', 'Ruang tamu'],
    photos: [grad('#facc15', '#7c2d12'), grad('#fb7185', '#312e81')],
    videoUrl: 'https://example.com/binar',
    rating: 4.85,
    distance_km: 1.0,
    description: 'Serba ada, pas buat kamu yang pengin tinggal nyaman dan tampil rapi di feed.',
    contact: '081234567810',
    saved: false
  }
];

type Store = {
  kos: Kos[];
  saved: string[];
  toggleSaved: (id: string) => void;
  clearSaved: () => void;
};

export const useKosStore = create<Store>((set) => ({
  kos: kosSeed,
  saved: [],
  toggleSaved: (id) =>
    set((state) => ({
      kos: state.kos.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      ),
      saved: state.saved.includes(id)
        ? state.saved.filter((savedId) => savedId !== id)
        : [...state.saved, id]
    })),
  clearSaved: () =>
    set((state) => ({
      kos: state.kos.map((item) => ({ ...item, saved: false })),
      saved: []
    }))
}));

export const kosTypeLabel: Record<KosType, string> = {
  putra: 'Putra',
  putri: 'Putri',
  campur: 'Campur'
};

export const facilitiesCatalog = [
  'AC',
  'WiFi',
  'Kamar mandi dalam',
  'Dapur',
  'Parkir motor',
  'Parkir mobil',
  'CCTV',
  'Laundry',
  'Rooftop',
  'Smart lock'
];
