'use client';

import { Barang } from '@/utils/types/data';
import ReadOnlyInput from '../atoms/ReadOnlyInput';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '@/utils/validations/formSchema';
import { formatCurrency, hitungTotal } from '@/utils/helpers/formatters';

interface TotalInputProps {
  control: Control<FormValues>;
  selectedBarang: Barang | null;
}

export default function TotalInput({
  control,
  selectedBarang,
}: TotalInputProps) {
  const totalHarga = selectedBarang
    ? hitungTotal(selectedBarang.harga, selectedBarang.diskon)
    : 0;

  return (
    <Controller
      name="total"
      control={control}
      render={({ field }) => (
        <ReadOnlyInput
          id="total"
          label="Total"
          value={selectedBarang ? formatCurrency(totalHarga) : ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          inputRef={field.ref}
        />
      )}
    />
  );
}
