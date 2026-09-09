import * as Yup from 'yup';
import { USERNAME_REGEX, PHONE_REGEX } from './patterns';

export const emailSchema = Yup.string()
  .trim()
  .email('Enter a valid email address')
  .required('Email is required');

export function requiredTextSchema(fieldLabel: string) {
  return Yup.string().trim().required(`${fieldLabel} is required`);
}

export const phoneSchema = Yup.string()
  .trim()
  .min(7, 'Phone number must be at least 7 characters')
  .max(15, 'Phone number must be at most 15 characters')
  .matches(PHONE_REGEX, 'Enter a valid phone number')
  .notRequired();

export const usernameSchema = Yup.string()
  .trim()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .matches(
    USERNAME_REGEX,
    'Username must start with a letter and contain only letters, numbers, or underscores',
  )
  .required('Username is required');

export const passwordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/\d/, 'Password must contain at least one number');
