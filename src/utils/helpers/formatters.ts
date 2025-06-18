export const formatCurrency = (value: number): string => {
  return `Rp. ${value.toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};

export const hitungTotal = (harga: number, diskon: number): number => {
  const diskonDecimal = diskon / 100;
  return harga - (harga * diskonDecimal);
};