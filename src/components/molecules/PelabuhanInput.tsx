'use client';

import { usePelabuhanQuery } from '@/hooks/useApiQueries';
import { Negara, Pelabuhan } from '@/utils/types/data';
import AutocompleteInput from '../atoms/AutocompleteInput';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '@/utils/validations/formSchema';

interface PelabuhanInputProps {
  control: Control<FormValues>;
  selectedNegara: Negara | null;
  onSelect: (pelabuhan: Pelabuhan | null) => void;
}

export default function PelabuhanInput({ 
  control, 
  selectedNegara, 
  onSelect 
}: PelabuhanInputProps) {
  const { 
    data: pelabuhanList, 
    isLoading, 
    isError 
  } = usePelabuhanQuery(selectedNegara ? Number(selectedNegara.id_negara) : null);

  const getPelabuhanLabel = (pelabuhan: Pelabuhan) => {
    return pelabuhan.nama_pelabuhan;
  };

  return (
    <Controller
      name="pelabuhan"
      control={control}
      render={({ field }) => (
        <AutocompleteInput<Pelabuhan>
          id="pelabuhan"
          label="Pelabuhan"
          placeholder="Pilih pelabuhan"
          options={pelabuhanList || []}
          isLoading={isLoading}
          isError={isError}
          errorMessage="Gagal memuat data pelabuhan"
          disabled={!selectedNegara}
          required
          getOptionLabel={getPelabuhanLabel}
          onSelect={(pelabuhan) => {
            field.onChange(pelabuhan);
            onSelect(pelabuhan);
          }}
          selectedOption={field.value}
        />
      )}
    />
  );
}