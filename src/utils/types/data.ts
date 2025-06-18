export interface Negara {
  id_negara: number;
  kode_negara: string;
  nama_negara: string;
}

export interface Pelabuhan {
  id_pelabuhan: string;
  nama_pelabuhan: string;
  id_negara: string;
}

export interface Barang {
  id_barang: number;
  nama_barang: string;
  id_pelabuhan: number;
  description: string;
  diskon: number;
  harga: number;
}

export interface FormData {
  negara: Negara | null;
  pelabuhan: Pelabuhan | null;
  barang: Barang | null;
  deskripsi: string;
  diskon: number;
  harga: number;
  total: number;
}