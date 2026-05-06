export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);

export const formatDistance = (value: number) => `${value.toFixed(1)} km`;

export const pricePerYear = (value: number) => value * 12;

export const waLink = (phone: string, name: string) =>
  `https://wa.me/62${phone.replace(/^0/, '').replace(/\D/g, '')}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan ${name}. Masih tersedia?`
  )}`;
