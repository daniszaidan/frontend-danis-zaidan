interface ReadOnlyInputProps {
  id: string;
  label: string;
  value: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: () => void;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  type?: 'text' | 'number' | 'textarea';
}

export default function ReadOnlyInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  inputRef,
  type = 'text',
}: ReadOnlyInputProps) {
  return (
    <div className="w-full mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={id}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          value={value}
          readOnly
          rows={4}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
        />
      ) : (
        <input
          id={id}
          type={type}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          value={value}
          readOnly
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef as React.Ref<HTMLInputElement>}
        />
      )}
    </div>
  );
}
