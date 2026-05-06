"use client";

import { useState } from "react";
import { Plus, Search, X, ShoppingBag, Truck, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Order } from "@/lib/store";
import { CURRENCY_LABELS } from "@/lib/tax";

const statusIcons = {
  pending: { icon: ShoppingBag, label: "Pending", cls: "text-yellow-400 bg-yellow-400/10" },
  purchased: { icon: CheckCircle2, label: "Dibeli", cls: "text-blue-400 bg-blue-400/10" },
  delivered: { icon: Truck, label: "Diantar", cls: "text-green-400 bg-green-400/10" },
};

const statusFlow: Order["status"][] = ["pending", "purchased", "delivered"];

export default function OrdersPage() {
  const { orders, addOrder, updateOrderStatus, removeOrder } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Order["status"] | "all">("all");

  const [form, setForm] = useState({
    customerName: "", itemName: "", variant: "", quantity: "1",
    price: "", currency: "JPY" as Order["currency"], jastipFee: "",
  });

  const handleAdd = () => {
    if (!form.customerName || !form.itemName || !form.price) return;
    addOrder({
      id: "", customerName: form.customerName, itemName: form.itemName,
      variant: form.variant, quantity: Number(form.quantity) || 1,
      price: Number(form.price), currency: form.currency,
      jastipFee: Number(form.jastipFee) || 0, status: "pending", createdAt: Date.now(),
    });
    setForm({ customerName: "", itemName: "", variant: "", quantity: "1", price: "", currency: "JPY", jastipFee: "" });
    setShowForm(false);
  };

  const toggleStatus = (order: Order) => {
    const idx = statusFlow.indexOf(order.status);
    if (idx < statusFlow.length - 1) updateOrderStatus(order.id, statusFlow[idx + 1]);
  };

  const filtered = orders
    .filter((o) => (filter === "all" ? true : o.status === filter))
    .filter((o) => o.customerName.toLowerCase().includes(search.toLowerCase()) || o.itemName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-lg font-bold tracking-tight text-accent">Manajer Pesanan</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 rounded bg-accent px-3 py-2 font-mono text-xs font-bold text-black hover:bg-accent-light transition-colors">
          <Plus className="h-4 w-4" /> Pesanan Baru
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} placeholder="Nama Pelanggan" className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none" />
            <input value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} placeholder="Nama Barang" className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none" />
            <input value={form.variant} onChange={(e) => setForm({ ...form, variant: e.target.value })} placeholder="Varian (warna, ukuran)" className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none" />
            <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} type="number" placeholder="Jumlah" className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} type="number" placeholder="Harga (mata uang asing)" className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none" />
            <select value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value as Order["currency"] })} className="rounded border border-zinc-700 bg-zinc-950 px-2 py-2 font-mono text-sm text-zinc-200 focus:border-accent focus:outline-none">
              {Object.entries(CURRENCY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <input value={form.jastipFee} onChange={(e) => setForm({ ...form, jastipFee: e.target.value })} type="number" placeholder="Fee Jastip (IDR)" className="rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="rounded bg-accent px-4 py-2 font-mono text-xs font-bold text-black hover:bg-accent-light transition-colors">Simpan</button>
            <button onClick={() => setShowForm(false)} className="rounded border border-zinc-700 px-4 py-2 font-mono text-xs text-zinc-400 hover:text-zinc-200 transition-colors">Batal</button>
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari pelanggan atau barang..." className="w-full rounded border border-zinc-700 bg-zinc-900 pl-9 pr-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as Order["status"] | "all")} className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-200 focus:border-accent focus:outline-none">
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="purchased">Dibeli</option>
          <option value="delivered">Diantar</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 p-8 text-center">
          <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-zinc-700" />
          <p className="font-mono text-sm text-zinc-500">{orders.length === 0 ? "Belum ada pesanan." : "Tidak ada hasil."}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((order) => {
            const S = statusIcons[order.status];
            return (
              <div key={order.id} className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-900/50 px-4 py-3 hover:border-zinc-700 transition-colors cursor-pointer" onClick={() => toggleStatus(order)}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-zinc-200 truncate">{order.customerName}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] ${S.cls}`}>
                      <S.icon className="h-3 w-3" /> {S.label}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-xs text-zinc-500 truncate">
                    {order.itemName}{order.variant ? ` — ${order.variant}` : ""} ×{order.quantity} • {order.price.toLocaleString()} {order.currency}
                    {order.jastipFee > 0 && ` • Fee Rp ${order.jastipFee.toLocaleString("id-ID")}`}
                  </p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeOrder(order.id); }} className="ml-2 text-zinc-600 hover:text-red-500 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-center font-mono text-[10px] text-zinc-700">Tap kartu pesanan untuk ubah status: Pending → Dibeli → Diantar</p>
    </div>
  );
}
