'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { workshopsSeed } from './seed';

export type Workshop = {
  id: string;
  title: string;
  mentor: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  maxParticipants: number;
  enrolled: number;
  date: string;
  time: string;
  location: string;
  image: string;
  tags: string[];
};

export type Booking = {
  id: string;
  workshopId: string;
  title: string;
  mentor: string;
  category: string;
  price: number;
  date: string;
  time: string;
  location: string;
  bookedAt: string;
};

export type WorkshopInput = Omit<
  Workshop,
  'id' | 'enrolled'
> & {
  tags: string[];
};

type SkillStore = {
  workshops: Workshop[];
  bookings: Booking[];
  enrollWorkshop: (workshopId: string) => { success: boolean; message: string };
  createWorkshop: (workshop: WorkshopInput) => string;
};

const createId = (title: string) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

  return `${slug || 'workshop'}-${crypto.randomUUID().slice(0, 8)}`;
};

export const useSkillStore = create<SkillStore>()(
  persist(
    (set, get) => ({
      workshops: workshopsSeed,
      bookings: [],
      enrollWorkshop: (workshopId) => {
        const workshop = get().workshops.find((item) => item.id === workshopId);

        if (!workshop) {
          return { success: false, message: 'Workshop tidak ditemukan.' };
        }

        const alreadyBooked = get().bookings.some((booking) => booking.workshopId === workshopId);
        if (alreadyBooked) {
          return { success: false, message: 'Kamu sudah terdaftar di workshop ini.' };
        }

        if (workshop.enrolled >= workshop.maxParticipants) {
          return { success: false, message: 'Kuota workshop sudah penuh.' };
        }

        const booking: Booking = {
          id: crypto.randomUUID(),
          workshopId: workshop.id,
          title: workshop.title,
          mentor: workshop.mentor,
          category: workshop.category,
          price: workshop.price,
          date: workshop.date,
          time: workshop.time,
          location: workshop.location,
          bookedAt: new Date().toISOString(),
        };

        set((state) => ({
          workshops: state.workshops.map((item) =>
            item.id === workshopId ? { ...item, enrolled: item.enrolled + 1 } : item,
          ),
          bookings: [booking, ...state.bookings],
        }));

        return { success: true, message: 'Pendaftaran berhasil disimpan.' };
      },
      createWorkshop: (workshop) => {
        const id = createId(workshop.title);
        const newWorkshop: Workshop = {
          ...workshop,
          id,
          enrolled: 0,
        };

        set((state) => ({
          workshops: [newWorkshop, ...state.workshops],
        }));

        return id;
      },
    }),
    {
      name: 'skill-sharing-marketplace',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
