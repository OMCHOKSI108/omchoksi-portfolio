import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/api';

// Returns a sanitized JSON response for success
export function success<T = any>(message = 'OK', data?: T, status = 200) {
  const body: ApiResponse<T> = { success: true, message, data };
  return NextResponse.json(body, { status });
}

// Returns a sanitized JSON response for errors. Do NOT leak raw error objects.
export function error(message = 'Internal server error', status = 500) {
  const body: ApiResponse = { success: false, message, error: null };
  return NextResponse.json(body, { status });
}

// helper to build plain object (not a NextResponse) for controller use
export function build<T = any>(successFlag: boolean, message: string, data?: T, errorObj?: any) {
  const body: ApiResponse<T> = { success: successFlag, message };
  if (data !== undefined) body.data = data;
  if (errorObj !== undefined) body.error = null; // don't expose details
  return body;
}
