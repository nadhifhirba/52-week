"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SavedDocument = {
  id: string;
  templateId: string;
  templateName: string;
  fields: Record<string, string>;
  createdAt: string;
};

type StoreState = {
  documents: SavedDocument[];
  addDocument: (document: Omit<SavedDocument, "id" | "createdAt"> & { id?: string; createdAt?: string }) => string;
  removeDocument: (id: string) => void;
  updateDocument: (id: string, updates: Partial<Pick<SavedDocument, "templateId" | "templateName" | "fields">>) => void;
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `doc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

export const useDocumentStore = create<StoreState>()(
  persist(
    (set, get) => ({
      documents: [],
      addDocument: (document) => {
        const id = document.id ?? createId();
        const createdAt = document.createdAt ?? new Date().toISOString();
        const newDocument: SavedDocument = {
          id,
          templateId: document.templateId,
          templateName: document.templateName,
          fields: document.fields,
          createdAt,
        };
        set({ documents: [newDocument, ...get().documents.filter((item) => item.id !== id)] });
        return id;
      },
      removeDocument: (id) => set({ documents: get().documents.filter((document) => document.id !== id) }),
      updateDocument: (id, updates) =>
        set({
          documents: get().documents.map((document) =>
            document.id === id
              ? {
                  ...document,
                  ...(updates.templateId ? { templateId: updates.templateId } : {}),
                  ...(updates.templateName ? { templateName: updates.templateName } : {}),
                  ...(updates.fields ? { fields: updates.fields } : {}),
                }
              : document,
          ),
        }),
    }),
    {
      name: "surat-menyurat-documents",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
