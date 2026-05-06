import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TaxItem {
  id: string;
  name: string;
  currency: "JPY" | "KRW" | "THB" | "SGD" | "USD" | "MYR";
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  itemName: string;
  variant: string;
  quantity: number;
  price: number;
  currency: "JPY" | "KRW" | "THB" | "SGD" | "USD" | "MYR";
  jastipFee: number;
  status: "pending" | "purchased" | "delivered";
  createdAt: number;
}

interface AppState {
  taxItems: TaxItem[];
  orders: Order[];
  npwp: boolean;
  addTaxItem: (item: TaxItem) => void;
  removeTaxItem: (id: string) => void;
  clearTaxItems: () => void;
  toggleNpwp: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  removeOrder: (id: string) => void;
  clearOrders: () => void;
}

let idCounter = Date.now();
const uid = () => `${++idCounter}`;

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      taxItems: [],
      orders: [],
      npwp: false,
      addTaxItem: (item) =>
        set((s) => ({ taxItems: [...s.taxItems, { ...item, id: uid() }] })),
      removeTaxItem: (id) =>
        set((s) => ({ taxItems: s.taxItems.filter((i) => i.id !== id) })),
      clearTaxItems: () => set({ taxItems: [] }),
      toggleNpwp: () => set((s) => ({ npwp: !s.npwp })),
      addOrder: (order) =>
        set((s) => ({ orders: [...s.orders, { ...order, id: uid() }] })),
      updateOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      removeOrder: (id) =>
        set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
      clearOrders: () => set({ orders: [] }),
    }),
    { name: "jastip-mate" }
  )
);
