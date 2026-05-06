export const FOOD_TAGS = [
  "sarapan",
  "mie",
  "sate",
  "kopi",
  "gorengan",
  "manis",
  "pedas",
  "seafood",
  "soto",
  "bakso",
  "martabak",
  "nasi",
  "ayam",
  "jajanan",
  "malam",
] as const;

export type FoodTag = (typeof FOOD_TAGS)[number];

export const TAG_META: Record<FoodTag, { emoji: string; label: string; hint: string }> = {
  sarapan: { emoji: "🥣", label: "Sarapan", hint: "Buat start pagi yang santai." },
  mie: { emoji: "🍜", label: "Mie", hint: "Slurpy, hangat, dan selalu aman." },
  sate: { emoji: "🍢", label: "Sate", hint: "Bakar-bakaran yang bikin fokus." },
  kopi: { emoji: "☕", label: "Kopi", hint: "Teman ngetik dan ngobrol lama." },
  gorengan: { emoji: "🍘", label: "Gorengan", hint: "Kriuk-kriuk penguat mood." },
  manis: { emoji: "🍮", label: "Manis", hint: "Penutup yang bikin senyum." },
  pedas: { emoji: "🌶️", label: "Pedas", hint: "Biar keringatnya keluar sekalian." },
  seafood: { emoji: "🦐", label: "Seafood", hint: "Rasa laut buat makan rame-rame." },
  soto: { emoji: "🍲", label: "Soto", hint: "Hangat, gurih, dan bikin balik lagi." },
  bakso: { emoji: "🧆", label: "Bakso", hint: "Kenyal, kenyang, dan ikonik." },
  martabak: { emoji: "🥞", label: "Martabak", hint: "Camilan malam yang susah ditolak." },
  nasi: { emoji: "🍚", label: "Nasi", hint: "Kalau bingung, pilih yang ada nasinya." },
  ayam: { emoji: "🍗", label: "Ayam", hint: "Andalan semua jam makan." },
  jajanan: { emoji: "🍡", label: "Jajanan", hint: "Ngemil dulu, mikir belakangan." },
  malam: { emoji: "🌙", label: "Malam", hint: "Buru-buru cari yang buka sampai larut." },
};

export const FEELING_PRESETS = [
  {
    label: "Yang anget-anget",
    emoji: "🔥",
    tags: ["sarapan", "soto", "bakso", "nasi"],
    query: "lagi pengen yang anget dan bikin badan santai",
    helper: "Bubur, soto, bakso, atau nasi hangat.",
  },
  {
    label: "Yang pedes nampol",
    emoji: "🌶️",
    tags: ["pedas", "sate", "mie", "malam"],
    query: "yang pedesnya berasa sampai keringetan",
    helper: "Taichan, mie pedas, sate, dan cemilan larut malam.",
  },
  {
    label: "Yang manis-manis",
    emoji: "🍯",
    tags: ["manis", "martabak", "jajanan", "kopi"],
    query: "butuh yang manis buat naikin mood",
    helper: "Martabak, roti bakar, dan teman kopi santai.",
  },
  {
    label: "Yang gurih berlemak",
    emoji: "🧈",
    tags: ["nasi", "ayam", "gorengan", "sate"],
    query: "yang gurih, padat, dan bikin puas",
    helper: "Nasi uduk, ayam, sate, sama gorengan panas.",
  },
  {
    label: "Yang seger-seger",
    emoji: "💦",
    tags: ["kopi", "sarapan", "soto", "seafood"],
    query: "yang segar, ringan, dan enak diajak santai",
    helper: "Kopi, sarapan awal, atau seafood buat rame-rame.",
  },
] as const;

export function formatPriceRange(priceRange: number) {
  const safe = Math.min(4, Math.max(1, Math.round(priceRange || 1)));
  return Array.from({ length: safe }, () => "Rp").join("");
}

export function normalizeText(value: string) {
  return value.toLowerCase().trim();
}

export function tagMatches(placeTags: string[], activeTags: string[]) {
  if (activeTags.length === 0) return true;
  return activeTags.some((tag) => placeTags.includes(tag));
}
