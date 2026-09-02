import type { User, UserApiProfile } from '../../types/user';
import { DEFAULT_AVATAR_URL } from '../../assets/defaultAvatar';

export function mapUserApiProfileToUser(profile: UserApiProfile): User {
  return {
    id: profile.id,
    displayName: `${profile.name} ${profile.surname}`.trim(),
    username: profile.username,
    avatarUrl: profile.image_s3_path ? profile.image_s3_path : DEFAULT_AVATAR_URL,
    role: profile.role,
    name: profile.name,
    surname: profile.surname,
    email: profile.email,
    phoneNumber: profile.phone_number,
  };
}
