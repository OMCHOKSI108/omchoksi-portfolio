import { NextRequest, NextResponse } from 'next/server';

// Deprecated nested auth route. Return 404 to avoid duplicating authentication handlers.
export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}