import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  validationError?: string;
  rows?: number;
  disabled?: boolean;
}

export default function PasswordInput({
  value,
  onChange,
  placeholder = 'Enter password...',
  validationError,
  rows = 1,
  disabled = false,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const className = `password-input ${validationError ? 'error' : ''}`;
  return (
    <div className="password-config-card">
      {rows === 1 ? (
        <input
          type="text"
          className={className}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <textarea
          rows={rows}
          className={className}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      {validationError && <div className="password-validation-error">⚠️ {validationError}</div>}
    </div>
  );
}
