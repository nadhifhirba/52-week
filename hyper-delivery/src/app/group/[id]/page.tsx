'use client';

import Link from 'next/link';
import type { FormEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Copy, Megaphone, PackagePlus, Send, ShoppingCart, Wallet, Users } from 'lucide-react';
import { buildWhatsAppSummary, calculateSplit, formatRupiah, useHyperDeliveryStore } from '@/lib/store';

export default function GroupDetailPage() {
  const params = useParams<{ id: string }>();
  const groupId = params.id;

  const group = useHyperDeliveryStore((state) => state.groups.find((entry) => entry.id === groupId));
  const startOrder = useHyperDeliveryStore((state) => state.startOrder);
  const updateDeliveryFee = useHyperDeliveryStore((state) => state.updateDeliveryFee);
  const addItem = useHyperDeliveryStore((state) => state.addItem);
  const completeOrder = useHyperDeliveryStore((state) => state.completeOrder);

  const [platform, setPlatform] = useState('GoFood');
  const [storeName, setStoreName] = useState('');
  const [deliveryFeeDraft, setDeliveryFeeDraft] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPerson, setItemPerson] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [status, setStatus] = useState('');

  const split = useMemo(() => (group?.activeOrder ? calculateSplit(group.activeOrder) : null), [group]);
  const summary = useMemo(() => {
    if (!group?.activeOrder) return '';
    return buildWhatsAppSummary(group, group.activeOrder);
  }, [group]);

  if (!group) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <p className="text-sm text-orange-300">Grup tidak ditemukan.</p>
        <Link href="/" className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-100">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke beranda
        </Link>
      </section>
    );
  }

  const handleStartOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startOrder(group.id, {
      platform,
      store: storeName.trim(),
      deliveryFee: Number(deliveryFeeDraft),
    });
    setStatus('Pesanan baru dimulai.');
    setStoreName('');
    setDeliveryFeeDraft('');
  };

  const handleAddItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addItem(group.id, {
      name: itemName.trim(),
      person: itemPerson.trim(),
      price: Number(itemPrice),
    });
    setItemName('');
    setItemPerson('');
    setItemPrice('');
    setStatus('Item ditambahkan ke pesanan.');
  };

  const handleFeeChange = (value: string) => {
    setDeliveryFeeDraft(value);
    if (group.activeOrder) {
      updateDeliveryFee(group.id, Number(value || 0));
    }
  };

  const waHref = summary ? `https://wa.me/?text=${encodeURIComponent(summary)}` : '#';

  return (
    <div className="space-y-6 pb-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-100">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Detail Grup</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{group.name}</h1>
              <p className="mt-2 text-base text-slate-300">{group.location}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-300">
              <Badge icon={<Users className="h-4 w-4" />} label={`${group.members.length} anggota`} />
              <Badge icon={<ShoppingCart className="h-4 w-4" />} label={group.activeOrder ? group.activeOrder.platform : 'Belum ada pesanan'} />
              <Badge icon={<Wallet className="h-4 w-4" />} label={group.activeOrder ? formatRupiah(group.activeOrder.deliveryFee) : 'Ongkir belum diisi'} />
            </div>
          </div>

          <div className="rounded-3xl border border-orange-500/20 bg-slate-950/80 p-4 lg:w-[360px]">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">Anggota grup</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.members.map((member) => (
                <span key={member} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-100">
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!group.activeOrder ? (
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={handleStartOrder} className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Mulai Order</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Buka pesanan baru untuk grup ini</h2>
              <p className="mt-2 text-sm text-slate-400">Isi platform, toko, dan ongkir awal supaya anggota bisa langsung menambahkan item.</p>
            </div>
            <div className="grid gap-3">
              <select
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40"
              >
                <option>GoFood</option>
                <option>GrabFood</option>
                <option>ShopeeFood</option>
                <option>Kurir Lokal</option>
              </select>
              <input
                value={storeName}
                onChange={(event) => setStoreName(event.target.value)}
                placeholder="Nama toko atau restoran"
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
              />
              <input
                value={deliveryFeeDraft}
                onChange={(event) => setDeliveryFeeDraft(event.target.value)}
                type="number"
                min="0"
                placeholder="Biaya antar"
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
              />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
              Mulai pesanan
              <PackagePlus className="h-4 w-4" />
            </button>
          </form>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Cara kerja</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Satu grup, satu ongkir, semua jelas</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">1. Buka pesanan baru dari grup ini.</li>
              <li className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">2. Tambahkan item masing-masing orang.</li>
              <li className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">3. Ongkir dibagi rata ke seluruh peserta yang order.</li>
              <li className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">4. Kirim ringkasan ke WhatsApp dan tandai selesai.</li>
            </ol>
          </div>
        </section>
      ) : (
        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Pesanan Aktif</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{group.activeOrder.store}</h2>
                  <p className="mt-1 text-sm text-slate-400">via {group.activeOrder.platform}</p>
                </div>
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-orange-200/80">Biaya antar</p>
                  <p className="mt-1 text-xl font-semibold text-white">{formatRupiah(group.activeOrder.deliveryFee)}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Stat label="Peserta" value={`${split?.participants.length ?? 0}`} />
                <Stat label="Total item" value={formatRupiah(split?.totalItems ?? 0)} />
                <Stat label="Total tagihan" value={formatRupiah(split?.grandTotal ?? 0)} />
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <form onSubmit={handleAddItem} className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Tambah Item</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Masukkan item per orang</h3>
                </div>
                <div className="grid gap-3">
                  <input
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                    placeholder="Nama item"
                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
                  />
                  <input
                    value={itemPerson}
                    onChange={(event) => setItemPerson(event.target.value)}
                    placeholder="Nama pemesan"
                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
                  />
                  <input
                    value={itemPrice}
                    onChange={(event) => setItemPrice(event.target.value)}
                    type="number"
                    min="0"
                    placeholder="Harga item"
                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-orange-500/40"
                  />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
                  Tambah item
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </form>

              <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Ongkir dibagi rata</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Update ongkir sesuai biaya terakhir</h3>
                </div>
                <label className="block space-y-2 text-sm text-slate-300">
                  <span className="text-slate-400">Delivery fee</span>
                  <input
                    value={deliveryFeeDraft || String(group.activeOrder.deliveryFee)}
                    onChange={(event) => handleFeeChange(event.target.value)}
                    type="number"
                    min="0"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40"
                  />
                </label>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                  <p className="font-medium text-white">Cara hitung</p>
                  <p className="mt-2 leading-6">Setiap orang membayar total itemnya + ongkir yang dibagi sama rata ke semua orang yang punya item di pesanan ini.</p>
                </div>
                <button
                  type="button"
                  onClick={() => completeOrder(group.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-500/30 hover:bg-orange-500/10"
                >
                  Selesaiin order
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Rincian tagihan</p>
              <div className="mt-4 space-y-3">
                {(split?.breakdown ?? []).map((row) => (
                  <div key={row.person} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">{row.person}</p>
                      <p className="text-sm text-orange-300">{formatRupiah(row.total)}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="rounded-full border border-white/10 px-2.5 py-1">Item {formatRupiah(row.itemTotal)}</span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1">Ongkir {formatRupiah(row.deliveryShare)}</span>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      {row.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2">
                          <span>{item.name}</span>
                          <span className="text-orange-300">{formatRupiah(item.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-orange-300/80">Pesan WhatsApp</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Ringkasan siap kirim</h3>
                </div>
                <Megaphone className="h-6 w-6 text-orange-300" />
              </div>
              <textarea
                readOnly
                value={summary}
                className="mt-4 min-h-64 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-200 outline-none"
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={waHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
                  Pesen Bareng
                  <Send className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(summary).then(() => setStatus('Ringkasan disalin ke clipboard.'))}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-500/30 hover:bg-orange-500/10"
                >
                  Salin ringkasan
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {status ? <p className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-100">{status}</p> : null}
    </div>
  );
}

function Badge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
      {icon}
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
