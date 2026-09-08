export interface AvatarUploadResponse {
  url: string;
  fields: Record<string, string>;
  generated_filename: string;
}

export interface AvatarViewResponse {
  url: string | null;
  message?: string | null;
  expires_at?: string | null;
}
