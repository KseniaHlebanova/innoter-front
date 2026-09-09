import { apiGet, apiPost } from './httpClient';
import type { AvatarUploadResponse, AvatarViewResponse } from '../types/avatar';

export function getAvatarUploadUrl(fileExtension: string): Promise<AvatarUploadResponse> {
  return apiPost<AvatarUploadResponse, undefined>(
    `/user/avatar?file_extension=${encodeURIComponent(fileExtension)}`,
    undefined,
    { auth: true },
  );
}

export function getAvatarViewUrl(): Promise<AvatarViewResponse> {
  return apiGet<AvatarViewResponse>('/user/avatar', { auth: true });
}

export async function uploadAvatarToS3(
  uploadUrl: string,
  fields: Record<string, string>,
  file: File,
): Promise<void> {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('file', file);

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Avatar upload failed with status ${response.status}`);
  }
}
