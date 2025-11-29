import { NextRequest, NextResponse } from 'next/server';

// Deprecated duplicate nested route. Return 404 to avoid conflicts.
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}