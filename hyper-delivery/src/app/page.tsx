'use client';

import Link from 'next/link';
import { useState, useMemo, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Clock3, MapPinHouse, PlusCircle, Users, Truck } from 'lucide-react';
import { formatRupiah, useHyperDeliveryStore, calculateSplit } from '@/lib/store';

export default function HomePage() {
  const groups = useHyperDeliveryStore((s) => s.groups);
  const createGroup = useHyperDeliveryStore((s) => s.createGroup);
  const joinGroup = useHyperDeliveryStore((s) => s.joinGroup);

  const [name, setName] = useState(''); const [loc, setLoc] = useState('');
  const [creator, setCreator] = useState('');
  const [joinId, setJoinId] = useState(''); const [joinName, setJoinName] = useState('');
  const [notice, setNotice] = useState('');

  const metrics = useMemo(() => ({
    activeOrders: groups.filter(g => g.activeOrder).length,
    members: groups.reduce((s,g) => s + g.members.length, 0),
    openGroups: groups.filter(g => !g.activeOrder).length,
    totalFees: groups.reduce((s,g) => s + (g.activeOrder?.deliveryFee ?? 0), 0),
  }), [groups]);

  const handleCreate = (e: FormEvent) => { e.preventDefault(); if(!name||!creator) return; createGroup(name, loc, creator); setName(''); setLoc(''); setCreator(''); setNotice('Grup dibuat!'); };
  const handleJoin = (e: FormEvent) => { e.preventDefault(); if(!joinId||!joinName) return; joinGroup(joinId, joinName); setJoinId(''); setJoinName(''); setNotice('Bergabung!'); };

  return (
    <div className="space-y-8">
      {/* Hero stats */}
      <section className="grid gap-4 sm:grid-cols-4">
        {[
          { label:'Orders Aktif', value:metrics.activeOrders, icon:Truck, color:'#FF6B35' },
          { label:'Anggota', value:metrics.members, icon:Users, color:'#3B82F6' },
          { label:'Grup Terbuka', value:metrics.openGroups, icon:MapPinHouse, color:'#22C55E' },
          { label:'Total Ongkir', value:formatRupiah(metrics.totalFees), icon:ArrowRight, color:'#F59E0B' },
        ].map(s=>{const I=s.icon;return(
          <div key={s.label} className="delivery-card text-center">
            <I size={20} className="mx-auto mb-2" style={{color:s.color}} />
            <div className="text-2xl font-bold text-[#E2E8F0]" style={{fontFamily:"var(--font-outfit)"}}>{s.value}</div>
            <div className="text-[10px] text-[#94A3B8] uppercase tracking-[0.1em] mt-1">{s.label}</div>
          </div>
        )})}
      </section>

      {/* Create + Join */}
      <section className="grid gap-6 sm:grid-cols-2">
        <form onSubmit={handleCreate} className="delivery-card space-y-3">
          <h2 className="text-lg font-bold" style={{fontFamily:"var(--font-outfit)"}}><PlusCircle size={16} className="inline mr-1.5 text-[#FF6B35]" />Buat Grup</h2>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nama grup" className="w-full rounded-lg border border-[#2D3A5C]/30 bg-[#1A1F36] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#FF6B35]/50 focus:outline-none" />
          <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Lokasi pengiriman" className="w-full rounded-lg border border-[#2D3A5C]/30 bg-[#1A1F36] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#FF6B35]/50 focus:outline-none" />
          <input value={creator} onChange={e=>setCreator(e.target.value)} placeholder="Nama Anda" className="w-full rounded-lg border border-[#2D3A5C]/30 bg-[#1A1F36] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#FF6B35]/50 focus:outline-none" />
          <button type="submit" className="w-full rounded-lg bg-[#FF6B35] py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-600">Buat Grup</button>
        </form>

        <form onSubmit={handleJoin} className="delivery-card space-y-3">
          <h2 className="text-lg font-bold" style={{fontFamily:"var(--font-outfit)"}}><Users size={16} className="inline mr-1.5 text-[#3B82F6]" />Gabung Grup</h2>
          <input value={joinId} onChange={e=>setJoinId(e.target.value)} placeholder="ID Grup" className="w-full rounded-lg border border-[#2D3A5C]/30 bg-[#1A1F36] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#3B82F6]/50 focus:outline-none" />
          <input value={joinName} onChange={e=>setJoinName(e.target.value)} placeholder="Nama Anda" className="w-full rounded-lg border border-[#2D3A5C]/30 bg-[#1A1F36] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#3B82F6]/50 focus:outline-none" />
          <button type="submit" className="w-full rounded-lg bg-[#3B82F6] py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-600">Gabung</button>
        </form>
        {notice && <div className="col-span-full rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 px-4 py-3 text-sm text-[#22C55E] flex items-center gap-2"><CheckCircle2 size={14} />{notice}</div>}
      </section>

      {/* Groups list */}
      <section>
        <h2 className="mb-4 text-lg font-bold" style={{fontFamily:"var(--font-outfit)"}}>Grup Aktif</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(g=>(
            <Link key={g.id} href={`/group/${g.id}`} className="delivery-card group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold">{g.name}</h3>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${g.activeOrder?'bg-[#FF6B35]/10 text-[#FF6B35]':'bg-[#22C55E]/10 text-[#22C55E]'}`}>
                  {g.activeOrder?'Ordering':'Open'}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-[#94A3B8]">
                <span className="flex items-center gap-1.5"><Users size={11}/>{g.members.length} anggota</span>
                {g.activeOrder&&<span className="flex items-center gap-1.5"><Truck size={11}/>Ongkir: {formatRupiah(g.activeOrder.deliveryFee)}</span>}
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#FF6B35] opacity-0 transition-opacity group-hover:opacity-100">Buka <ArrowRight size={11}/></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
