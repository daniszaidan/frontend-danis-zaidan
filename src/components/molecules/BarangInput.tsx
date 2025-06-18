'use client';

import { useBarangQuery } from '@/hooks/useApiQueries';
import { Barang, Pelabuhan } from '@/utils/types/data';
import AutocompleteInput from '../atoms/AutocompleteInput';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '@/utils/validations/formSchema';

interface BarangInputProps {
  control: Control<FormValues>;
  selectedPelabuhan: Pelabuhan | null;
  onSelect: (barang: Barang | null) => void;
}

export default function BarangInput({ 
  control, 
  selectedPelabuhan, 
  onSelect 
}: BarangInputProps) {
  const { 
    data: barangList, 
    isLoading, 
    isError 
  } = useBarangQuery(selectedPelabuhan ? Number(selectedPelabuhan.id_pelabuhan) : null);

  const getBarangLabel = (barang: Barang) => {
    return `${barang.id_barang} - ${barang.nama_barang}`;
  };

  return (
    <Controller
      name="barang"
      control={control}
      render={({ field }) => (
        <AutocompleteInput<Barang>
          id="barang"
          label="Barang"
          placeholder="Pilih barang"
          options={barangList || []}
          isLoading={isLoading}
          isError={isError}
          errorMessage="Gagal memuat data barang"
          disabled={!selectedPelabuhan}
          required
          getOptionLabel={getBarangLabel}
          onSelect={(barang) => {
            field.onChange(barang);
            onSelect(barang);
          }}
          selectedOption={field.value}
        />
      )}
    />
  );
}