import type { Role } from './role';

export interface User {
  id: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  role: Role;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string | null;
}

export interface UserApiProfile {
  id: string;
  name: string;
  surname: string;
  username: string;
  phone_number: string | null;
  email: string;
  image_path: string | null;
  group_id: number | null;
  role: Role;
  created_at: string;
  modified_at: string;
}