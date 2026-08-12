import { apiGet } from './httpClient';
import type { UserApiProfile } from '../types/user';

export function getCurrentUser(): Promise<UserApiProfile> {
  return apiGet<UserApiProfile>('/user/me', { auth: true });
}
