import { NextRequest } from 'next/server';
import { getCertificationHandler, updateCertificationHandler, deleteCertificationHandler } from '@/controllers/certificationController';
import { success, error as errorRes } from '@/lib/response';

type RouteParams = {
  id: string;
};

type RouteContext = {
  params: Promise<RouteParams>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const result = await getCertificationHandler(request as NextRequest, id);
  if (result.success) return success(result.message, result.data);
  if (result.message === 'Certification not found') return errorRes('Certification not found', 404);
  return errorRes(result.message, 400);
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const { verifyToken } = await import('@/lib/auth');
  const result = await updateCertificationHandler(request as NextRequest, id, verifyToken);
  if (result.success) return success(result.message, result.data);
  if (result.message === 'Unauthorized') return errorRes('Unauthorized', 401);
  if (result.message === 'Certification not found') return errorRes('Certification not found', 404);
  return errorRes(result.message, 400);
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const { verifyToken } = await import('@/lib/auth');
  const result = await deleteCertificationHandler(request as NextRequest, id, verifyToken);
  if (result.success) return success(result.message);
  if (result.message === 'Unauthorized') return errorRes('Unauthorized', 401);
  if (result.message === 'Certification not found') return errorRes('Certification not found', 404);
  return errorRes(result.message, 400);
}