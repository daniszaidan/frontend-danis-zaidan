'use client';

import { useNegaraQuery } from '@/hooks/useApiQueries';
import { Negara } from '@/utils/types/data';
import AutocompleteInput from '../atoms/AutocompleteInput';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '@/utils/validations/formSchema';

interface NegaraInputProps {
  control: Control<FormValues>;
  onSelect: (negara: Negara | null) => void;
}

export default function NegaraInput({ control, onSelect }: NegaraInputProps) {
  const { data: negaraList, isLoading, isError } = useNegaraQuery();

  const getNegaraLabel = (negara: Negara) => {
    return `${negara.kode_negara} - ${negara.nama_negara}`;
  };

  return (
    <Controller
      name="negara"
      control={control}
      render={({ field }) => (
        <AutocompleteInput<Negara>
          id="negara"
          label="Negara"
          placeholder="Pilih negara"
          options={negaraList || []}
          isLoading={isLoading}
          isError={isError}
          errorMessage="Gagal memuat data negara"
          required
          getOptionLabel={getNegaraLabel}
          onSelect={(negara) => {
            field.onChange(negara);
            onSelect(negara);
          }}
          selectedOption={field.value}
        />
      )}
    />
  );
}