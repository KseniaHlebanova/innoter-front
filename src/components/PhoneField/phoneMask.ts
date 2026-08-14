import type { MaskedPatternOptions } from 'imask';
import type { ReactMaskProps } from 'react-imask';

export const PHONE_MASK = '+000 (00) 000-00-00';

export const phoneMaskOptions: MaskedPatternOptions &
  Pick<ReactMaskProps<HTMLInputElement>, 'unmask'> = {
  mask: PHONE_MASK,
  lazy: false,
  unmask: true,
};
