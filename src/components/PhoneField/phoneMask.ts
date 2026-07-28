import type { MaskedPatternOptions } from 'imask';

export const PHONE_MASK = '+000 (00) 000-00-00';

export const phoneMaskOptions = {
  mask: PHONE_MASK,
  lazy: false,
} satisfies MaskedPatternOptions;
