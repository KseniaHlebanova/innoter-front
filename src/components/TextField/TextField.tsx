import type { InputHTMLAttributes } from 'react';
import { FormField } from '../FormField/FormField';
import './TextField.css';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
  error?: string;
}

export function TextField({ id, label, error, ...inputProps }: TextFieldProps) {
  return (
    <FormField id={id} label={label}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <span id={`${id}-error`} className="text-field__error" role="alert">
          {error}
        </span>
      )}
    </FormField>
  );
}
