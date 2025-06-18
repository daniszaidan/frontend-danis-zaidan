'use client';

import { Barang } from '@/utils/types/data';
import ReadOnlyInput from '../atoms/ReadOnlyInput';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '@/utils/validations/formSchema';

interface DeskripsiInputProps {
  control: Control<FormValues>;
  selectedBarang: Barang | null;
}

export default function DeskripsiInput({
  control,
  selectedBarang,
}: DeskripsiInputProps) {
  return (
    // <Controller
    //   name="deskripsi"
    //   control={control}
    //   render={({ field }) => (
    //     <ReadOnlyInput
    //       id="deskripsi"
    //       label="Deskripsi Barang"
    //       value={selectedBarang?.description || ''}
    //       register={field}
    //       type="textarea"
    //     />
    //   )}
    // />

    <Controller
      name="deskripsi"
      control={control}
      render={({ field }) => (
        <ReadOnlyInput
          id="deskripsi"
          label="Deskripsi Barang"
          value={selectedBarang?.description || ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          inputRef={field.ref}
          type="textarea"
        />
      )}
    />
  );
}
