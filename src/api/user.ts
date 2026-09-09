import { apiGet, apiPatch } from './httpClient';
import type { UserApiProfile, UserUpdatePayload } from '../types/user';

export function getCurrentUser(): Promise<UserApiProfile> {
  return apiGet<UserApiProfile>('/user/me', { auth: true });
}

export function updateCurrentUser(payload: UserUpdatePayload): Promise<UserApiProfile> {
  return apiPatch<UserApiProfile, UserUpdatePayload>('/user/me', payload, { auth: true });
}
