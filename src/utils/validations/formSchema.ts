import { z } from 'zod';

export const negaraSchema = z.object({
  id_negara: z.number(),
  kode_negara: z.string(),
  nama_negara: z.string(),
});

export const pelabuhanSchema = z.object({
  id_pelabuhan: z.string(),
  nama_pelabuhan: z.string(),
  id_negara: z.string(),
});

export const barangSchema = z.object({
  id_barang: z.number(),
  nama_barang: z.string(),
  id_pelabuhan: z.number(),
  description: z.string(),
  diskon: z.number(),
  harga: z.number(),
});

export const formSchema = z.object({
  negara: negaraSchema.nullable(),
  pelabuhan: pelabuhanSchema.nullable(),
  barang: barangSchema.nullable(),
  deskripsi: z.string(),
  diskon: z.number(),
  harga: z.number(),
  total: z.number(),
});

export type FormValues = z.infer<typeof formSchema>;
