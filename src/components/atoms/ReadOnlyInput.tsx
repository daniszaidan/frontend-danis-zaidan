'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

interface ReadOnlyInputProps {
  id: string;
  label: string;
  value: string;
  register?: UseFormRegisterReturn;
  type?: 'text' | 'number' | 'textarea';
}

export default function ReadOnlyInput({ 
  id, 
  label, 
  value, 
  register,
  type = 'text'
}: ReadOnlyInputProps) {
  return (
    <div className="w-full mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          value={value}
          readOnly
          rows={4}
          {...register}
        />
      ) : (
        <input
          id={id}
          type={type}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          value={value}
          readOnly
          {...register}
        />
      )}
    </div>
  );
}