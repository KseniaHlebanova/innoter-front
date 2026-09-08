import * as Sentry from '@sentry/react';
import { APP_MODE, SENTRY_DSN } from '../api/config';
const isProduction = APP_MODE === 'prod';

export function initSentry(): void {
  if (!isProduction) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: APP_MODE,
    tracesSampleRate: 0.1,
  });
}

interface ApiErrorContext {
  method: string;
  path: string;
  body?: unknown;
  status: number;
}

export function logApiError(message: string, context: ApiErrorContext, errorData?: unknown): void {
  if (!isProduction) {
     
    console.error(`[API] ${context.status} ${context.path}`, errorData);
    return;
  }

  Sentry.captureMessage(message, {
    level: 'error',
    tags: {
      status: String(context.status),
      path: context.path,
      method: context.method,
    },
    extra: {
      body: context.body,
      errorData,
    },
  });
}

export function logClientError(
  message: string,
  cause?: unknown,
  context?: Record<string, unknown>,
): void {
  if (!isProduction) {
     
    console.error(`[Client] ${message}`, cause, context);
    return;
  }

  Sentry.captureException(cause instanceof Error ? cause : new Error(message), {
    extra: { message, ...context },
  });
}
