"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { seedEvents, type EventItem } from "./seed";

type EventInput = Omit<EventItem, "createdAt"> & { createdAt?: string };

type EventStore = {
  events: EventItem[];
  saved: string[];
  addEvent: (event: EventInput) => void;
  removeEvent: (id: string) => void;
  updateEvent: (id: string, updates: Partial<Omit<EventItem, "id" | "createdAt">>) => void;
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const now = () => new Date().toISOString();

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: seedEvents,
      saved: [],
      addEvent: (event) =>
        set((state) => ({
          events: [
            {
              ...event,
              createdAt: event.createdAt ?? now(),
            },
            ...state.events,
          ],
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((item) => item.id !== id),
          saved: state.saved.filter((savedId) => savedId !== id),
        })),
      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...updates,
                }
              : item,
          ),
        })),
      toggleSave: (id) => {
        const { saved } = get();
        set({
          saved: saved.includes(id) ? saved.filter((savedId) => savedId !== id) : [...saved, id],
        });
      },
      isSaved: (id) => get().saved.includes(id),
    }),
    {
      name: "besok-libur-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        events: state.events,
        saved: state.saved,
      }),
    },
  ),
);
