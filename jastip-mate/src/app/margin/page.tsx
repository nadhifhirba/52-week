"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";

export default function MarginPage() {
  const [cost, setCost] = useState("");
  const [profit, setProfit] = useState("");
  const [tax, setTax] = useState("");
  const [fee, setFee] = useState("2");

  const c = Number(cost) || 0;
  const p = Number(profit) || 0;
  const t = Number(tax) || 0;
  const f = Number(fee) || 0;

  const subtotal = c + t + p;
  const feeAmount = Math.round(subtotal * (f / 100));
  const total = subtotal + feeAmount;

  const formatIDR = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

  return (
    <div className="space-y-6">
      <h2 className="font-mono text-lg font-bold tracking-tight text-accent">Kalkulator Margin</h2>
      <p className="font-mono text-xs text-zinc-500">Hitung mundur: dari target keuntungan ke harga jual final.</p>

      <div className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        {[
          { label: "Harga Barang (IDR)", value: cost, set: setCost, hint: "Harga beli dalam rupiah" },
          { label: "Target Keuntungan (IDR)", value: profit, set: setProfit, hint: "Berapa untung yang diinginkan?" },
          { label: "Estimasi Pajak per Item (IDR)", value: tax, set: setTax, hint: "Dari kalkulator bea cukai" },
        ].map((field) => (
          <div key={field.label}>
            <label className="mb-1 block font-mono text-xs text-zinc-400">{field.label}</label>
            <input
              type="number"
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              placeholder={field.hint}
              className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
            />
          </div>
        ))}
        <div>
          <label className="mb-1 block font-mono text-xs text-zinc-400">Biaya Platform (%)</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-200 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {c > 0 && (
        <div className="rounded-lg border border-accent/30 bg-zinc-950 p-4 space-y-2">
          <div className="flex justify-between font-mono text-sm">
            <span className="text-zinc-400">Harga Barang</span>
            <span className="text-zinc-200">{formatIDR(c)}</span>
          </div>
          {t > 0 && (
            <div className="flex justify-between font-mono text-sm">
              <span className="text-zinc-400">Pajak</span>
              <span className="text-zinc-200">{formatIDR(t)}</span>
            </div>
          )}
          <div className="flex justify-between font-mono text-sm">
            <span className="text-zinc-400">Margin Keuntungan</span>
            <span className="text-green-400">{formatIDR(p)}</span>
          </div>
          {f > 0 && (
            <div className="flex justify-between font-mono text-sm">
              <span className="text-zinc-400">Biaya Platform ({f}%)</span>
              <span className="text-zinc-200">{formatIDR(feeAmount)}</span>
            </div>
          )}
          <hr className="border-zinc-800" />
          <div className="flex justify-between font-mono text-lg font-bold">
            <span className="text-accent">Harga Jual Final</span>
            <span className="text-accent">{formatIDR(total)}</span>
          </div>
          <p className="font-mono text-[10px] text-zinc-600 text-center mt-2">
            Quote harga ini ke pelanggan Anda
          </p>
        </div>
      )}
    </div>
  );
}
