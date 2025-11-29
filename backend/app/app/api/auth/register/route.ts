import { NextRequest, NextResponse } from 'next/server';

// Deprecated nested auth/register route. Return 404 to avoid duplicate endpoints.
export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}