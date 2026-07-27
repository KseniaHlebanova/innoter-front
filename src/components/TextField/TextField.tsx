import type { InputHTMLAttributes } from 'react';
import './TextField.css';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
}

export function TextField({ id, label, ...inputProps }: TextFieldProps) {
  return (
    <div className="text-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...inputProps} />
    </div>
  );
}
