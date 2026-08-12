import type { User, UserApiProfile } from '../../types/user';
import { DEFAULT_AVATAR_URL } from '../../assets/defaultAvatar';

export function mapUserApiProfileToUser(profile: UserApiProfile): User {
  return {
    id: profile.id,
    displayName: `${profile.name} ${profile.surname}`.trim(),
    username: profile.username,
    avatarUrl: DEFAULT_AVATAR_URL,
    role: profile.role,
  };
}
