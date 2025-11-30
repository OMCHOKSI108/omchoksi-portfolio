import { NextRequest } from 'next/server';
import { getBlogHandler, updateBlogHandler, deleteBlogHandler } from '@/controllers/blogController';
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
  const result = await getBlogHandler(request as NextRequest, id);
  if (result.success) return success(result.message, result.data);
  if (result.message === 'Blog not found') return errorRes('Blog not found', 404);
  return errorRes(result.message, 400);
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const { verifyToken } = await import('@/lib/auth');
  const result = await updateBlogHandler(request as NextRequest, id, verifyToken);
  if (result.success) return success(result.message, result.data);
  if (result.message === 'Unauthorized') return errorRes('Unauthorized', 401);
  if (result.message === 'Blog not found') return errorRes('Blog not found', 404);
  return errorRes(result.message, 400);
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const { verifyToken } = await import('@/lib/auth');
  const result = await deleteBlogHandler(request as NextRequest, id, verifyToken);
  if (result.success) return success(result.message);
  if (result.message === 'Unauthorized') return errorRes('Unauthorized', 401);
  if (result.message === 'Blog not found') return errorRes('Blog not found', 404);
  return errorRes(result.message, 400);
}