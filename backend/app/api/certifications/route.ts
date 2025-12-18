import { NextRequest } from 'next/server';
import { listCertificationsHandler, createCertificationHandler } from '@/controllers/certificationController';
import { success, error as errorRes } from '@/lib/response';

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: NextRequest) {
  const result = await listCertificationsHandler(request as NextRequest);
  // listCertificationsHandler returns a plain object via build(); convert to NextResponse
  return success(result.message, result.data);
}

export async function POST(request: NextRequest) {
  // dynamically import auth to verify token
  const { verifyToken } = await import('@/lib/auth');
  const result = await createCertificationHandler(request as NextRequest, verifyToken);
  if (result.success) return success(result.message, result.data, 201);
  if (result.message === 'Unauthorized') return errorRes('Unauthorized', 401);
  return errorRes(result.message, 400);
}