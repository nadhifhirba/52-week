import { create } from 'zustand';

export type Queue = {
  id: string;
  name: string;
  location: string;
  currentNumber: number;
  lastNumber: number;
  estimatedWait: number;
  isActive: boolean;
};

type QueueStore = {
  queues: Queue[];
  createQueue: (queue: { name: string; location: string; estimatedWait: number }) => string;
  takeNumber: (id: string) => number | null;
  nextCustomer: (id: string) => void;
  skipCustomer: (id: string) => void;
  resetQueue: (id: string) => void;
  toggleQueue: (id: string) => void;
};

const seedQueues: Queue[] = [
  {
    id: 'bank-bca-sudirman',
    name: 'Bank BCA Cabang Sudirman',
    location: 'Jl. Jenderal Sudirman, Jakarta Pusat',
    currentNumber: 18,
    lastNumber: 32,
    estimatedWait: 7,
    isActive: true,
  },
  {
    id: 'bpjs-jakarta-pusat',
    name: 'BPJS Kesehatan Jakarta Pusat',
    location: 'Jl. Letjen Suprapto, Cempaka Putih',
    currentNumber: 42,
    lastNumber: 57,
    estimatedWait: 12,
    isActive: true,
  },
  {
    id: 'samsat-jakarta-selatan',
    name: 'Samsat Jakarta Selatan',
    location: 'Jl. Gatot Subroto, Pancoran',
    currentNumber: 9,
    lastNumber: 23,
    estimatedWait: 9,
    isActive: true,
  },
  {
    id: 'klinik-dr-anita',
    name: 'Klinik dr. Anita',
    location: 'Jl. Fatmawati Raya, Cilandak',
    currentNumber: 27,
    lastNumber: 35,
    estimatedWait: 15,
    isActive: true,
  },
];

export const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export const useQueueStore = create<QueueStore>((set) => ({
  queues: seedQueues,
  createQueue: ({ name, location, estimatedWait }) => {
    const id = `queue-${Date.now()}`;
    set((state) => ({
      queues: [
        {
          id,
          name,
          location,
          currentNumber: 0,
          lastNumber: 0,
          estimatedWait,
          isActive: true,
        },
        ...state.queues,
      ],
    }));
    return id;
  },
  takeNumber: (id) => {
    let issuedNumber: number | null = null;
    set((state) => ({
      queues: state.queues.map((queue) => {
        if (queue.id !== id || !queue.isActive) return queue;
        const nextNumber = queue.lastNumber + 1;
        issuedNumber = nextNumber;
        return { ...queue, lastNumber: nextNumber };
      }),
    }));
    return issuedNumber;
  },
  nextCustomer: (id) => {
    set((state) => ({
      queues: state.queues.map((queue) => {
        if (queue.id !== id) return queue;
        if (queue.currentNumber >= queue.lastNumber) return queue;
        return { ...queue, currentNumber: queue.currentNumber + 1 };
      }),
    }));
  },
  skipCustomer: (id) => {
    set((state) => ({
      queues: state.queues.map((queue) => {
        if (queue.id !== id) return queue;
        if (queue.currentNumber >= queue.lastNumber) return queue;
        return { ...queue, currentNumber: queue.currentNumber + 1 };
      }),
    }));
  },
  resetQueue: (id) => {
    set((state) => ({
      queues: state.queues.map((queue) =>
        queue.id === id ? { ...queue, currentNumber: 0, lastNumber: 0, isActive: true } : queue,
      ),
    }));
  },
  toggleQueue: (id) => {
    set((state) => ({
      queues: state.queues.map((queue) =>
        queue.id === id ? { ...queue, isActive: !queue.isActive } : queue,
      ),
    }));
  },
}));

export const getQueuePosition = (queue: Queue, ticketNumber: number | null) => {
  if (!ticketNumber) return 0;
  return Math.max(0, ticketNumber - queue.currentNumber);
};

export const getEstimatedWait = (queue: Queue, ticketNumber: number | null) => {
  const position = getQueuePosition(queue, ticketNumber);
  return position * queue.estimatedWait;
};

export const progressFromPosition = (queue: Queue, ticketNumber: number | null) => {
  if (!ticketNumber) return 0;
  if (ticketNumber <= queue.currentNumber) return 100;
  const distance = ticketNumber - queue.currentNumber;
  const span = Math.max(1, queue.lastNumber - queue.currentNumber + 1);
  return Math.max(8, Math.min(100, Math.round(100 - ((distance - 1) / span) * 100)));
};
