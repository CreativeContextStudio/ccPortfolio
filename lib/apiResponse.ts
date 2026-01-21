/**
 * Standardized API response utilities
 * Ensures consistent error response format across all API routes
 */

export interface ApiError {
  error: string;
  message: string;
  details?: unknown;
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  error: string,
  message: string,
  status: number = 400,
  details?: unknown
): Response {
  const body: ApiError = {
    error,
    message,
    ...(details !== undefined && { details }),
  };

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(
  data?: T,
  message?: string,
  status: number = 200,
  headers?: Record<string, string>
): Response {
  const body: ApiSuccess<T> = {
    success: true,
    ...(data !== undefined && { data }),
    ...(message !== undefined && { message }),
  };

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}
