import { NextRequest, NextResponse } from 'next/server';

// Deprecated nested auth/me route. Return 404 to avoid duplicate endpoints.
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}