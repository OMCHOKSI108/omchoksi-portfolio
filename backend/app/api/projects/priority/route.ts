import { NextRequest } from 'next/server';
import { bulkUpdatePrioritiesHandler } from '@/controllers/projectController';
import { success, error as errorRes } from '@/lib/response';

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

export async function PATCH(request: NextRequest) {
    const { verifyToken } = await import('@/lib/auth');
    const result = await bulkUpdatePrioritiesHandler(request as NextRequest, verifyToken);
    if (result.success) return success(result.message, result.data);
    if (result.message === 'Unauthorized') return errorRes('Unauthorized', 401);
    return errorRes(result.message, 400);
}
