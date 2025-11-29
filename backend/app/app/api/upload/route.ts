import { NextRequest, NextResponse } from 'next/server';

// Deprecated nested upload route. Return 404 to avoid duplicate behavior.
export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}