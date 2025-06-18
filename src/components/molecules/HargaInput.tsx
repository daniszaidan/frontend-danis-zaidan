'use client';

import { Barang } from '@/utils/types/data';
import ReadOnlyInput from '../atoms/ReadOnlyInput';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '@/utils/validations/formSchema';
import { formatCurrency } from '@/utils/helpers/formatters';

interface HargaInputProps {
  control: Control<FormValues>;
  selectedBarang: Barang | null;
}

export default function HargaInput({
  control,
  selectedBarang,
}: HargaInputProps) {
  return (
    <Controller
      name="harga"
      control={control}
      render={({ field }) => (
        <ReadOnlyInput
          id="harga"
          label="Harga"
          value={selectedBarang ? formatCurrency(selectedBarang.harga) : ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          inputRef={field.ref}
        />
      )}
    />
  );
}
