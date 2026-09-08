import type { User, UserApiProfile } from '../../types/user';

export function mapUserApiProfileToUser(profile: UserApiProfile): User {
  return {
    id: profile.id,
    displayName: `${profile.name} ${profile.surname}`.trim(),
    username: profile.username,
    imageS3Path: profile.image_s3_path,
    role: profile.role,
    name: profile.name,
    surname: profile.surname,
    email: profile.email,
    phoneNumber: profile.phone_number,
  };
}
