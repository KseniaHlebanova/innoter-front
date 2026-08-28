import { Role } from '../types/role';
import type { User } from '../types/user';

export function isAdmin(user: User | null): boolean {
  return user?.role === Role.ADMIN;
}

export function isModerator(user: User | null): boolean {
  return user?.role === Role.MODERATOR;
}

export function canAccessAdminModeratorPanel(user: User | null): boolean {
  return isAdmin(user) || isModerator(user);
}
