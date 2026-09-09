import type { Role } from './role';

export interface User {
  id: string;
  displayName: string;
  username: string;
  role: Role;
  imageS3Path: string | null;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string | null;
}

export interface MockUser extends User {
  avatarUrl: string;
}

export interface UserApiProfile {
  id: string;
  name: string;
  surname: string;
  username: string;
  phone_number: string | null;
  email: string;
  image_s3_path: string | null;
  group_id: number | null;
  role: Role;
  created_at: string;
  modified_at: string;
}

export interface UserUpdatePayload {
  name?: string;
  surname?: string;
  username?: string;
  phone_number?: string;
  email?: string;
  image_s3_path?: string;
}
