import { API_BASE_URL } from './config';
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
  isRememberMe,
} from './tokenStorage';
import { refreshTokens } from './auth';
import { store } from '../store/store';
import { setAuthenticated } from '../store/authSlice';

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

interface FastApiValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
}

function extractErrorMessage(data: unknown): string {
  if (!data || typeof data !== 'object' || !('detail' in data)) {
    return 'Something went wrong';
  }

  const detail = (data as { detail: unknown }).detail;

  if (typeof detail === 'string') {
    return detail;
  }

  if (Array.isArray(detail)) {
    const messages = (detail as FastApiValidationErrorItem[])
      .map((item) => item.msg)
      .filter(Boolean);
    return messages.length > 0 ? messages.join('; ') : 'Validation error';
  }

  return 'Something went wrong';
}

interface RequestOptions {
  auth?: boolean;
  skipRetry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

async function performRefresh(): Promise<string> {
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) {
    throw new Error('No refresh token available');
  }

  const tokens = await refreshTokens({ refresh_token: currentRefreshToken });
  saveTokens(tokens, isRememberMe());
  return tokens.access_token;
}

function getOrCreateRefreshPromise(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

async function request<TResponse, TBody>(
  method: 'GET' | 'POST',
  path: string,
  body?: TBody,
  options: RequestOptions = {},
): Promise<TResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.auth) {
    const token = getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && options.auth && !options.skipRetry) {
    try {
      await getOrCreateRefreshPromise();
      return request<TResponse, TBody>(method, path, body, { ...options, skipRetry: true });
    } catch {
      clearTokens();
      store.dispatch(setAuthenticated(false));
      throw new ApiError(401, 'Session expired, please log in again');
    }
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, extractErrorMessage(data), data);
  }

  return data as TResponse;
}

export function apiPost<TResponse, TBody>(
  path: string,
  body: TBody,
  options?: RequestOptions,
): Promise<TResponse> {
  return request<TResponse, TBody>('POST', path, body, options);
}

export function apiGet<TResponse>(path: string, options?: RequestOptions): Promise<TResponse> {
  return request<TResponse, undefined>('GET', path, undefined, options);
}
