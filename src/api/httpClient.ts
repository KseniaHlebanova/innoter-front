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
import { logApiError, logClientError } from '../lib/sentry';

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network request failed', cause?: unknown) {
    super(message);
    this.name = 'NetworkError';
    if (cause !== undefined) {
      this.cause = cause;
    }
  }
}

export class ClientError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'ClientError';
    if (cause !== undefined) {
      this.cause = cause;
    }
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

function hasEmptyBody(response: Response): boolean {
  if (response.status === 204 || response.status === 205) {
    return true;
  }
  return response.headers.get('content-length') === '0';
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (hasEmptyBody(response)) {
    return null;
  }
  try {
    return await response.json();
  } catch {
    throw new ApiError(response.status, 'Invalid response format from server');
  }
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
    let token: string | null;
    try {
      token = getAccessToken();
    } catch (cause) {
      logClientError('Failed to read access token', cause, { method, path });
      throw new ClientError('Failed to read access token', cause);
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let serializedBody: string | undefined;
  try {
    serializedBody = body !== undefined ? JSON.stringify(body) : undefined;
  } catch (cause) {
    logClientError('Failed to serialize request body', cause, { method, path });
    throw new ClientError('Failed to serialize request body', cause);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: serializedBody,
    });
  } catch (cause) {
    logApiError(`Network request failed at ${path}`, { method, path, body, status: 0 }, cause);
    throw new NetworkError('Network request failed', cause);
  }

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

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    if (response.status >= 500) {
      logApiError(
        `API ${response.status} error at ${path}`,
        { method, path, body, status: response.status },
        errorData,
      );
      throw new ApiError(
        response.status,
        'Something went wrong. Please try again later.',
        errorData,
      );
    }
    throw new ApiError(response.status, extractErrorMessage(errorData), errorData);
  }

  const data = await parseResponseBody(response);
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
