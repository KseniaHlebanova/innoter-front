import type { ReactNode } from 'react';
import './FormField.css';

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
}

export function FormField({ id, label, children }: FormFieldProps) {
  return (
    <div className="text-field">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}
