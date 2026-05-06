"use client";

import { useStore } from "@/lib/store";
import { CURRENCY_LABELS } from "@/lib/tax";
import { FileText, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function SummaryPage() {
  const { orders } = useStore();
  const [copied, setCopied] = useState(false);

  const grouped = orders.reduce((acc, o) => {
    if (!acc[o.customerName]) acc[o.customerName] = [];
    acc[o.customerName].push(o);
    return acc;
  }, {} as Record<string, typeof orders>);

  const customers = Object.entries(grouped);

  const generateText = () => {
    let text = "📦 RINGKASAN PESANAN JASTIP\n\n";
    for (const [name, items] of customers) {
      let total = 0;
      text += `👤 ${name}\n`;
      for (const item of items) {
        const itemTotal = item.price * item.quantity + item.jastipFee;
        total += itemTotal;
        text += `  • ${item.itemName}${item.variant ? ` (${item.variant})` : ""} ×${item.quantity} — ${item.price.toLocaleString()} ${item.currency} + Fee Rp ${item.jastipFee.toLocaleString("id-ID")}\n`;
      }
      text += `  💰 Total: Rp ${total.toLocaleString("id-ID")}\n\n`;
    }
    return text;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (customers.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="font-mono text-lg font-bold tracking-tight text-accent">Ringkasan Perjalanan</h2>
        <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/30 p-8 text-center">
          <FileText className="mx-auto mb-3 h-10 w-10 text-zinc-700" />
          <p className="font-mono text-sm text-zinc-500">Belum ada pesanan. Tambahkan pesanan dulu di halaman Manajer Pesanan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-lg font-bold tracking-tight text-accent">Ringkasan Perjalanan</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded bg-accent px-3 py-2 font-mono text-xs font-bold text-black hover:bg-accent-light transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Tersalin!" : "Salin WhatsApp"}
        </button>
      </div>

      {customers.map(([name, items]) => {
        const total = items.reduce((s, i) => s + i.price * i.quantity + i.jastipFee, 0);
        return (
          <div key={name} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <h3 className="font-mono text-sm font-bold text-zinc-200 mb-3">👤 {name}</h3>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between font-mono text-xs text-zinc-400">
                  <span>
                    {item.itemName}{item.variant ? ` (${item.variant})` : ""} ×{item.quantity}
                    <span className="ml-2 text-zinc-600">
                      {item.price.toLocaleString()} {item.currency} + Fee Rp {item.jastipFee.toLocaleString("id-ID")}
                    </span>
                  </span>
                  <span className="text-zinc-300">Rp {(item.price * item.quantity + item.jastipFee).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
            <hr className="my-2 border-zinc-800" />
            <div className="flex justify-between font-mono text-sm font-bold">
              <span className="text-accent">Total</span>
              <span className="text-accent">Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
