import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { pointRates, type WasteType } from './store';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wasteLabels: Record<WasteType, string> = {
  plastik: 'Plastik',
  kertas: 'Kertas',
  logam: 'Logam',
  kaca: 'Kaca',
  elektronik: 'Elektronik',
};

export const wasteEmoji: Record<WasteType, string> = {
  plastik: '♻',
  kertas: '▤',
  logam: '◼',
  kaca: '◌',
  elektronik: '⚡',
};

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

export const formatDateOnly = (value: string) =>
  new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(value));

export const getEstimatedPoints = (type: WasteType, weightKg: number) =>
  Math.round(weightKg * pointRates[type]);
