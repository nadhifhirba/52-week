"use client";

import { useState } from "react";
import { Plus, Trash2, Receipt } from "lucide-react";
import { useStore } from "@/lib/store";
import { calculateTax, progressPercent, CURRENCY_LABELS, toUSD } from "@/lib/tax";
import type { TaxItem } from "@/lib/store";

const currencies = Object.keys(CURRENCY_LABELS) as TaxItem["currency"][];

export default function CalculatorPage() {
  const { taxItems, addTaxItem, removeTaxItem, clearTaxItems, npwp, toggleNpwp } = useStore();
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState<TaxItem["currency"]>("JPY");
  const [price, setPrice] = useState("");

  const pct = progressPercent(taxItems);
  const tax = calculateTax(taxItems, npwp);

  const handleAdd = () => {
    if (!name.trim() || !price) return;
    addTaxItem({ id: "", name: name.trim(), currency, price: Number(price) });
    setName("");
    setPrice("");
  };

  const formatUSD = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatIDR = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <div className="space-y-6">
      <h2 className="font-mono text-lg font-bold tracking-tight text-accent">Kalkulator Bea Cukai</h2>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex flex-wrap gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Nama barang..."
            className="flex-1 rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as TaxItem["currency"])}
            className="rounded border border-zinc-700 bg-zinc-950 px-2 py-2 font-mono text-sm text-zinc-200 focus:border-accent focus:outline-none"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Harga"
            type="number"
            className="w-28 rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 rounded bg-accent px-3 py-2 font-mono text-xs font-bold text-black hover:bg-accent-light transition-colors"
          >
            <Plus className="h-4 w-4" /> Tambah
          </button>
        </div>
      </div>

      {taxItems.length > 0 && (
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-2 flex justify-between font-mono text-xs text-zinc-500">
              <span>Batas $500</span>
              <span>{formatUSD(tax.totalUSD)} / $500</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  pct < 80 ? "bg-green-500" : pct < 100 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {taxItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-900/50 px-3 py-2"
              >
                <div>
                  <span className="font-mono text-sm text-zinc-300">{item.name}</span>
                  <span className="ml-2 font-mono text-xs text-zinc-500">
                    {item.price.toLocaleString()} {item.currency} → {formatUSD(toUSD(item.price, item.currency))}
                  </span>
                </div>
                <button onClick={() => removeTaxItem(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
            <label className="flex cursor-pointer items-center gap-2 font-mono text-xs text-zinc-400">
              <input type="checkbox" checked={npwp} onChange={toggleNpwp} className="accent-accent" />
              Punya NPWP (PPh 7.5%)
            </label>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-2">
            <div className="flex justify-between font-mono text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-zinc-200">{formatUSD(tax.totalUSD)}</span>
            </div>
            {tax.exceeds && (
              <>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">Bea Masuk (10%)</span>
                  <span className="text-zinc-200">{formatUSD(tax.duty)}</span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">PPN (11%)</span>
                  <span className="text-zinc-200">{formatUSD(tax.ppn)}</span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-zinc-400">PPh ({npwp ? "7.5" : "10"}%)</span>
                  <span className="text-zinc-200">{formatUSD(tax.pph)}</span>
                </div>
                <hr className="border-zinc-800" />
                <div className="flex justify-between font-mono text-base font-bold">
                  <span className="text-accent">Estimasi Pajak</span>
                  <span className="text-accent">{formatIDR(tax.taxIDR)}</span>
                </div>
              </>
            )}
            <div className={`mt-2 rounded px-3 py-2 text-center font-mono text-sm font-bold ${tax.exceeds ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
              {tax.exceeds ? "⚠ MELEBIHI BATAS $500 — SIAPKAN BEA CUKAI" : "✓ AMAN — MASIH DI BAWAH BATAS $500"}
            </div>
          </div>

          {taxItems.length > 0 && (
            <button
              onClick={clearTaxItems}
              className="flex w-full items-center justify-center gap-2 rounded border border-zinc-700 px-4 py-2 font-mono text-xs text-zinc-500 hover:text-red-400 hover:border-red-800 transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Hapus Semua
            </button>
          )}
        </div>
      )}

      {taxItems.length === 0 && (
        <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 p-8 text-center">
          <Receipt className="mx-auto mb-3 h-10 w-10 text-zinc-700" />
          <p className="font-mono text-sm text-zinc-500">Belum ada barang. Tambahkan barang jastip Anda di atas.</p>
        </div>
      )}
    </div>
  );
}
