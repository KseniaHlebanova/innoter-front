import { useEffect, useRef, useState } from 'react';
import { getAvatarViewUrl } from '../api/avatar';
import {
  clearStaleAvatarEntries,
  getCachedAvatarBlob,
  putCachedAvatarBlob,
} from '../utils/avatarCache';
import { DEFAULT_AVATAR_URL } from '../assets/defaultAvatar';
import { logClientError } from '../lib/sentry';

type AvatarStatus = 'idle' | 'loading' | 'ready' | 'error';

interface UseAvatarImageResult {
  avatarUrl: string;
  status: AvatarStatus;
}

const inFlightRequests = new Map<string, Promise<Blob>>();

async function fetchAvatarBlob(): Promise<Blob> {
  const { url } = await getAvatarViewUrl();

  if (!url) {
    throw new Error('No avatar uploaded');
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download avatar, status ${response.status}`);
  }

  return response.blob();
}

async function fetchAvatarBlobWithRetry(): Promise<Blob> {
  try {
    return await fetchAvatarBlob();
  } catch {
    return fetchAvatarBlob();
  }
}

function getOrFetchAvatarBlob(key: string): Promise<Blob> {
  let promise = inFlightRequests.get(key);

  if (!promise) {
    promise = fetchAvatarBlobWithRetry().finally(() => {
      inFlightRequests.delete(key);
    });
    inFlightRequests.set(key, promise);
  }

  return promise;
}

export function useAvatarImage(
  userId: string | null,
  imageS3Path: string | null,
): UseAvatarImageResult {
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR_URL);
  const [status, setStatus] = useState<AvatarStatus>('idle');
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    function revokePrevious() {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    }

    async function resolve() {
      if (!userId || !imageS3Path) {
        revokePrevious();
        setAvatarUrl(DEFAULT_AVATAR_URL);
        setStatus('idle');
        return;
      }

      setStatus('loading');

      try {
        await clearStaleAvatarEntries(userId, imageS3Path);

        let blob = await getCachedAvatarBlob(userId, imageS3Path);

        if (!blob) {
          blob = await getOrFetchAvatarBlob(`${userId}:${imageS3Path}`);
          await putCachedAvatarBlob(userId, imageS3Path, blob);
        }

        if (cancelled) return;

        revokePrevious();
        const objectUrl = URL.createObjectURL(blob);
        objectUrlRef.current = objectUrl;
        setAvatarUrl(objectUrl);
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;

        logClientError('Failed to load avatar', err, {
          source: 'useAvatarImage',
        });

        revokePrevious();
        setAvatarUrl(DEFAULT_AVATAR_URL);
        setStatus('error');
      }
    }

    resolve();

    return () => {
      cancelled = true;
    };
  }, [userId, imageS3Path]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return { avatarUrl, status };
}
