import { IMaskInput } from 'react-imask';
import type { ComponentType, InputHTMLAttributes } from 'react';
import type { ReactMaskProps } from 'react-imask';
import type { MaskedPatternOptions } from 'imask';
import { FormField } from '../FormField/FormField';
import { phoneMaskOptions } from './phoneMask';
import './PhoneField.css';

type PatternMaskInputProps = MaskedPatternOptions &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Pick<ReactMaskProps<HTMLInputElement>, 'onAccept' | 'unmask'>;

const PatternMaskInput = IMaskInput as ComponentType<PatternMaskInputProps>;

interface PhoneFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'onChange'> {
  id: string;
  label: string;
  error?: string;
  onAccept?: ReactMaskProps<HTMLInputElement>['onAccept'];
  unmask?: boolean | 'typed';
}

export function PhoneField({ id, label, error, ...maskInputProps }: PhoneFieldProps) {
  return (
    <FormField id={id} label={label}>
      <PatternMaskInput
        id={id}
        type="tel"
        autoComplete="tel"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...phoneMaskOptions}
        {...maskInputProps}
      />
      {error && (
        <span id={`${id}-error`} className="text-field__error" role="alert">
          {error}
        </span>
      )}
    </FormField>
  );
}
