'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, formSchema } from '@/utils/validations/formSchema';
import { useState, useEffect } from 'react';
import { Barang, Negara, Pelabuhan } from '@/utils/types/data';
import { hitungTotal } from '@/utils/helpers/formatters';

import NegaraInput from '../molecules/NegaraInput';
import PelabuhanInput from '../molecules/PelabuhanInput';
import BarangInput from '../molecules/BarangInput';
import DeskripsiInput from '../molecules/DeskripsiInput';
import DiskonInput from '../molecules/DiskonInput';
import HargaInput from '../molecules/HargaInput';
import TotalInput from '../molecules/TotalInput';

export default function ProductForm() {
  const [selectedNegara, setSelectedNegara] = useState<Negara | null>(null);
  const [selectedPelabuhan, setSelectedPelabuhan] = useState<Pelabuhan | null>(
    null
  );
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);

  const defaultValues = {
    negara: null,
    pelabuhan: null,
    barang: null,
    deskripsi: '',
    diskon: 0,
    harga: 0,
    total: 0,
  };

  const { control, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!selectedNegara) {
      setSelectedPelabuhan(null);
      setValue('pelabuhan', null);
    }
  }, [selectedNegara, setValue]);

  useEffect(() => {
    if (!selectedPelabuhan) {
      setSelectedBarang(null);
      setValue('barang', null);
    }
  }, [selectedPelabuhan, setValue]);

  useEffect(() => {
    if (selectedBarang) {
      setValue('deskripsi', selectedBarang.description);
      setValue('diskon', selectedBarang.diskon);
      setValue('harga', selectedBarang.harga);
      setValue(
        'total',
        hitungTotal(selectedBarang.harga, selectedBarang.diskon)
      );
    } else {
      setValue('deskripsi', '');
      setValue('diskon', 0);
      setValue('harga', 0);
      setValue('total', 0);
    }
  }, [selectedBarang, setValue]);

  const handleReset = () => {
    reset(defaultValues);

    setSelectedNegara(null);
    setSelectedPelabuhan(null);
    setSelectedBarang(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Form Produk</h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors cursor-pointer"
          >
            Print
          </button>
        </div>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <NegaraInput control={control} onSelect={setSelectedNegara} />
          </div>

          <div className="md:col-span-1">
            <PelabuhanInput
              control={control}
              selectedNegara={selectedNegara}
              onSelect={setSelectedPelabuhan}
            />
          </div>
        </div>

        <BarangInput
          control={control}
          selectedPelabuhan={selectedPelabuhan}
          onSelect={setSelectedBarang}
        />

        <DeskripsiInput control={control} selectedBarang={selectedBarang} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <DiskonInput control={control} selectedBarang={selectedBarang} />
          </div>

          <div className="md:col-span-1">
            <HargaInput control={control} selectedBarang={selectedBarang} />
          </div>

          <div className="md:col-span-1">
            <TotalInput control={control} selectedBarang={selectedBarang} />
          </div>
        </div>
      </form>
    </div>
  );
}
