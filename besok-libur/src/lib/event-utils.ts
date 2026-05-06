import type { EventCategory, EventItem } from "./seed";

export const categoryLabels: Record<EventCategory, string> = {
  music: "Musik",
  food: "Kuliner",
  art: "Seni",
  sports: "Olahraga",
  family: "Keluarga",
  nightlife: "Malam",
};

export const categoryPills: Array<{ key: EventCategory | "all"; label: string }> = [
  { key: "all", label: "Semua" },
  { key: "music", label: "Musik" },
  { key: "food", label: "Kuliner" },
  { key: "art", label: "Seni" },
  { key: "sports", label: "Olahraga" },
  { key: "family", label: "Keluarga" },
];

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const badgeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
});

export function formatEventDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

export function formatEventDateBadge(date: string) {
  return badgeFormatter.format(new Date(`${date}T00:00:00`)).toUpperCase();
}

export function formatEventTime(time: string) {
  return `${time} WIB`;
}

export function formatPrice(price: string) {
  return price.trim().toLowerCase() === "gratis" ? "Gratis" : price;
}

export function formatCategory(category: EventCategory) {
  return categoryLabels[category];
}

export function sortBySoonest<T extends Pick<EventItem, "date" | "time">>(items: T[]) {
  return [...items].sort(
    (a, b) =>
      new Date(`${a.date}T${a.time}:00`).getTime() -
      new Date(`${b.date}T${b.time}:00`).getTime(),
  );
}

export function buildWhatsAppShareText(event: EventItem) {
  return [
    `Cek acara ini: ${event.title}`,
    `${formatEventDate(event.date)} • ${formatEventTime(event.time)}`,
    event.location,
    event.link,
  ].join("\n");
}
