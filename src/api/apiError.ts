export interface FastApiValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface FastApiErrorResponse {
  detail: unknown;
}

export function getFastApiDetail(data: unknown): unknown {
  if (!data || typeof data !== 'object' || !('detail' in data)) {
    return null;
  }

  return (data as FastApiErrorResponse).detail;
}

export function getFastApiValidationErrors(data: unknown): FastApiValidationErrorItem[] | null {
  const detail = getFastApiDetail(data);

  if (!Array.isArray(detail)) {
    return null;
  }

  return detail as FastApiValidationErrorItem[];
}
