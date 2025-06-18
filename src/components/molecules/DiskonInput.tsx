'use client';

import { Barang } from '@/utils/types/data';
import ReadOnlyInput from '../atoms/ReadOnlyInput';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '@/utils/validations/formSchema';

interface DiskonInputProps {
  control: Control<FormValues>;
  selectedBarang: Barang | null;
}

export default function DiskonInput({
  control,
  selectedBarang,
}: DiskonInputProps) {
  return (
    <Controller
      name="diskon"
      control={control}
      render={({ field }) => (
        <ReadOnlyInput
          id="diskon"
          label="Diskon (%)"
          value={selectedBarang ? `${selectedBarang.diskon}` : ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          inputRef={field.ref}
        />
      )}
    />
  );
}
