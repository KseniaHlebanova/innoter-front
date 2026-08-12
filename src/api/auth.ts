import { API_BASE_URL } from './config';
import type { LoginPayload, RefreshPayload, Tokens } from '../types/auth';
import { apiPost, ApiError } from './httpClient';
import type { SignupPayload } from '../types/auth';
import type { UserApiProfile } from '../types/user';

export function loginUser(payload: LoginPayload): Promise<Tokens> {
  return apiPost<Tokens, LoginPayload>('/auth/login', payload);
}

export async function refreshTokens(payload: RefreshPayload): Promise<Tokens> {
  const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'detail' in data && typeof data.detail === 'string'
        ? data.detail
        : 'Refresh failed';
    throw new ApiError(response.status, message, data);
  }

  return data as Tokens;
}

export function signupUser(payload: SignupPayload): Promise<UserApiProfile> {
  return apiPost<UserApiProfile, SignupPayload>('/auth/signup', payload);
}
