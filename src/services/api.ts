import axios from 'axios';
import { Barang, Negara, Pelabuhan } from '@/utils/types/data';

const API_BASE_URL = 'http://202.157.176.100:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchNegara = async (): Promise<Negara[]> => {
  const response = await api.get<Negara[]>('/negaras');
  return response.data;
};

export const fetchPelabuhan = async (idNegara: number): Promise<Pelabuhan[]> => {
  const filter = JSON.stringify({ where: { id_negara: idNegara } });
  const response = await api.get<Pelabuhan[]>(`/pelabuhans?filter=${filter}`);
  return response.data;
};

export const fetchBarang = async (idPelabuhan: number): Promise<Barang[]> => {
  const filter = JSON.stringify({ where: { id_pelabuhan: idPelabuhan } });
  const response = await api.get<Barang[]>(`/barangs?filter=${filter}`);
  return response.data;
};

export default api;