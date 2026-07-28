import { IMaskInput } from 'react-imask';
import type { ComponentType, InputHTMLAttributes } from 'react';
import type { ReactMaskProps } from 'react-imask';
import type { MaskedPatternOptions } from 'imask';
import { FormField } from '../FormField/FormField';
import { phoneMaskOptions } from './phoneMask';

type PatternMaskInputProps = MaskedPatternOptions &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Pick<ReactMaskProps<HTMLInputElement>, 'onAccept' | 'unmask'>;

const PatternMaskInput = IMaskInput as ComponentType<PatternMaskInputProps>;

interface PhoneFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'onChange'> {
  id: string;
  label: string;
  onAccept?: ReactMaskProps<HTMLInputElement>['onAccept'];
  unmask?: boolean | 'typed';
}

export function PhoneField({ id, label, ...maskInputProps }: PhoneFieldProps) {
  return (
    <FormField id={id} label={label}>
      <PatternMaskInput
        id={id}
        type="tel"
        autoComplete="tel"
        {...phoneMaskOptions}
        {...maskInputProps}
      />
    </FormField>
  );
}
