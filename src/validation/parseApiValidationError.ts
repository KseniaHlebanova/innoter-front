import { ApiError } from '../api/httpClient';
import { getFastApiValidationErrors } from '../api/apiError';

const BACKEND_TO_FORM_FIELD: Record<string, string> = {
  name: 'firstName',
  surname: 'lastName',
  username: 'username',
  phone_number: 'phoneNumber',
  email: 'email',
};

export interface ParsedApiError {
  fieldErrors: Record<string, string>;
  generalMessage: string | null;
}

export function parseApiValidationError(err: unknown): ParsedApiError {
  if (!(err instanceof ApiError)) {
    return {
      fieldErrors: {},
      generalMessage: 'Something went wrong, please try again',
    };
  }

  const validationErrors = getFastApiValidationErrors(err.details);

  if (!validationErrors) {
    return {
      fieldErrors: {},
      generalMessage: err.message,
    };
  }

  const fieldErrors: Record<string, string> = {};
  let hasUnmatchedError = false;

  for (const item of validationErrors) {
    const backendField = item.loc[item.loc.length - 1];

    const formField =
      typeof backendField === 'string' ? BACKEND_TO_FORM_FIELD[backendField] : undefined;

    if (formField) {
      fieldErrors[formField] = item.msg;
    } else {
      hasUnmatchedError = true;
    }
  }

  return {
    fieldErrors,
    generalMessage: hasUnmatchedError ? 'Something went wrong, please try again' : null,
  };
}
