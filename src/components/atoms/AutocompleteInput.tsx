'use client';

import { useState, useRef, useEffect } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AutocompleteInputProps<T> {
  id: string;
  label: string;
  placeholder?: string;
  options: T[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  register?: UseFormRegisterReturn;
  getOptionLabel: (option: T) => string;
  onSelect: (option: T | null) => void;
  selectedOption: T | null;
  readOnly?: boolean;
}

export default function AutocompleteInput<T>({ 
  id, 
  label, 
  placeholder = '', 
  options, 
  isLoading = false, 
  isError = false, 
  errorMessage = 'Terjadi kesalahan saat memuat data', 
  disabled = false, 
  required = false, 
  register, 
  getOptionLabel, 
  onSelect, 
  selectedOption,
  readOnly = false
}: AutocompleteInputProps<T>) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedOption) {
      setInputValue(getOptionLabel(selectedOption));
    } else {
      setInputValue('');
    }
  }, [selectedOption, getOptionLabel]);

  useEffect(() => {
    if (!inputValue.trim()) {
      setFilteredOptions(options);
      return;
    }

    const filtered = options.filter(option =>
      getOptionLabel(option).toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options, getOptionLabel]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    
    if (!value.trim()) {
      onSelect(null);
    }
  };

  const handleOptionClick = (option: T) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          id={id}
          type="text"
          className={`w-full p-2 border rounded-md ${isError ? 'border-red-500' : 'border-gray-300'} ${readOnly ? 'bg-gray-100' : ''}`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => !readOnly && setIsOpen(true)}
          disabled={disabled || isLoading}
          readOnly={readOnly}
          ref={inputRef}
          {...register}
        />
        
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {isError && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}

      {isOpen && !readOnly && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {isLoading ? (
            <div className="p-2 text-center text-gray-500">Loading...</div>
          ) : filteredOptions.length > 0 ? (
            <ul>
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {getOptionLabel(option)}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2 text-center text-gray-500">Tidak ada data</div>
          )}
        </div>
      )}
    </div>
  );
}