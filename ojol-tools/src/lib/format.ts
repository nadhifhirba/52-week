export function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 1,
  }).format(value);
}
