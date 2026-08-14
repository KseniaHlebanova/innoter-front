import type { InputHTMLAttributes } from 'react';
import { FormField } from '../FormField/FormField';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
  label: string;
}

export function TextField({ id, label, ...inputProps }: TextFieldProps) {
  return (
    <FormField id={id} label={label}>
      <input id={id} {...inputProps} />
    </FormField>
  );
}
