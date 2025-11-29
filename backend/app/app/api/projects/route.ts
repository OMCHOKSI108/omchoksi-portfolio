import { NextRequest, NextResponse } from 'next/server';

// Deprecated duplicate route. Return 404 to avoid conflicts with canonical API under /api.
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}