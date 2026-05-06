import type { TaxItem } from "./store";

const EXCHANGE: Record<TaxItem["currency"], number> = {
  JPY: 0.0067,
  KRW: 0.00075,
  THB: 0.028,
  SGD: 0.74,
  USD: 1,
  MYR: 0.21,
};

const USD_TO_IDR = 16200;

export const CURRENCY_LABELS: Record<TaxItem["currency"], string> = {
  JPY: "¥ Yen Jepang",
  KRW: "₩ Won Korea",
  THB: "฿ Baht Thailand",
  SGD: "S$ Dolar Singapura",
  USD: "$ Dolar AS",
  MYR: "RM Ringgit Malaysia",
};

export function toUSD(price: number, currency: TaxItem["currency"]) {
  return price * EXCHANGE[currency];
}

export function totalUSD(items: TaxItem[]) {
  return items.reduce((sum, i) => sum + toUSD(i.price, i.currency), 0);
}

export function calculateTax(items: TaxItem[], hasNpwp: boolean) {
  const total = totalUSD(items);
  if (total <= 500) return { exceeds: false, totalUSD: total, taxIDR: 0, duty: 0, ppn: 0, pph: 0 };

  const excess = total - 500;
  const duty = excess * 0.1;
  const ppn = (excess + duty) * 0.11;
  const pphRate = hasNpwp ? 0.075 : 0.1;
  const pph = (excess + duty) * pphRate;
  const taxIDR = Math.round((duty + ppn + pph) * USD_TO_IDR);

  return {
    exceeds: true,
    totalUSD: Math.round(total * 100) / 100,
    taxIDR,
    duty: Math.round(duty * 100) / 100,
    ppn: Math.round(ppn * 100) / 100,
    pph: Math.round(pph * 100) / 100,
  };
}

export function progressPercent(items: TaxItem[]) {
  return Math.min(100, Math.round((totalUSD(items) / 500) * 100));
}
