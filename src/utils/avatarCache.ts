const CACHE_NAME = 'avatar-image-cache';

function buildCacheKey(userId: string, imageS3Path: string): string {
  return `https://avatar-cache.local/${userId}/${imageS3Path}`;
}

function isCacheApiSupported(): boolean {
  return typeof window !== 'undefined' && 'caches' in window;
}

export async function getCachedAvatarBlob(
  userId: string,
  imageS3Path: string,
): Promise<Blob | null> {
  if (!isCacheApiSupported()) return null;

  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(buildCacheKey(userId, imageS3Path));
  return response ? response.blob() : null;
}

export async function putCachedAvatarBlob(
  userId: string,
  imageS3Path: string,
  blob: Blob,
): Promise<void> {
  if (!isCacheApiSupported()) return;

  const cache = await caches.open(CACHE_NAME);
  const response = new Response(blob, { headers: { 'Content-Type': blob.type } });
  await cache.put(buildCacheKey(userId, imageS3Path), response);
}

export async function clearStaleAvatarEntries(
  userId: string,
  currentImageS3Path: string | null,
): Promise<void> {
  if (!isCacheApiSupported()) return;

  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  const prefix = `https://avatar-cache.local/${userId}/`;
  const currentKey = currentImageS3Path ? buildCacheKey(userId, currentImageS3Path) : null;

  await Promise.all(
    keys
      .filter((request) => request.url.startsWith(prefix) && request.url !== currentKey)
      .map((request) => cache.delete(request)),
  );
}
