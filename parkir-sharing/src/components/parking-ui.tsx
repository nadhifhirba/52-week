import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock3, MapPin, Star } from 'lucide-react';
import { formatRupiah, type ParkingSpot } from '@/lib/store';

const MONAS = { lat: -6.175392, lng: 106.827153 };

export function distanceFromMonas(spot: ParkingSpot) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(spot.lat - MONAS.lat);
  const dLng = toRad(spot.lng - MONAS.lng);
  const lat1 = toRad(MONAS.lat);
  const lat2 = toRad(spot.lat);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function isAvailableNow(hours: string) {
  if (hours.toLowerCase().includes('24')) {
    return true;
  }

  const match = hours.match(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/);
  if (!match) return true;

  const [, startH, startM, endH, endM] = match;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = Number(startH) * 60 + Number(startM);
  const endMinutes = Number(endH) * 60 + Number(endM);

  if (startMinutes <= endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }

  return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
}

export function availabilityLabel(hours: string) {
  if (hours.toLowerCase().includes('24')) {
    return '24 jam';
  }
  return isAvailableNow(hours) ? 'Tersedia sekarang' : 'Tutup sekarang';
}

export function availabilityTone(hours: string) {
  if (hours.toLowerCase().includes('24')) {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
  }
  return isAvailableNow(hours)
    ? 'border-orange-500/30 bg-orange-500/10 text-orange-300'
    : 'border-slate-700 bg-slate-900 text-slate-300';
}

export function priceLevel(price: number) {
  if (price <= 12000) return 'Hemat';
  if (price <= 20000) return 'Standar';
  return 'Premium';
}

export function formatDistance(distance: number) {
  return distance < 10 ? `${distance.toFixed(1)} km` : `${Math.round(distance)} km`;
}

export function SpotCard({ spot }: { spot: ParkingSpot }) {
  const distance = distanceFromMonas(spot);
  return (
    <Link
      href={`/spot/${spot.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/[0.06]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={spot.photo}
          alt={spot.address}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full border border-orange-500/30 bg-slate-950/80 px-3 py-1 text-xs font-medium text-orange-200 backdrop-blur">
            {priceLevel(spot.pricePerHour)}
          </span>
          <span className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur ${availabilityTone(spot.availableHours)}`}>
            {availabilityLabel(spot.availableHours)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
          <div>
            <p className="text-sm text-slate-200/85">{spotLabel(spot)}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">{spot.ownerName}</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 text-right backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">/ jam</p>
            <p className="text-lg font-semibold text-orange-300">{formatRupiah(spot.pricePerHour)}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
            <span>{spot.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-orange-300" />
            <span>{formatDistance(distance)} dari Monas</span>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-slate-300">{spot.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-orange-300" />
            <span>{spot.availableHours}</span>
          </div>
          <span className="inline-flex items-center gap-1 font-medium text-orange-300">
            Detail <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-orange-300/80">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p> : null}
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{hint}</p>
    </div>
  );
}

export function InputField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-200">
      <span className="font-medium text-white">{label}</span>
      {children}
      {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function FieldShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white shadow-inner shadow-black/20">
      {children}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tones: Record<string, string> = {
    Menunggu: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    Dikonfirmasi: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    Selesai: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
    Dibatalkan: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tones[status] ?? 'border-white/10 bg-white/5 text-slate-300'}`}>
      {status}
    </span>
  );
}

export function spotLabel(spot: ParkingSpot) {
  return spot.city ?? spot.address.split(',')[0] ?? spot.address;
}
