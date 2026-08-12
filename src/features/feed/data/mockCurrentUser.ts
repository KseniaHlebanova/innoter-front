import type { User } from '../../../types/user';
import { Role } from '../../../types/role';
export const mockCurrentUser: User = {
  id: 'current-user',
  displayName: 'Ksenia',
  username: 'ksenia',
  avatarUrl: 'https://i.pravatar.cc/150?u=ksenia',
  role: Role.USER,
};
