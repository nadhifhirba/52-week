import { create } from 'zustand';

export type WasteType = 'plastik' | 'kertas' | 'logam' | 'kaca' | 'elektronik';
export type DepositStatus = 'menunggu' | 'diproses' | 'selesai';
export type PickupStatus = 'dijadwalkan' | 'diproses' | 'selesai';

export type Deposit = {
  id: string;
  userId: string;
  type: WasteType;
  weight_kg: number;
  points: number;
  date: string;
  status: DepositStatus;
};

export type Pickup = {
  id: string;
  address: string;
  date: string;
  items: WasteType[];
  notes?: string;
  status: PickupStatus;
};

export const pointRates: Record<WasteType, number> = {
  plastik: 50,
  kertas: 40,
  logam: 80,
  kaca: 30,
  elektronik: 100,
};

const format = (date: Date) => date.toISOString();

const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const seedDeposits: Deposit[] = [
  { id: 'dep-1', userId: 'user-001', type: 'plastik', weight_kg: 2.4, points: 120, date: format(new Date('2026-04-30T08:15:00Z')), status: 'selesai' },
  { id: 'dep-2', userId: 'user-001', type: 'kertas', weight_kg: 3, points: 120, date: format(new Date('2026-05-01T06:40:00Z')), status: 'selesai' },
  { id: 'dep-3', userId: 'user-001', type: 'logam', weight_kg: 1.5, points: 120, date: format(new Date('2026-05-01T09:30:00Z')), status: 'diproses' },
  { id: 'dep-4', userId: 'user-001', type: 'kaca', weight_kg: 2, points: 60, date: format(new Date('2026-05-01T12:10:00Z')), status: 'selesai' },
  { id: 'dep-5', userId: 'user-001', type: 'elektronik', weight_kg: 1.1, points: 110, date: format(new Date('2026-05-01T16:25:00Z')), status: 'menunggu' },
];

const seedPickups: Pickup[] = [
  {
    id: 'pick-1',
    address: 'Jl. Melati No. 12, Bandung',
    date: format(new Date('2026-05-03T07:30:00Z')),
    items: ['plastik', 'kertas'],
    notes: 'Mohon hubungi 10 menit sebelum tiba',
    status: 'dijadwalkan',
  },
  {
    id: 'pick-2',
    address: 'Perumahan Asri Blok C-8, Cimahi',
    date: format(new Date('2026-05-02T10:00:00Z')),
    items: ['logam', 'elektronik'],
    notes: 'Ada 2 karung kecil dan 1 printer rusak',
    status: 'diproses',
  },
];

type Store = {
  deposits: Deposit[];
  pickups: Pickup[];
  userPoints: number;
  addDeposit: (input: { userId: string; type: WasteType; weight_kg: number; status?: DepositStatus }) => Deposit;
  addPickup: (input: { address: string; date: string; items: WasteType[]; notes?: string }) => Pickup;
};

export const useTrashTreasureStore = create<Store>((set) => ({
  deposits: seedDeposits,
  pickups: seedPickups,
  userPoints: seedDeposits.reduce((sum, deposit) => sum + deposit.points, 0),
  addDeposit: ({ userId, type, weight_kg, status = 'menunggu' }) => {
    const points = Math.round(weight_kg * pointRates[type]);
    const newDeposit: Deposit = {
      id: makeId('dep'),
      userId,
      type,
      weight_kg,
      points,
      date: format(new Date()),
      status,
    };

    set((state) => ({
      deposits: [newDeposit, ...state.deposits],
      userPoints: state.userPoints + points,
    }));

    return newDeposit;
  },
  addPickup: ({ address, date, items, notes }) => {
    const newPickup: Pickup = {
      id: makeId('pick'),
      address,
      date,
      items,
      notes,
      status: 'dijadwalkan',
    };

    set((state) => ({
      pickups: [newPickup, ...state.pickups],
    }));

    return newPickup;
  },
}));

export const getEstimatedPoints = (type: WasteType, weightKg: number) => Math.round(weightKg * pointRates[type]);
