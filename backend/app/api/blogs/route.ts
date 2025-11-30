import { NextRequest } from 'next/server';
import { listBlogsHandler, createBlogHandler } from '@/controllers/blogController';
import { success, error as errorRes } from '@/lib/response';

export async function GET(request: NextRequest) {
  const result = await listBlogsHandler(request as NextRequest);
  // listBlogsHandler returns a plain object via build(); convert to NextResponse
  return success(result.message, result.data);
}

export async function POST(request: NextRequest) {
  // dynamically import auth to verify token
  const { verifyToken } = await import('@/lib/auth');
  const result = await createBlogHandler(request as NextRequest, verifyToken);
  if (result.success) return success(result.message, result.data, 201);
  if (result.message === 'Unauthorized') return errorRes('Unauthorized', 401);
  return errorRes(result.message, 400);
}