"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { seedPlaces, seedVotes } from "./seed";

export type Place = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  address: string;
  lat: number;
  lng: number;
  priceRange: 1 | 2 | 3 | 4;
  rating: number;
  imageUrl: string;
  submittedBy: string;
  createdAt: string;
};

type PlaceInput = Omit<Place, "id" | "createdAt"> & {
  id?: string;
  createdAt?: string;
};

type FoodStore = {
  places: Place[];
  votes: Record<string, number>;
  addPlace: (place: PlaceInput) => Place;
  removePlace: (id: string) => void;
  updatePlace: (id: string, updates: Partial<Omit<Place, "id" | "createdAt">>) => void;
  vote: (id: string) => void;
  unvote: (id: string) => void;
};

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `place-${Date.now()}`;
}

export const useFoodStore = create<FoodStore>()(
  persist(
    (set, get) => ({
      places: seedPlaces,
      votes: seedVotes,
      addPlace: (place) => {
        const newPlace: Place = {
          ...place,
          id: place.id ?? makeId(),
          createdAt: place.createdAt ?? new Date().toISOString(),
          priceRange: Math.min(4, Math.max(1, place.priceRange)) as 1 | 2 | 3 | 4,
          rating: Math.min(5, Math.max(1, Math.round(place.rating || 4))),
          tags: Array.from(new Set(place.tags)),
        };

        set((state) => ({
          places: [newPlace, ...state.places],
          votes: {
            ...state.votes,
            [newPlace.id]: state.votes[newPlace.id] ?? 0,
          },
        }));

        return newPlace;
      },
      removePlace: (id) =>
        set((state) => ({
          places: state.places.filter((place) => place.id !== id),
          votes: Object.fromEntries(Object.entries(state.votes).filter(([placeId]) => placeId !== id)),
        })),
      updatePlace: (id, updates) =>
        set((state) => ({
          places: state.places.map((place) =>
            place.id === id
              ? {
                  ...place,
                  ...updates,
                  tags: updates.tags ? Array.from(new Set(updates.tags)) : place.tags,
                  priceRange: updates.priceRange ? (Math.min(4, Math.max(1, updates.priceRange)) as 1 | 2 | 3 | 4) : place.priceRange,
                  rating: typeof updates.rating === "number" ? Math.min(5, Math.max(1, updates.rating)) : place.rating,
                }
              : place,
          ),
        })),
      vote: (id) =>
        set((state) => ({
          votes: {
            ...state.votes,
            [id]: (state.votes[id] ?? 0) + 1,
          },
        })),
      unvote: (id) =>
        set((state) => ({
          votes: {
            ...state.votes,
            [id]: Math.max(0, (state.votes[id] ?? 0) - 1),
          },
        })),
    }),
    {
      name: "warung-makan-by-feeling",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ places: state.places, votes: state.votes }),
      version: 1,
    },
  ),
);

export const selectPlaceById = (state: FoodStore, id: string) => state.places.find((place) => place.id === id);

export const usePlaceById = (id: string) => useFoodStore((state) => state.places.find((place) => place.id === id));
