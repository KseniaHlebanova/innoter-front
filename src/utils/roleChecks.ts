import { RoleEnum } from '../api/generated/schema';
import type { User } from '../types/user';

export function isAdmin(user: User | null): boolean {
  return user?.role === RoleEnum.ADMIN;
}

export function isModerator(user: User | null): boolean {
  return user?.role === RoleEnum.MODERATOR;
}

export function canAccessAdminModeratorPanel(user: User | null): boolean {
  return isAdmin(user) || isModerator(user);
}
