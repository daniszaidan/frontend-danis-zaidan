import { useQuery } from '@tanstack/react-query';
import { fetchBarang, fetchNegara, fetchPelabuhan } from '@/services/api';
import { Barang, Negara, Pelabuhan } from '@/utils/types/data';

export const useNegaraQuery = () => {
  return useQuery<Negara[], Error>({
    queryKey: ['negara'],
    queryFn: fetchNegara,
  });
};

export const usePelabuhanQuery = (idNegara: number | null) => {
  return useQuery<Pelabuhan[], Error>({
    queryKey: ['pelabuhan', idNegara],
    queryFn: () => fetchPelabuhan(idNegara as number),
    enabled: !!idNegara,
  });
};

export const useBarangQuery = (idPelabuhan: number | null) => {
  return useQuery<Barang[], Error>({
    queryKey: ['barang', idPelabuhan],
    queryFn: () => fetchBarang(idPelabuhan as number),
    enabled: !!idPelabuhan,
  });
};