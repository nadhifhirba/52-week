import { create } from 'zustand';

export type ParkingSpot = {
  id: string;
  ownerName: string;
  address: string;
  lat: number;
  lng: number;
  pricePerHour: number;
  availableHours: string;
  photo: string;
  rating: number;
  description: string;
  contact?: string;
  city?: string;
};

export type Booking = {
  id: string;
  spotId: string;
  spotName: string;
  renterName: string;
  date: string;
  startTime: string;
  durationHours: number;
  totalPrice: number;
  status: 'Menunggu' | 'Dikonfirmasi' | 'Selesai' | 'Dibatalkan';
};

type NewBooking = Omit<Booking, 'id' | 'status'> & { status?: Booking['status'] };

type NewSpot = Omit<ParkingSpot, 'id' | 'rating' | 'photo'> & {
  photo?: string;
  rating?: number;
};

type Store = {
  spots: ParkingSpot[];
  bookings: Booking[];
  addBooking: (booking: NewBooking) => void;
  addSpot: (spot: NewSpot) => void;
};

export const parkingSpotsSeed: ParkingSpot[] = [
  {
    id: 'menteng-01',
    ownerName: 'Rina Wulandari',
    address: 'Jl. Cikini Raya, Menteng, Jakarta Pusat',
    lat: -6.1923,
    lng: 106.8416,
    pricePerHour: 12000,
    availableHours: '06:00 - 22:00',
    photo: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    description: 'Carport teduh dekat stasiun dan area kuliner, aman untuk mobil harian.',
    contact: '0812-8888-101',
    city: 'Menteng',
  },
  {
    id: 'kemang-02',
    ownerName: 'Budi Santoso',
    address: 'Jl. Kemang Raya, Kemang, Jakarta Selatan',
    lat: -6.2607,
    lng: 106.8131,
    pricePerHour: 15000,
    availableHours: '24 jam',
    photo: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    description: 'Lahan paving luas, cocok untuk parkir malam hingga akhir pekan.',
    contact: '0813-7777-202',
    city: 'Kemang',
  },
  {
    id: 'scbd-03',
    ownerName: 'Nadia Putri',
    address: 'Jl. Jend. Sudirman, SCBD, Jakarta Selatan',
    lat: -6.2248,
    lng: 106.8066,
    pricePerHour: 28000,
    availableHours: '07:00 - 21:00',
    photo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    rating: 4.95,
    description: 'Spot premium dekat kantor dan pusat belanja, akses lift gate cepat.',
    contact: '0815-9090-303',
    city: 'SCBD',
  },
  {
    id: 'tebet-04',
    ownerName: 'Agus Pratama',
    address: 'Jl. Tebet Timur Dalam, Tebet, Jakarta Selatan',
    lat: -6.2315,
    lng: 106.8557,
    pricePerHour: 10000,
    availableHours: '05:00 - 23:00',
    photo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    description: 'Dekat area perumahan, aman, dan mudah dijangkau kendaraan harian.',
    contact: '0821-1234-404',
    city: 'Tebet',
  },
  {
    id: 'kelapa-gading-05',
    ownerName: 'Siti Aisyah',
    address: 'Jl. Boulevard Raya, Kelapa Gading, Jakarta Utara',
    lat: -6.1583,
    lng: 106.9003,
    pricePerHour: 13000,
    availableHours: '24 jam',
    photo: 'https://images.unsplash.com/photo-1455656678494-4d1b5f3f0f1a?auto=format&fit=crop&w=1200&q=80',
    rating: 4.85,
    description: 'Area luas dekat mal dan kuliner malam, cocok untuk parkir keluarga.',
    contact: '0819-5566-505',
    city: 'Kelapa Gading',
  },
  {
    id: 'senayan-06',
    ownerName: 'Dimas Hidayat',
    address: 'Jl. Asia Afrika, Senayan, Jakarta Pusat',
    lat: -6.2262,
    lng: 106.7985,
    pricePerHour: 22000,
    availableHours: '08:00 - 23:00',
    photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    rating: 4.88,
    description: 'Dekat stadion dan area bisnis, akses masuk lebar untuk mobil besar.',
    contact: '0822-7788-606',
    city: 'Senayan',
  },
];

const seedBookings: Booking[] = [
  {
    id: 'bk-001',
    spotId: 'scbd-03',
    spotName: 'SCBD Premium Spot',
    renterName: 'Ayu Lestari',
    date: '2026-05-03',
    startTime: '09:00',
    durationHours: 5,
    totalPrice: 140000,
    status: 'Dikonfirmasi',
  },
  {
    id: 'bk-002',
    spotId: 'kemang-02',
    spotName: 'Kemang Courtyard',
    renterName: 'Fajar Nugroho',
    date: '2026-05-05',
    startTime: '19:00',
    durationHours: 8,
    totalPrice: 120000,
    status: 'Menunggu',
  },
];

export const useParkingStore = create<Store>((set) => ({
  spots: parkingSpotsSeed,
  bookings: seedBookings,
  addBooking: (booking) =>
    set((state) => ({
      bookings: [
        {
          id: `bk-${Date.now()}`,
          status: booking.status ?? 'Menunggu',
          ...booking,
        },
        ...state.bookings,
      ],
    })),
  addSpot: (spot) =>
    set((state) => ({
      spots: [
        {
          id: `spot-${Date.now()}`,
          rating: spot.rating ?? 4.8,
          photo:
            spot.photo ??
            'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
          ...spot,
        },
        ...state.spots,
      ],
    })),
}));

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export const spotLabel = (spot: ParkingSpot) => spot.city ?? spot.address.split(',')[0] ?? spot.address;
