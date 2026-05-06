export type EventCategory =
  | "music"
  | "food"
  | "art"
  | "sports"
  | "family"
  | "nightlife";

export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  price: string;
  imageUrl: string;
  organizer: string;
  link: string;
  createdAt: string;
};

export const seedEvents: EventItem[] = [
  {
    id: "pasar-musik-m-bloc",
    title: "Pasar Musik M Bloc",
    description:
      "Malam vinyl, panggung akustik, dan bazar merch lokal di koridor M Bloc Space. Cocok buat kamu yang cari musik live tanpa harus ribet.",
    date: "2026-05-02",
    time: "19:00",
    location: "M Bloc Space, Blok M, Jakarta Selatan",
    category: "music",
    price: "Rp75.000",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    organizer: "M Bloc Live",
    link: "https://mblocspace.com/",
    createdAt: "2026-04-18T10:00:00.000Z",
  },
  {
    id: "sunday-brunch-pasar-santa",
    title: "Sunday Brunch at Pasar Santa",
    description:
      "Brunch santai, pastry hangat, dan kopi spesial dari tenant favorit Pasar Santa. Datang pagi sebelum antrean memanjang.",
    date: "2026-05-03",
    time: "10:00",
    location: "Pasar Santa, Kebayoran Baru, Jakarta Selatan",
    category: "food",
    price: "Rp120.000",
    imageUrl:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
    organizer: "Pasar Santa Kitchen Club",
    link: "https://www.instagram.com/pasarsanta/",
    createdAt: "2026-04-19T08:30:00.000Z",
  },
  {
    id: "skate-night-gbk",
    title: "Skate Night GBK",
    description:
      "Sesi skate malam di area GBK dengan lampu kota, musik funk, dan komunitas yang selalu bikin semangat. Bebas untuk all-level.",
    date: "2026-05-02",
    time: "20:30",
    location: "GBK Skate Park, Gelora Bung Karno, Jakarta Pusat",
    category: "sports",
    price: "Gratis",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    organizer: "GBK Active Community",
    link: "https://gbk.id/",
    createdAt: "2026-04-20T12:00:00.000Z",
  },
  {
    id: "art-walk-tim",
    title: "Art Walk TIM",
    description:
      "Jelajah galeri, instalasi visual, dan obrolan singkat bareng kurator di Taman Ismail Marzuki. Pas buat weekend yang lebih tenang.",
    date: "2026-05-03",
    time: "15:30",
    location: "Taman Ismail Marzuki, Cikini, Jakarta Pusat",
    category: "art",
    price: "Rp50.000",
    imageUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    organizer: "TIM Art House",
    link: "https://tim.co.id/",
    createdAt: "2026-04-15T11:20:00.000Z",
  },
  {
    id: "family-cinema-setu-babakan",
    title: "Family Cinema di Setu Babakan",
    description:
      "Nonton film keluarga di ruang terbuka sambil piknik kecil di tepi danau budaya Betawi. Ada zona bermain anak dan camilan tradisional.",
    date: "2026-05-10",
    time: "18:00",
    location: "Setu Babakan, Jagakarsa, Jakarta Selatan",
    category: "family",
    price: "Gratis",
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    organizer: "Jakarta Family Weekend",
    link: "https://www.jakarta-tourism.go.id/",
    createdAt: "2026-04-22T09:10:00.000Z",
  },
  {
    id: "sunset-jazz-kota-tua",
    title: "Sunset Jazz Kota Tua",
    description:
      "Jazz set santai saat matahari turun di Kota Tua. Ada pop-up food stall, vibes retro, dan spot foto yang selalu ramai.",
    date: "2026-05-09",
    time: "17:00",
    location: "Kota Tua Jakarta, Taman Fatahillah",
    category: "music",
    price: "Rp90.000",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    organizer: "Kota Tua Sessions",
    link: "https://kotatua.jakarta.go.id/",
    createdAt: "2026-04-12T14:05:00.000Z",
  },
  {
    id: "run-coffee-cfd-sudirman",
    title: "Run & Coffee CFD Sudirman",
    description:
      "Lari pagi 5K di Car Free Day lalu ngopi bareng komunitas. Rute ringan, pace santai, dan cocok buat yang baru mulai rutin olahraga.",
    date: "2026-05-10",
    time: "06:30",
    location: "Bundaran HI - Sudirman, Jakarta Pusat",
    category: "sports",
    price: "Gratis",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    organizer: "Jakarta Run Club",
    link: "https://www.jakartacfd.id/",
    createdAt: "2026-04-23T07:45:00.000Z",
  },
  {
    id: "night-market-rasa-pos-bloc",
    title: "Night Market Rasa di Pos Bloc",
    description:
      "Deretan makanan jalanan, minuman manis, dan DJ set mellow di halaman Pos Bloc. Tempat yang pas buat cari makan malam dadakan.",
    date: "2026-05-16",
    time: "18:30",
    location: "Pos Bloc Jakarta, Pasar Baru, Jakarta Pusat",
    category: "food",
    price: "Rp60.000",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    organizer: "Pos Bloc Night Market",
    link: "https://posbloc.id/",
    createdAt: "2026-04-21T13:15:00.000Z",
  },
  {
    id: "kids-lab-kidzania",
    title: "Kids Lab Minggu Ceria",
    description:
      "Workshop sains interaktif untuk anak-anak dengan eksperimen sederhana, cerita, dan permainan edukatif yang tetap seru untuk keluarga.",
    date: "2026-05-17",
    time: "09:00",
    location: "KidZania Jakarta, Pacific Place",
    category: "family",
    price: "Rp180.000",
    imageUrl:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    organizer: "KidZania Learning Crew",
    link: "https://jakarta.kidzania.com/",
    createdAt: "2026-04-24T08:00:00.000Z",
  },
  {
    id: "indie-night-rossi-musik",
    title: "Indie Night Rossi Musik",
    description:
      "Band-band indie lokal tampil bergantian di panggung kecil yang intim. Suasana padat, dekat, dan sering jadi tempat nemu band baru.",
    date: "2026-05-17",
    time: "20:00",
    location: "Rossi Musik Fatmawati, Jakarta Selatan",
    category: "nightlife",
    price: "Rp65.000",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-b2c0a1e1ef6f?auto=format&fit=crop&w=1200&q=80",
    organizer: "Rossi Live Series",
    link: "https://www.instagram.com/rossimusikfatmawati/",
    createdAt: "2026-04-16T18:45:00.000Z",
  },
  {
    id: "workshop-keramik-dialogue",
    title: "Workshop Keramik di Dia.Lo.Gue",
    description:
      "Sesi membuat mug dan piring kecil bersama perupa lokal di ruang seni Kemang. Pulang membawa karya sendiri yang langsung dibakar studio.",
    date: "2026-05-24",
    time: "13:00",
    location: "Dia.Lo.Gue Artspace, Kemang, Jakarta Selatan",
    category: "art",
    price: "Rp150.000",
    imageUrl:
      "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1200&q=80",
    organizer: "Dia.Lo.Gue Studio",
    link: "https://dialogueartspace.com/",
    createdAt: "2026-04-14T16:25:00.000Z",
  },
  {
    id: "neon-friday-lucy-sky",
    title: "Neon Friday di Lucy in the Sky",
    description:
      "DJ set electro, lighting neon, dan crowd yang siap lanjut malam. Rooftop energy yang pas buat penutup minggu kerja.",
    date: "2026-05-23",
    time: "21:00",
    location: "Lucy in the Sky, SCBD, Jakarta Selatan",
    category: "nightlife",
    price: "Rp95.000",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    organizer: "Lucy Rooftop Club",
    link: "https://www.instagram.com/lucyintheskyjakarta/",
    createdAt: "2026-04-17T20:00:00.000Z",
  },
];
